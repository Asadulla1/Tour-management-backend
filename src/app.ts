import cors from "cors";
// main application file work for communicate with backend
import express from "express";
import { router } from "./routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFoundROute } from "./app/middlewares/notFoundRoute";
import cookieParser from "cookie-parser";
import passport from "passport";
import expressSession from "express-session";
import "./app/config/passport";
const app = express();

app.use(
  expressSession({
    secret: "Your Secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api/v1/", router);

app.get("/", (req, res) => {
  res.json("Working Mamu!!!!!");
});

app.use(globalErrorHandler);

app.use(notFoundROute);

export default app;
