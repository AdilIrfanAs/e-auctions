import moment from 'moment';
import bcrypt from 'bcrypt';
import { Schema, model, Document } from 'mongoose';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
// import { IUser, comparePasswordFunction } from "../interfaces/user.interface";
import configs from '../../config/vars';
const {
  pwdSaltRounds,
  jwtExpirationInterval,
  pwEncryptionKey
} = configs

type comparePasswordFunction = (password: string) => boolean;
type generateToken = () => string;
type transformDocument = () => object;
export type UserDocument = Document & {
  email: string;
  name: string;
  password: string;
  comparePassword: comparePasswordFunction;
  token: generateToken;
  transform: transformDocument;
};

/**
 * User Schema
 * @private
 */
const UserSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
}, { timestamps: true });

/**
 * Methods
 */
UserSchema.methods.comparePassword = async function (password: string) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};
// UserSchema.methods.transform = async function () {
//   const user = this as UserDocument;
//   let transformed: UserDocument;
//     const fields = ['_id', 'name', 'email'];

//     fields.forEach((field) => {
//       transformed[field] = user[field];
//     });
//     return transformed;
// };
UserSchema.methods.token = async function () {
  const playload = {
    exp: moment().add(jwtExpirationInterval, 'minutes').unix(),
    iat: moment().unix(),
    sub: this._id,
  };
  return jwt.sign(playload, pwEncryptionKey);
};

UserSchema.pre('save', async function save(next) {
  try {
    if (!this.isModified('password')) return next();
    const hash = await bcrypt.hash(this.password, pwdSaltRounds);
    this.password = hash;
    return next();
  }
  catch (error: Error | any) {
    return next(error);
  }
});

/**
 * @typedef User
 */
export const User = model<UserDocument>('User', UserSchema);;