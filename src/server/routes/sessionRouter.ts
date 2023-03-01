import { Request, Response, Router } from "express";
const router = Router();

import userController from "../controllers/userController";
import cookieController from "../controllers/cookieController";

// const userController = require("../controllers/userController");
// const cookieController = require("../controllers/cookieController");
// import { sessionController } from "../controllers/sessionController";
// import {cookieController} from "../controllers/cookieController";

// POST:  Used for actual signup and login flow
router.post(
  "/signup",
  userController.createUser,
  cookieController.setJWTasCookie,
  (req: Request, res: Response) => {
    return res.status(200).json("Test signup");
    // res.redirect("/main");
  }
);

router.post(
  "/login",
  userController.confirmBcryptMatchFirst,
  cookieController.setJWTasCookie,
  (req: Request, res: Response) => {
    return res.status(200).json("Test login");
    // res.redirect("/main");
  }
);

// GET:  Used for confirming whether user is isLoggedIn, if so, bypassing signup/login (see 2 other endpoints in server.js -- "/" & "/main")
router.get(
  "/signup",
  userController.isLoggedIn,
  (req: Request, res: Response) => {
    return res.status(200).json("Test isLoggedIn");
    // res.redirect("/main");
  }
);

router.get(
  "/login",
  userController.isLoggedIn,
  (req: Request, res: Response) => {
    return res.status(200).json("Test isLoggedIn");
    // res.redirect("/main");
  }
);

export default router;
