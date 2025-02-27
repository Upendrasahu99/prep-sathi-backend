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

console.log('start');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arjectMiddleware);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/subjects", subjectRouter);
app.use("/api/v1/questions", questionRouter);
app.use("/api/v1/topics", topicRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Hello World");
});




if(NODE_ENV === 'development') {
  // listen will not work with vercel so
  app.listen(PORT, async () => {
  console.log(`Prep Sathi Server is running on port http://localhost:${PORT}`);
    await connectDB();
  })
}else{
  // connect to database 
  // In a serverless environment (like Vercel),
  app.use(async (req, res, next) => {
    try {
      await connectDB();
      next();
    } catch (error) {
      next(error);
    }
  });

}


export default app;
