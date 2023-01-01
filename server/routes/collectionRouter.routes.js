import {Router} from "express";
import {
   createUserCollection,
   deleteUserCollection,
   getAllUserCollections,
   updateUserCollection,
   getACollection
} from "../controllers/collection.controller.js";
import {authCollection} from "../middleware/authCollection.js";
import {authUser} from "../middleware/authUser.js";

export const collectionRouter = new Router();

//! Collection Routes !!!

// Create New Collection
collectionRouter.post("/:token/newCollection", authUser, createUserCollection);

// Delete A  Collection
collectionRouter.delete(
   "/delete/:token/:collectionName",
   authUser,
   authCollection,
   deleteUserCollection
);

// Update A  Collection
collectionRouter.put(
   "/update/:token/:collectionName",
   authUser,
   authCollection,
   updateUserCollection
);

// Get A Collection
collectionRouter.get(
   "/get/:token/:collectionName",
   authUser,
   authCollection,
   getACollection
);


// Get All Collections
collectionRouter.get("/:token", authUser, getAllUserCollections);
