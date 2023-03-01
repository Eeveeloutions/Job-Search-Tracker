import { Request, Response, NextFunction } from "express";
// const { Request, Response, NextFunction } = require("express");
const jwt = require("jsonwebtoken");
const db = require("../models/postgreSQLmodel.ts");

// type CookieController = {
//   setJWTasCookie?: (argo0: Request, arg1: Response, arg2: NextFunction) => void;
// };
const cookieController: any = {};

cookieController.setJWTasCookie = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const secretKey = process.env.JWTSECRETKEY;
  try {
    // const syncToken = jwt.sign(
    //   { payload: { email: res.locals.email } },
    //   secretKey
    // );
    const syncToken = jwt.sign({ id: res.locals.id }, secretKey);
    console.log("syncToken: ", syncToken);
    // res.cookie("ssid", syncToken, { httpOnly: true, secure: true });  // Secure key blocking access
    res.cookie("ssid", syncToken, { httpOnly: true });
    return next();
  } catch (err) {
    return next({
      log: "cookieController.setJWTasCookie: " + err,
      message: { err: "cookieController.setJWTasCookie: " + err },
    });
  }
};

export default cookieController;
