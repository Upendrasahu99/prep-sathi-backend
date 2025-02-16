import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send({ message: "Get all users" });
});

userRouter.get("/:id", (req, res) => {
  res.send({ message: "Get user details" });
});

userRouter.post("/", (req, res) => {
  res.send({ message: "Create new user" });
});

userRouter.put("/:id", (req, res) => {
  res.send({ message: "Update user details" });
});

userRouter.delete("/:id", (req, res) => {
  res.send({ message: "Delete user" });
});

export default userRouter;
