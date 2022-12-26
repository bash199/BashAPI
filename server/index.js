import express, {json} from "express";
import {Schema, model} from "mongoose";
import {Schemas} from "./model/schemas.schema.js";
import "./db/mongoose.js";
import {userRouter} from "./routes/userRoute.routes.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(json());
app.use("/api/user", userRouter);

const modelObj = {};
const schemaObj = {};

const createModel = async (name, schema) => {
   schemaObj[name] = new Schema(schema);
   await Schemas.create({
      name: name,
      schem: schemaObj[name],
   });
   modelObj[name] = model(name, schemaObj[name]);
   return;
};

app.post("/makeSchema/:name", async (req, res) => {
   try {
      const {name} = req.params;
      const {schem} = req.body;
      await createModel(name, schem);
      res.status(201).send();
   } catch (error) {
      res.status(404).send(error.message);
   }
});

app.put("/updateSchema/:name", async (req, res) => {
   try {
      const {name} = req.params;
      const {remove, addedFields} = req.body;
      const aa = await Schemas.findOne({name: name});
      await schemaObj[name].remove(remove);
      await schemaObj[name].add(addedFields);
      res.send(schemaObj[name]);
   } catch (error) {
      res.status(504).send(error.message);
   }
});

app.get("/schemas/:name", async (req, res) => {
   try {
      const {name} = req.params;
      const aa = await Schemas.findOne({name: name});
      console.dir(aa.mode);
      res.send(aa);
   } catch (error) {
      res.status(504).send(error.message);
   }
});

app.get("/allschemas", async (req, res) => {
   try {
      const allschemas = await Schemas.find({});
      res.send(allschemas);
   } catch (error) {
      res.status(504).send(error.message);
   }
});

function makeObj(schem) {
   let newObj = {};
   const newKey = Object.keys(schem);
   const newVal = Object.values(schem);
   newKey.forEach((el, i) => {
      if (newVal[i] === "Number") {
         newObj[newKey[i]] = Math.floor(Math.random() * 100);
      } else if (newVal[i] === "Array") {
         newObj[newKey[i]] = [];
      } else if (newVal[i] === "Object") {
         newObj[newKey[i]] = {};
      } else if (newVal[i] === "Boolean") {
         newObj[newKey[i]] = Math.random() > 0.5 ? true : false;
      } else {
         newObj[newKey[i]] = newVal[i];
      }
   });
   return newObj;
}

app.post("/schemas/:name", async (req, res) => {
   try {
      const {name} = req.params;
      const {body} = req;

      const a = makeObj(body);
      const b = await modelObj[name].create(a);
      res.send(b);
   } catch (error) {
      res.status(504).send(error.message);
   }
});

app.listen(PORT, () => {
   console.log(` app listening on port ${PORT}`);
});
