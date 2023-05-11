const express = require("express");
const { SchemaTypes } = require("mongoose");
const { TodoModel } = require("../models/model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const verify = async (req, res) => {
  const { name, password, todo, completed } = req.body;
  console.log(req.body);
  try {
    const todo = await TodoModel.findOne({ name });
    console.log(todo);

    if (todo) {
      bcrypt.compare(password, todo.password, (err, result) => {
        if (result) {
          res.status(200).send({
            msg: "credential successfull",
            token: jwt.sign({ name: "todos" }, "complete", { expiresIn: "1h" }),
          });
        } else {
          res.status(404).send({ msg: "Wrong Password" });
        }
      });
    } else {
      res.status(404).send({ msg: "User not found" });
    }
  } catch (error) {
    res.status(400).send({ msg: "error" });
  }
};
let getRoute = async (req, res) => {
  try {
    const token = req.headers.token;

    const todos = await TodoModel.find();
    jwt.verify(token, "complete", function (err, decoded) {
      decoded
        ? res.status(200).send(todos)
        : res.status(400).send({ msg: "You do not have authority" });
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

let addRoute = async (req, res) => {
  const { name, password, todo, completed } = req.body;
  //console.log(data);
  try {
    bcrypt.hash(password, 2, async (err, hash) => {
      const newToDo = new TodoModel({ name, password: hash, todo, completed });
      await newToDo.save();
      res.status(200).send({ msg: "new todo is added with login info" });
    });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

let updateRoute = async (req, res) => {
  const id = req.params.todoId;
  const token = req.headers.token;
  console.log(id);
  const todos = await TodoModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  try {
    jwt.verify(token, "complete", async function (err, decoded) {
      if (decoded) {
        const updatetodos = await TodoModel.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        !todos
          ? res.status(404).send({ msg: "todo not found" })
          : res.status(200).send({ msg: "data updated" });
      } else {
        res.status(400).send({ msg: "You do not have authority" });
      }
    });
    console.log(id, token, req.body);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

let deleteRoute = async (req, res) => {
  let id = req.params.todoId;
  const token = req.headers.token;
  console.log(id);
  try {
    jwt.verify(token, "complete", async function (err, decoded) {
      if (decoded) {
        const deletetodos = await TodoModel.findByIdAndDelete(
          req.params.todoId
        );
        !deletetodos
          ? res.status(404).send({ msg: "todo not found" })
          : res.status(200).send({ msg: "data deleted" });
      } else {
      }
      res.status(400).send({ msg: "You do not have authority" });
    });
    console.log(id, token, req.body);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  verify,
  getRoute,
  addRoute,
  updateRoute,
  deleteRoute,
};
