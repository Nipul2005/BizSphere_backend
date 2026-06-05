import { app } from "./src/app.js";
import dotenv from "dotenv";
import BizSphereDB from "./src/database/BizSphereDB.js";
import ApiError from "./src/utils/ApiError.utils.js";
dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 5000;

async function runServer() {
  try {
    await BizSphereDB();
    app.listen(PORT, () => {
      console.log(`Server running in production mode on port ${PORT}`);
    });
  } catch (error) {
    throw new ApiError("Database connection error", 500, err);
  }
}

runServer();

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});
