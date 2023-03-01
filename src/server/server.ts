import { Request, Response, Router, NextFunction } from "express";
import { ServerError } from "./types";
// const { Request, Response, NextFunction, Router } = require("express");

const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;

// const { jobRoutes } = require("./routes/jobsRouter.ts");
// const sessionRoutes = require("./routes/sessionRouter.ts");
import jobRoutes from "./routes/jobsRouter";
import sessionRoutes from "./routes/sessionRouter";
import userController from "./controllers/userController";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Root endpoint
// XXX

// Jobs CRUD endpoint
app.use("/jobs", jobRoutes);
// Session endpoint
app.use("/session", sessionRoutes);

// Used for confirming whether isLoggedIn
app.get("/", userController.isLoggedIn, (req: Request, res: Response) => {
  if (res.locals.loggedIn) res.redirect("/main");
  else res.sendStatus(203);
});

app.get("/main", userController.isLoggedIn, (req: Request, res: Response) => {
  return res.status(200).json("Test isLoggedIn");
  // res.redirect("/main");
});

// handle all unknown routes
app.use((req: Request, res: Response) =>
  res.status(404).send("This is not the page you're looking for...")
);

//global error handler
app.use((err: ServerError, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  if (err.type === "redirect") {
    res.redirect(err.url);
  }
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// "devDependencies": {
//   "@babel/core": "^7.16.7",
//   "@babel/preset-env": "^7.16.7",
//   "@babel/preset-react": "^7.16.7",
//   "@types/react": "^17.0.38",
//   "@types/react-dom": "^17.0.11",
//   "babel-loader": "^8.2.3",
//   "css-loader": "^6.5.1",
// },
// "dependencies": {
//   "react": "^17.0.2",
//   "react-dom": "^17.0.2",
