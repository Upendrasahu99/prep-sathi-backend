import { Router } from "express";

const topicRouter = Router();

topicRouter.get("/", (req, res) => {
  res.send({ message: "Get all topics" });
});

topicRouter.get("/:id", (req, res) => {
  res.send({ message: "Get topic details" });
});

topicRouter.post("/", (req, res) => {
  res.send({ message: "Create new topic" });
});

topicRouter.put("/:id", (req, res) => {
  res.send({ message: "Update topic details" });
});

topicRouter.delete("/:id", (req, res) => {
  res.send({ message: "Delete topic" });
});

export default topicRouter; 
