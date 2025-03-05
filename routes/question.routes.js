import { Router } from "express";
import { addQuestion, getQuestionsByTopic, getTotalQuestions, deleteQuestions  } from "../controllers/question.controller.js";
import  disableProdRoutes  from '../middlewares/disableProdRoutes.middleware.js';
 
const questionRouter = Router();


// path:/api/v1/questions

questionRouter.get("/", (req, res) => {
  res.send({ message: "Get all questions" });
});

// path:/api/v1/questions/topic/:topic?size=number
questionRouter.get("/topic/:topic", getQuestionsByTopic)

questionRouter.get("/:id", (req, res) => {
  res.send({ message: "Get question details" });
});

questionRouter.post("/", disableProdRoutes, addQuestion);

questionRouter.put("/:id", (req, res) => {
  res.send({ message: "Update question details" });
}); 

questionRouter.delete("/:id", (req, res) => {
  res.send({ message: "Delete question" });
});

questionRouter.delete('/topic/:topic', deleteQuestions)

questionRouter.post("/:id/answer", (req, res) => {
  res.send({ message: "Answer question" });
});

questionRouter.post("/:id/check", (req, res) => {
  res.send({ message: "Check question" });
});

questionRouter.post("/:id/check-answer", (req, res) => {
  res.send({ message: "Check answer" });
}); 

questionRouter.get('/count/topic/:topic', getTotalQuestions);


export default questionRouter;

