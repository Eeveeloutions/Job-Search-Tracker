import { Request, Response, NextFunction } from "express";
// const { Request, Response, NextFunction } = require("express");

const db = require("../models/postgreSQLmodel.ts");

const sessionController: any = {};

sessionController.startSession = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // NOT SURE WHETHER THIS IS NEEDED, LEAVING SHELL IN CASE...
};

module.exports = sessionController;
