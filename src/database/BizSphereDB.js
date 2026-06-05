import { DB_Name } from "../constants.js";
import { MONGO_URL } from "../utils/Env.js";
import mongoose from "mongoose";


const BizSphereDB = async () => {
    try {
      await mongoose.connect(`${MONGO_URL}/${DB_Name}`);

      mongoose.connection.on("connected", () => {
        console.log("Database connected");
      });

      mongoose.connection.on("disconnected", () => {
        console.log("Database disconnected");
      });

      mongoose.connection.on("error", (err) => {
        console.log("Database connection error", err);
      });
    } catch (err) {
      console.log("Database connection error", err);
      process.exit(1);
    }
};

export default BizSphereDB;