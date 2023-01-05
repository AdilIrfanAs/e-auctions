import { Request, Response, NextFunction } from "express";
import passport, { use } from "passport";
import { IVerifyOptions } from "passport-local";
import { RegisterPayload, LoginPayload, LoginResponseData } from "../interfaces-types/auth";
import { User, UserDocument } from "../models/users.model";
import { NativeError } from "mongoose";
import { Strategy as LocalStrategy } from "passport-local";

export const register = async ( req: Request, res: Response, next: NextFunction) => {
  try {
    let { name, email, password }: RegisterPayload = req.body;

    if (email && password) {
      email = email.toLowerCase();

      let user = await User.findOne({ email }, {createdAt: 0, updatedAt: 0, __v: 0});
      if (user) {
        return res
          .status(200)
          .send({ status: false, message: "User already exists" });
      }

      user = await User.create({
        name,
        email,
        password,
      });

      return res.status(200).send({
        status: true,
        message: "User registered successfully"
      });
    } else
      return res
        .status(200)
        .send({ status: false, message: "Required fields are missing" });
  } catch (error) {
    next(error);
  }
};

/**
 * Returns jwt token if valid email and password is provided
 * @public
 */
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { email, password }: LoginPayload = req.body;

    if (email && password) {
      email = email.toLowerCase();
      // call for passport authentication

      /**
       * Sign in using Email and Password.
       */
      passport.use(
        new LocalStrategy(
          { usernameField: "email" },
          async (email, password, done) => {
            try {
              await User.findOne(
                { email: email.toLowerCase() },
                (err: NativeError, user: UserDocument) => {
                  if (err) {
                    return done(err);
                  }
                  if (!user) {
                    return done(undefined, false, {
                      message: `Email ${email} not found.`,
                    });
                  }
                  if (!user.comparePassword(password))
                    // wrong password
                    return done(null, false, {
                      message: "Incorrect email or password",
                    });
                  return done(null, user);
                }
              );
            } catch (error: any) {
              done(error);
            }
          }
        )
      );

      passport.authenticate(
        "local",
        async (err: Error, user: UserDocument, info: IVerifyOptions) => {
          if (err)
            return res.status(400).send({
              err,
              status: false,
              message: "Oops! Something went wrong while authenticating",
            });
          // registered user
          else if (user) {
            const accessToken = await user.token();
            // const userFields = user.transform();

            const data: LoginResponseData = {
              name: user.name,
              _id: user._id,
              email: user.email,
              accessToken
            }
            await User.updateOne(
              { _id: user._id },
              { $set: { accessToken } },
              { upsert: true }
            );
            return res.status(200).send({
              status: true,
              message: "You have logged in successfully",
              data,
            });
          }

          // unknown user or wrong password
          else
            return res
              .status(200)
              .send({ status: false, message: "Incorrect email or password" });
        }
      )(req, res, next);
    } else
      return res
        .status(200)
        .send({ status: false, message: "Email & password required" });
  } catch (error) {
    console.log(error);
    return res.send(error);

    // return next(error);
  }
};
