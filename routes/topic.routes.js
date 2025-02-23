import { Router } from "express";
import { addTopic, getTopicsBySubject } from '../controllers/topic.controller.js';


const topicRouter = Router();

// path: /api/v1/topics

topicRouter.get("/subject/:subjectId", getTopicsBySubject);

topicRouter.get("/:id", (req, res) => {
  res.send({ message: "Get topic details" });
});

topicRouter.post("/", addTopic);

topicRouter.put("/:id", (req, res) => {
  res.send({ message: "Update topic details" });
});

topicRouter.delete("/:id", (req, res) => {
  res.send({ message: "Delete topic" });
});

export default topicRouter; 
