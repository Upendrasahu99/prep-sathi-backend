import { Router } from "express";
import { addQuestion } from "../controllers/question.controller.js";

const questionRouter = Router();

questionRouter.get("/", (req, res) => {
  res.send({ message: "Get all questions" });
});

questionRouter.get("/:id", (req, res) => {
  res.send({ message: "Get question details" });
});

questionRouter.post("/", addQuestion);

questionRouter.put("/:id", (req, res) => {
  res.send({ message: "Update question details" });
}); 

questionRouter.delete("/:id", (req, res) => {
  res.send({ message: "Delete question" });
});

questionRouter.post("/:id/answer", (req, res) => {
  res.send({ message: "Answer question" });
});

questionRouter.post("/:id/check", (req, res) => {
  res.send({ message: "Check question" });
});

questionRouter.post("/:id/check-answer", (req, res) => {
  res.send({ message: "Check answer" });
}); 




export default questionRouter;

