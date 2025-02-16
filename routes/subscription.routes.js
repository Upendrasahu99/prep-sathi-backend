import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
  res.send({ message: "Get all subscriptions" });
});

subscriptionRouter.get("/:id", (req, res) => {
  res.send({ message: "Get subscription details" });
}); 

subscriptionRouter.post("/", (req, res) => {
  res.send({ message: "Create new subscription" });
});

subscriptionRouter.put("/:id", (req, res) => {
  res.send({ message: "Update subscription details" });
});

subscriptionRouter.delete("/:id", (req, res) => {
  res.send({ message: "Delete subscription" });
});

subscriptionRouter.post("user/:id", (req, res) => {
  res.send({ message: "Get all user subscriptions" });
});

subscriptionRouter.post("/:id/cancel", (req, res) => {
  res.send({ message: "Cancel subscription" });
});

subscriptionRouter.post("/upcoming-renewal", (req, res) => {
  res.send({ message: "Get upcoming renewal" });
});

export default subscriptionRouter;
