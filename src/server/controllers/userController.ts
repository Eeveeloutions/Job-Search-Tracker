import { Request, Response, NextFunction } from "express";
// const { Request, Response, NextFunction } = require("express");

const db = require("../models/postgreSQLmodel.ts");
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

// type UserController = {
//   createUser: void;
//   confirmBcryptMatchFirst: void;
//   verifyUser: void;
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
    if (!res.locals.email || !res.locals.pass)
      return next({
        status: 400,
        log: `userController.createUser ERROR: Error in username/password input -- ${err}`,
        message: {
          err: `userController.createUser: ERROR: Error in username/password input`,
        },
        type: "redirect",
        url: "/session/signup",
      });

    if (res.locals.email && res.locals.pass) {
      // READ whether username present in DB
      const searchUserQuery: string = `
        SELECT * FROM users
        WHERE email = $1
        RETURNING *
        `;
      let values: string[] = [res.locals.email];

      // bcrypt password first BEFORE writing to database
      //   https://stackoverflow.com/questions/38469507/what-is-the-sequelize-equivalent-of-mongooses-presave
      try {
        const SALT_WORK_FACTOR: number = 10;
        const hashedPass: string = await bcrypt.hash(
          res.locals.pass,
          SALT_WORK_FACTOR
        );

        const { name, email, pass } = res.locals; // hashedPass declared above

        // WRITE new user to user datatable
        const createUserQuery: string = `
        INSERT INTO users
        ("name", "email", "pass")
        VALUES ($1, $2, $3)
        RETURNING *
        `;
        values = [name, email, hashedPass];
        const results = await db.query(createUserQuery, values);
        console.log("NEW USER CREATED: ", results.rows[0]);
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
    } // if statement end
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
    res.locals.name = req.body.name;
    res.locals.email = req.body.email;
    res.locals.pass = req.body.pass;

    // Ensure valid input before proceeding to process & write to DB
    if (!res.locals.email || !res.locals.pass)
      return next({
        status: 400,
        log: `userController.createUser ERROR: Error in username/password input -- ${err}`,
        message: {
          err: `userController.createUser: ERROR: Error in username/password input`,
        },
        type: "redirect",
        url: "/session/login",
      });

    if (res.locals.email && res.locals.pass) {
      // READ whether username present in DB
      const searchUserQuery: string = `
    SELECT * FROM users
    WHERE email = $1
    RETURNING *
    `;
      const values: string[] = [res.locals.email];
      const nameResult = await db.query(searchUserQuery);
      console.log("NEW USER DUPLICATE? ", nameResult.rows[0]);

      if (!nameResult.rows[0])
        return next({
          status: 400,
          log: `userController.createUser ERROR: username input not found -- ${err}`,
          message: {
            err: `userController.createUser: ERROR: username input not found`,
          },
          type: "redirect",
          url: "/session/login",
        });
      else {
        // Validate password match using bcrypt
        const booleanResult: boolean = await bcrypt.compare(
          res.locals.pass,
          nameResult.rows[2]
        ); // CONFIRM INDEX IS CORRECT
        console.log(
          "Do bcrypt-hashed results of user input match DB?  ",
          booleanResult
        );
        if (booleanResult) return next(); // Proceed to next middleware
        else
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
    } // end if statement
  } catch (err) {
    return next({
      status: 400,
      log: `userController.createUser ERROR: Error in controller, username dup check error -- ${err}`,
      message: {
        err: `userController.createUser: ERROR: Error in controller, username dup check error`,
      },
    });
  }
};

// ----------------------userController.verifyUser----------------------

userController.verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // res.locals.name = req.body.name;
  // res.locals.email = req.body.email;
  // res.locals.pass = req.body.pass;
  const { name, email, pass } = res.locals; // Available via middleware chain

  // ADD jwt verification here
  // ...
};

module.exports = userController;

// ----------------------

// BELOW UNNEEDED SINCE DB now disallows dups for username (i.e. email)
//     const duplicateName: number = await db
//       .query(searchUserQuery)
//       .then((results: any) => {
//         console.log("NEW USER DUPLICATE? ", results.rows[0]);
//         if (!results.rows[0]) return res.redirect("/session/signup");  // MODIFY:  return err msg w. object
//         else return results.rows[0];
//       })
//       .catch((err: NodeJS.ErrnoException) => {
//         const errorObject = {
//           log: `userController.createUser ERROR: Error in controller, username dup -- ${err}`,
//           message: {
//             err: "userController.createUser: ERROR: Error in controller, username dup",
//           },
//         };
//         return next(errorObject);
//       });
