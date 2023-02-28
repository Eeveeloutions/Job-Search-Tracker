const express = require("express");
const router = express.Router();

import { userController } from "../controllers/userController";
// import { sessionController } from "../controllers/sessionController";
import { cookieController } from "../controllers/cookieController";

router.post(
  "/signup",
  userController.createUser,
  cookieController.setJWTasCookie,
  (req: Request, res: Response) => {
    return res.status(200).json("Test signup");
    // return res.redirect("/main");
  }
);

router.post(
  "/login",
  // IS LOGGED IN?
  userController.confirmBcryptMatchFirst,
  cookieController.setJWTasCookie,
  userController.verifyUser,
  (req: Request, res: Response) => {
    return res.status(200).json("Test login");
    // return res.redirect("/main");
  }
);
