import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import { app } from "./src/app.js";
import BizSphereDB from "./src/database/BizSphereDB.js";

const PORT = process.env.PORT || 5000;

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

async function runServer() {
  try {
    console.log("Connecting to database...");

    await BizSphereDB();

    // console.log("Database connected successfully");

    app.listen(PORT, () => {
      // console.log(
      //   // `Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`,
      // );
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
}

runServer();
