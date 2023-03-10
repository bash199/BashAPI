import jwt from "jsonwebtoken";
import {User} from "../model/user.model.js";

// Authenticate user
export const authUser = async (req, res, next) => {
   const {token} = req.params;
   try {
      console.log("authUser");
      const secret = process.env.AUTH_SECRET;
      const decoded = jwt.verify(token, secret);
      const user = await User.findOne({
         _id: decoded._id,
         "tokens.token": token,
      });
      if (!user) throw new Error("user not found");
      req.user = user;
      req.token = token;
      next();
   } catch (e) {
      console.error(e);
      res.status(401).send(e.message);
   }
};
