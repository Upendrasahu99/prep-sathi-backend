import express from "express";
import { PORT, NODE_ENV } from "./config/env.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import subjectRouter from "./routes/subject.routes.js";
import questionRouter from "./routes/question.routes.js";
import topicRouter from "./routes/topic.routes.js";
import connectDB from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import arjectMiddleware from "./middlewares/arcjet.middleware.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arjectMiddleware);

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/subjects", subjectRouter);
app.use("/api/v1/questions", questionRouter);
app.use("/api/v1/topics", topicRouter);

// Error middleware
app.use(errorMiddleware);

// Root route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Database connection helper (for Vercel optimization)
let isConnected = false;
const ensureDBConnection = async () => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
};

// Vercel handler
const handler = async (req, res) => {
  try {
    await ensureDBConnection(); // Ensures DB is ready for Vercel
    app(req, res); // Pass request to Express app
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).send("Server Error");
  }
};

// Local development
if (NODE_ENV === "development") {
  const port = PORT || 3000; // Fallback to 3000 if PORT isn’t set
  app.listen(port, async () => {
    console.log(`Prep Sathi Server is running on port http://localhost:${port}`);
    await connectDB();
  });
}

// Export handler for Vercel
export default handler;