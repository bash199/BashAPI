import express, {json} from "express";
import {User} from "./model/test.model.js";
import {Schema, model} from "mongoose";
import "./db/mongoose.js";
const PORT = process.env.PORT || 3000;
const app = express();
app.use(json());

let modelArr = [];
let schemaArr = [];
const createModel = (name, schema) => {
   const newSchema = new Schema(schema);
   schemaArr.push(newSchema);
   const newModel = new model(name, schema);
   modelArr.push(newModel);
   return {newSchema, newModel};
};
const schema = new Schema({
   name: {type: String, unique: true, trim: true},
   schem: Schema.Types.Mixed,
});

const schemas = model("schema", schema);

app.get("/schemas/:name", async (req, res) => {
   try {
      const {name} = req.params;
      const {schem} = req.body;
      const {newSchema, newModel} = createModel(name, schem);
      const a = await schemas.create({name: name, schem: newSchema});
      // console.log(newSchema);
      res.status(201).send(newSchema);
   } catch (error) {
      // console.log(error);
      res.status(404).send(error.message);
   }
});

app.put("/schemas/:name", async (req, res) => {
   try {
      const {name} = req.params;
      const {updatedSchem, remove, addedFields} = req.body;
      const sche = await schemas.findOneAndUpdate(
         {name: name},
         {$set: {schem: updatedSchem}}
      );
      // console.log(sche.schem.$id);
      const sc = schemaArr.find((el) => {
         console.log(el.$id);
         if (el.$id == sche.schem.$id) {
            return el;
         }
      });

      // let newObj = makeObj(updatedSchem);
      sc.remove(remove);
      sc.add({addedFields});
      console.log(remove);
      // console.log(newSchema.obj);
      // await NewModel.create(newObj);
      // const response = await NewModel.updateMany(newObj);
      res.send(sc);
   } catch (error) {
      res.status(504).send(error.message);
   }
});

// app.get("/schemas/:name", async (req, res) => {
//    try {
//       const {name} = req.params;
//       const {_id} = req.body;
//       const aa = await schemas.findOne({name: name, _id: _id});
//       res.send(aa);
//    } catch (error) {
//       res.status(504).send(error.message);
//    }
// });

app.get("/allschemas", async (req, res) => {
   try {
      const aa = await schemas.find({});
      res.send(aa);
   } catch (error) {
      res.status(504).send(error.message);
   }
});

const makeObj = (schem) => {
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
      } else {
         newObj[newKey[i]] = newVal[i];
      }
   });
   return newObj;
};

// app.post("/schemas/:name", async (req, res) => {
//    try {
//       const {name} = req.params;
//       const {schem} = req.body;
//       if (schem) {
//          let newObj = makeObj(schem);
//          const a = await schemas.create({name: name, schem: schem});
//          newSchema = new Schema(a.schem);
//          console.log(newSchema.obj);
//          NewModel = model(name, newSchema);
//          const response = await NewModel.create(newObj);
//          res.status(201).send(response);
//       }
//    } catch (error) {
//       res.status(504).send(error.message);
//    }
// });

// app.put("/schemas/:name", async (req, res) => {
//    try {
//       const {name} = req.params;
//       const {updatedSchem, remove, addedFields} = req.body;
//       await schemas.findOneAndUpdate(
//          {name: name},
//          {$set: {schem: updatedSchem}}
//       );
//       let newObj = makeObj(updatedSchem);
//       newSchema.remove(remove);
//       newSchema.add({addedFields});
//       console.log(newSchema.obj);
//       await NewModel.create(newObj);
//       const response = await NewModel.updateMany(newObj);
//       res.send({response});
//    } catch (error) {
//       res.status(504).send(error.message);
//    }
// });

// app.post("/:name/:id", async (req, res) => {
//    try {
//       const {name, id} = req.params;
//       const {body} = req;
//       const response = await NewModel.create(body);
//       res.send(response);
//    } catch (error) {
//       res.status(504).send(error.message);
//    }
// });

app.listen(PORT, () => {
   console.log(` app listening on port ${PORT}`);
});
