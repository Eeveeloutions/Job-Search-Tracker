import { Request, Response, Router, NextFunction } from "express";
// const { Request, Response, NextFunction, Router } = require("express");

const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const path = require("path");
const apiRouter = require("./routers/apiRouter.js");
const PORT = process.env.PORT || 3000;

const jobRoutes = require("./routes/jobsRouter.ts");
const sessionRoutes = require("./routes/sessionRouter.ts");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Root endpoint
// XXX

// Jobs CRUD endpoint
app.use("/jobs", jobRoutes);
// Session endpoint
app.use("/session", sessionRoutes);

// handle all unknown routes
app.use((req: Request, res: Response) =>
  res.status(404).send("This is not the page you're looking for...")
);

//global error handler
app.use((err, req: Request, res: Response, next: NextFunction) => {
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
