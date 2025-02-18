import { Router } from "express";
import {getUsers} from '../controllers/user.controller.js';

const userRouter = Router();

// path:/api/v1/users

userRouter.get("/", getUsers);

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
