import { Router } from "express";

const subjectRouter = Router();

subjectRouter.get("/", (req, res) => {
  res.send({ message: "Get all subjects" });
});

subjectRouter.get("/:id", (req, res) => {
  res.send({ message: "Get subject details" });
});

subjectRouter.post("/", (req, res) => {
  res.send({ message: "Create new subject" });
});

subjectRouter.put("/:id", (req, res) => {
  res.send({ message: "Update subject details" });
});

subjectRouter.delete("/:id", (req, res) => {
  res.send({ message: "Delete subject" });
});



export default subjectRouter;
