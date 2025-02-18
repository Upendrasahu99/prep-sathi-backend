import { Router } from "express";
import {getUsers, getUser} from '../controllers/user.controller.js';
import authorize from '../middlewares/auth.middleware.js';

const userRouter = Router();

// path:/api/v1/users

userRouter.get("/", getUsers);

userRouter.get("/:id", authorize, getUser);

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
