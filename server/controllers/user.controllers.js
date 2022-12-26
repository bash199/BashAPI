import {User} from "../model/user.model.js";

export const register = async (req, res) => {
   const {body} = req;
   try {
      const user = await User.create(body);
      const token = await user.generateAuthToken();
      res.status(201).send({user, token});
   } catch (e) {
      console.log(e);
      res.status(400).send(e.message);
   }
};

export const login = async (req, res) => {
   const {password, email} = req.body;
   try {
      const user = await User.findByCredentials(email, password);
      const token = await user.generateAuthToken();
      res.send({user, token});
   } catch (e) {
      res.status(400).send(e.message);
   }
};

export const logout = async (req, res) => {
   try {
      const {user} = req;
      user.tokens = user.tokens.filter((token) => token !== req.token);
      await req.user.save();
      res.send("Logged out");
   } catch (e) {
      res.status(400).send(e.message);
   }
};
