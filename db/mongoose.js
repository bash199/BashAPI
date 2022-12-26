import {connect, set} from "mongoose";
import dotenv from "dotenv";
dotenv.config();

set("strictQuery", true);

connect(`${process.env.CLUSTER_URL}`, (error, mongoConnection) => {
   if (error) {
      throw new Error("MongoDB connection error: " + error);
   }
   const {host, port, name} = mongoConnection;
   console.log({host, port, name});
});
