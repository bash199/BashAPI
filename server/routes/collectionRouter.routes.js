import {Router} from "express";
import {
   createUserCollection,
   deleteUserCollection,
   getUserCollection,
   getAllUserCollections,
   updateUserCollection,
} from "../controllers/collection.controller.js";
import {createDocument} from "../controllers/document.controller.js";
import {authCollection} from "../middleware/authCollection.js";
import {authUser} from "../middleware/authUser.js";

export const collectionRouter = new Router();
// Create new collection
collectionRouter.post("/newCollection", authUser, createUserCollection);

// delete a  collection
collectionRouter.delete(
   "/delete/:collectionName",
   authUser,
   authCollection,
   deleteUserCollection
);

// update a  collection
collectionRouter.put(
   "/update/:collectionName",
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
collectionRouter.get("/", authUser, getAllUserCollections);

// Create a document
collectionRouter.post(
   "/:collectionName",
   authUser,
   authCollection,
   createDocument
);
