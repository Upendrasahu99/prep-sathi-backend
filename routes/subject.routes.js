import { Router } from "express";
import { addSubject, getSubjects } from '../controllers/subject.controller.js'
import  disableProdRoutes  from '../middlewares/disableProdRoutes.middleware.js'

const subjectRouter = Router();

// path:/api/v1/subjects

// Get all subjects with topics
subjectRouter.get("/", getSubjects);

subjectRouter.get("/:id", (req, res) => {
  res.send({ message: "Get subject details" });
});

subjectRouter.post("/", disableProdRoutes, addSubject);

subjectRouter.put("/:id", (req, res) => {
  res.send({ message: "Update subject details" });
});

subjectRouter.delete("/:id", (req, res) => {
  res.send({ message: "Delete subject" });
});



export default subjectRouter;
