// import { Promise } from "bluebird";
import { createServer } from "http";
import express, { Application } from "express";
import { Server } from "socket.io";
import cors from 'cors';
import bodyParser from "body-parser";
import passport from "passport";
// API keys and Passport configuration
import * as passportConfig from "./config/passport";
import router from "./api/routes/index";
import configs from "./config/vars";
import { mongoConnect } from "./config/mongoose";
import { Bid } from "./api/models/bids.model";
import { Item } from "./api/models/items.model";

type bidData = {
  userId: string;
  itemId: string;
  value: number;
  bidder: string;
  createdAt: string;
}
interface ServerToClientEvents {
  newBidClient: (data: bidData) => void;
  acceptBidClient: (isAccepted: boolean) => void;
}

interface ClientToServerEvents {
  newBidServer: (data: bidData) => void;
  acceptBidServer: (bidId: string) => void;
}

interface SocketData {
  name: string;
  age: number;
}

const app: Application = express();
const httpServer = createServer(app);

const io = new Server<ClientToServerEvents, ServerToClientEvents, SocketData>(
  httpServer, {
  cors: {
    origin: "*"
  }
}
);

io.on("connection", (socket) => {
  socket.on("newBidServer", async (data) => {
    io.emit("newBidClient", data)
    await Bid.create(data);
  });
  socket.on("acceptBidServer", async (bidId) => {
    if (bidId) {
      io.emit("acceptBidClient", true)
      await Bid.findByIdAndUpdate({ _id: bidId }, { isAccepted: true });
    }
  });
});

mongoConnect();
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
app.use(passport.initialize());
// app.use(passportConfig);
// require('./path/to/passport/config/file')(passport);
// app.use(passport.session());

app.use(bodyParser.urlencoded({ limit: "100KB" }));
app.use(bodyParser.json({ limit: "100KB" }));
app.use("/v1/front/", router);

httpServer.listen(configs.port, function () {
  console.log(`App is listening on port ${configs.port} !`);
});

export default app;
