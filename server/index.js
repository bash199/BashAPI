import express, {json} from "express";
import "./db/mongoose.js";
import {userRouter} from "./routes/userRoute.routes.js";
import {collectionRouter} from "./routes/collectionRouter.routes.js";
import {documentRouter} from "./routes/document.routes.js";
import cors from "cors";
import * as url from "url";
import path from "path";
const __dirname = url.fileURLToPath(new URL("./", import.meta.url));
const PORT = process.env.PORT || 4000;

const app = express();

app.use(json());
app.use(cors());
const publicPath = path.join(__dirname, "build");
app.use(express.static(publicPath));
app.use("/api/user", userRouter);
app.use("/api/collection", collectionRouter);
app.use("/api/doc", documentRouter);

app.get("*", (req, res) => {
   console.log(__dirname);
   res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
   console.log(` app listening on port ${PORT}`);
});

//? function makeObj(schem) {
//    let newObj = {};
//    const newKey = Object.keys(schem);
//    const newVal = Object.values(schem);
//    newKey.forEach((el, i) => {
//       if (newVal[i] === "Number") {
//          newObj[newKey[i]] = Math.floor(Math.random() * 100);
//       } else if (newVal[i] === "Array") {
//          newObj[newKey[i]] = [];
//       } else if (newVal[i] === "Object") {
//          newObj[newKey[i]] = {};
//       } else if (newVal[i] === "Boolean") {
//          newObj[newKey[i]] = Math.random() > 0.5 ? true : false;
//       } else if (newVal[i] === "Date") {
//          newObj[newKey[i]] = new Date()
//       } else {
//          newObj[newKey[i]] = newVal[i];
//       }
//    });
//    return newObj;
// }
