import {Router} from "express";
import {register, login, logout} from "../controllers/user.controllers.js";
import {authUser} from "../middleware/authUser.js";

export const userRouter = new Router();

//! User Routes  !!!

userRouter.get("/checkToken", authUser, (req, res) => res.send(req.user));
userRouter.get("/test", (req, res) => {
   try {
      console.log("ok");
      res.send("ok");
   } catch (error) {
      res.send(error);
   }
});

userRouter.post("/register", register);

userRouter.post("/login", login);

userRouter.post("/logout/:token", authUser, logout);

userRouter.get("/user/me", authUser, async (req, res) => {
   res.send(req.user);
});
