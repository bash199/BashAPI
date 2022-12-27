import {Router} from "express";
import {register, login, logout} from "../controllers/user.controllers.js";
import {authUser} from "../middleware/authUser.js";

export const userRouter = new Router();

userRouter.get("/test", (req, res) => res.send("working"));

userRouter.get("/checkToken", authUser, (req, res) => res.send(req.user));

userRouter.post("/register", register);

userRouter.post("/login", login);

userRouter.post("/logout", authUser, logout);

userRouter.get("/users/me", authUser, async (req, res) => {
   res.send(req.user);
});
