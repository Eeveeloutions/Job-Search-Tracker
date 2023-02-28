import { Request, Response, NextFunction } from "express";
// const { Request, Response, NextFunction } = require("express");
const jwt = require("jsonwebtoken");
const db = require("../models/postgreSQLmodel.ts");

// type CookieController = {
//     setJWTasCookie: void;
//   };
const cookieController: any = {};


cookieController.setJWTasCookie: CookieController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // ADD jwt creation here
  // Store jwt in client's cookies (not in DB), aim to handle multiple jwts
  // Pass jwt token along middleware chain
  // ...
};

module.exports = cookieController;
