import { Request, Response, NextFunction } from "express";
import { ServerError } from "../types";
// const { Request, Response, NextFunction } = require("express");

import db from "../models/postgreSQLmodel";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// const db = require("../models/postgreSQLmodel.ts");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

interface CreateUserBody {
  name: string;
  email: string;
  pass: string;
}
interface CreateUser extends Request {
  body: CreateUserBody;
}

// Below unused, throwing type error so using 'any' instead
// type UserController = {
//   createUser?: (argo0: CreateUser, arg1: Response, arg2: NextFunction) => void;
//   confirmBcryptMatchFirst?: (
//     arg0: CreateUser,
//     arg1: Response,
//     arg2: NextFunction
//   ) => void;
//   verifyUser?: (argo0: CreateUser, arg1: Response, arg2: NextFunction) => void;
// };

// add isLoggedIn?

// ----------------------userController.createUser----------------

const userController: any = {};

userController.createUser = async (
  req: CreateUser,
  res: Response,
  next: NextFunction
) => {
  try {
    // Receiving these in from client-side
    res.locals.name = req.body.name;
    res.locals.email = req.body.email; // username
    res.locals.pass = req.body.pass;

    // Ensure valid input before proceeding to process & write to DB
    if (!res.locals.email || !res.locals.pass) {
      return next({
        status: 400,
        log: `userController.createUser ERROR: Error in username/password input`,
        message: {
          err: `userController.createUser: ERROR: Error in username/password input`,
        },
        type: "redirect",
        url: "/session/signup",
      });
    }

    // bcrypt password first BEFORE writing to database
    //   https://stackoverflow.com/questions/38469507/what-is-the-sequelize-equivalent-of-mongooses-presave
    try {
      const SALT_WORK_FACTOR: number = 10;
      const hashedPass: string = await bcrypt.hash(
        res.locals.pass,
        SALT_WORK_FACTOR
      );

      const { name, email, pass } = res.locals; // hashedPass declared above
      console.log("HashedPass: ", hashedPass);

      // WRITE new user to user datatable
      const createUserQuery: string = `
      INSERT INTO users
      ("name", "email", "pass")
      VALUES ($1, $2, $3)
      RETURNING *;
      `;
      const values = [name, email, hashedPass];
      const results = await db.query(createUserQuery, values);
      console.log("NEW USER CREATED: ", results.rows[0]);
      res.locals.id = results.rows[0].id;
      return next();
    } catch (err) {
      return next({
        status: 400,
        log: `userController.createUser ERROR: Error in hashing using bcrypt or adding new user to DB -- ${err}`,
        message: {
          err: `userController.createUser: ERROR: Error in hashing using bcrypt or adding new user to DB`,
        },
      });
    }
  } catch (err) {
    return next({
      status: 400,
      log: `userController.createUser ERROR: Error in controller -- ${err}`,
      message: { err: `userController.createUser: ERROR: Error in controller` },
    });
  }
};

// --------------userController.confirmBcryptMatchFirst-----------------

userController.confirmBcryptMatchFirst = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Receiving these in from client-side
    res.locals.email = req.body.email;
    res.locals.pass = req.body.pass;

    // Ensure valid input before proceeding to process & write to DB
    if (!res.locals.email || !res.locals.pass) {
      return next({
        status: 400,
        log: `userController.createUser ERROR: Error in username/password input`,
        message: {
          err: `userController.createUser: ERROR: Error in username/password input`,
        },
        type: "redirect",
        url: "/session/login",
      });
    }

    // READ whether username present in DB
    const searchUserQuery: string = `
        SELECT * FROM users
        WHERE email = $1;
        `;
    const values: string[] = [res.locals.email];
    console.log(res.locals.email);
    const nameResult = await db.query(searchUserQuery, values);
    console.log("Found User: ", nameResult.rows[0]);
    res.locals.id = nameResult.rows[0].id;

    if (!nameResult.rows[0]) {
      return next({
        status: 400,
        log: `userController.createUser ERROR: username input not found`,
        message: {
          err: `userController.createUser: ERROR: username input not found`,
        },
        type: "redirect",
        url: "/session/login",
      });
    } else {
      // Validate password match using bcrypt
      const booleanResult: boolean = await bcrypt.compare(
        res.locals.pass,
        nameResult.rows[0].pass
      );
      console.log(
        "Do bcrypt-hashed results of user input match DB?  ",
        booleanResult
      );
      if (booleanResult) return next(); // Proceed to next middleware
      else {
        return next({
          status: 400,
          log: `userController.createUser ERROR: bcrypt password compare mismatch`,
          message: {
            err: `userController.createUser: ERROR: bcrypt password compare mismatch`,
          },
          type: "redirect",
          url: "/session/login",
        });
      }
    }
  } catch (err) {
    return next({
      status: 400,
      log: `userController.createUser ERROR: Error in controller -- ${err}`,
      message: {
        err: `userController.createUser: ERROR: Error in controller`,
      },
    });
  }
};

// ----------------------userController.isLoggedIn----------------------

userController.isLoggedIn = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Req cookies: ", req.cookies);
    const userCookie = req.cookies.ssid;
    const secretKey = process.env.JWTSECRETKEY;
    console.log("Token/secret key: ", userCookie, secretKey);

    // https://supertokens.com/blog/what-is-jwt
    const loggedIn = jwt.verify(userCookie, secretKey);
    res.locals.loggedIn = loggedIn;
    return next();
  } catch (err) {
    res.locals.loggedIn = false;
    return next();
  }
};

// ----------------------userController.logUserOut----------------------

userController.logUserOut = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const logUserOut = req.params.confirmlogout; // Boolean set to true on front-end based onClick of button
//   console.log("Confirm Logout: ", logUserOut);

  if (logUserOut === "true") {
    console.log(
      "Cookies pre-logout: ",
      req.cookies["Cookie_3"],
      req.cookies["JWT-Cookie"]
    );
    
    res.cookie("JWT-Cookie", "", {httpOnly: true});
    return next();
  } else {
    return next({
      status: 400,
      log: `userController.logUserOut ERROR: logout URL parameter not equal to "true"`,
      message: {
        err: `userController.logUserOut: ERROR: logout URL parameter not equal to "true"`,
      },
    });
  }
};

export default userController;
