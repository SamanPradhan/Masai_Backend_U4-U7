const express = require("express");
const { userModel } = require("../models.js/user.model");

const userRouterq = express.Router();

userRouterq.get("/get", async (req, res) => {
  const payload = req.body;
  const user = new userModel();
});
userRouterq.post("/add", async (req, res) => {});
userRouterq.put("/edit", async (req, res) => {});
userRouterq.delete("/delete", async (req, res) => {});
module.exports = { userRouterq };
