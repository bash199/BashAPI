import {Router} from "express";
import {auth} from "../middleware/auth.js";

export const collectionRouter = new Router();

collectionRouter.post("/newCollection", auth, async (req, res) => {
   try {
      const {schema, name} = req.body;
      const {user} = req;
      createSchema(schema);
      res.send(user);
   } catch (error) {
      res.status(404).send(error.message);
   }
});
