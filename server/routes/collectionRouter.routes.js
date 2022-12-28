import {Router} from "express";
import {
   createUserCollection,
   deleteUserCollection,
   getUserCollection,
   getAllUserCollection,
   updateUserCollection,
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
collectionRouter.put(
   "/:collectionName",
   authUser,
   authCollection,
   updateUserCollection
);

// Get a collection
collectionRouter.get(
   "/:collectionName",
   authUser,
   authCollection,
   getUserCollection
);

// Get all collections
collectionRouter.get("/", authUser, getAllUserCollection);
