import {Router} from "express";
import {register, login, logout} from "../controllers/user.controllers.js";
import {auth} from "../middleware/auth.js";
import {User} from "../model/user.model.js";

export const userRouter = new Router();

userRouter.get("/test", (req, res) => res.send("working"));

userRouter.get("/checkToken", auth, (req, res) => res.send(req.user));

userRouter.post("/register", register);

userRouter.post("/login", login);

userRouter.post("/logout", auth, logout);

userRouter.get("/users/me", auth, async (req, res) => {
   res.send(req.user);
});
