import {Router} from "express";
import {
   createUserCollection,
   deleteUserCollection,
   getAllUserCollections,
   updateUserCollection,
} from "../controllers/collection.controller.js";
import {authCollection} from "../middleware/authCollection.js";
import {authUser} from "../middleware/authUser.js";

export const collectionRouter = new Router();

//! Collection Routes !!!

// Create New Collection
collectionRouter.post("/newCollection", authUser, createUserCollection);

// Delete A  Collection
collectionRouter.delete(
   "/delete/:collectionName",
   authUser,
   authCollection,
   deleteUserCollection
);

// Update A  Collection
collectionRouter.put(
   "/update/:collectionName",
   authUser,
   authCollection,
   updateUserCollection
);

// Get All Collections
collectionRouter.get("/", authUser, getAllUserCollections);
