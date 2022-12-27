import {Router} from "express";
import {
   createUserCollection,
   deleteUserCollection,
} from "../controllers/collection.controller.js";
import {authCollection} from "../middleware/authCollection.js";
import {authUser} from "../middleware/authUser.js";

export const collectionRouter = new Router();
// Create new collection
collectionRouter.post("/newCollection", authUser, createUserCollection);

// delete a  collection
collectionRouter.delete(
   "/:collectionName",
   authUser,
   authCollection,
   deleteUserCollection
);
// update a  collection

// Get a collection

// Get all collections
