import {Router} from "express";
import {createUserCollection} from "../controllers/collection.controller.js";
import {authUser} from "../middleware/authUser.js";

export const collectionRouter = new Router();

collectionRouter.post("/newCollection", authUser, createUserCollection);
