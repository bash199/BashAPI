import {Router} from "express";
import {getUserCollection} from "../controllers/collection.controller.js";
import {
   createDocument,
   updateDocument,
   getDocument,
   deleteDocument,
} from "../controllers/document.controller.js";
import {authCollection} from "../middleware/authCollection.js";
import {authUser} from "../middleware/authUser.js";

export const documentRouter = new Router();

//! Document Routes  !!!
// Get A Collection / All Documents
documentRouter.get(
   "/:token/:collectionName",
   authUser,
   authCollection,
   getUserCollection
);

// Get A Document By ID
documentRouter.get(
   "/:token/:collectionName/:id",
   authUser,
   authCollection,
   getDocument
);

// Create A Document
documentRouter.post(
   "/:token/:collectionName",
   authUser,
   authCollection,
   createDocument
);

// Update A Document By ID
documentRouter.put(
   "/:token/:collectionName/:id",
   authUser,
   authCollection,
   updateDocument
);

// Delete A Document By ID
documentRouter.delete(
   "/:token/:collectionName/:id",
   authUser,
   authCollection,
   deleteDocument
);
