import { Router } from "express";
import { addSubject } from '../controllers/subject.controller.js'

const subjectRouter = Router();

// path:/api/v1/subjects

subjectRouter.get("/", (req, res) => {
  res.send({ message: "Get all subjects" });
});

subjectRouter.get("/:id", (req, res) => {
  res.send({ message: "Get subject details" });
});

subjectRouter.post("/", addSubject);

subjectRouter.put("/:id", (req, res) => {
  res.send({ message: "Update subject details" });
});

subjectRouter.delete("/:id", (req, res) => {
  res.send({ message: "Delete subject" });
});



export default subjectRouter;
