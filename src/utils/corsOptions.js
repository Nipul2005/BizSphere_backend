import { allowedOrigins } from "../constants.js";

const corsOptions = {
  origin: (origin, callback) => {
    console.log(origin, "from backend", allowedOrigins.includes(origin));
    if (!origin) return callback(null, true); // Allow requests with no origin
    if (allowedOrigins.includes(origin)) {
      callback(null, true); // Origin allowed
    } else {
      callback(new Error("Not allowed by CORS")); // Origin not allowed
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"], // Allow specific HTTP methods
  credentials: true, // Enable cookies/auth headers
  allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  exposedHeaders: ["Content-Type", "Authorization"], // Expose headers
};

export default corsOptions;