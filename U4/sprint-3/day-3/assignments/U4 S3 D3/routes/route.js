const express = require("express");
const { SchemaTypes } = require("mongoose");
const { TodoModel } = require("../models/model");

let getRoute = async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.status(200).send(todos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

let addRoute = async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const newToDo = new TodoModel(data);
    await newToDo.save();
    res.status(200).send({ msg: "new ToDo is added" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

let updateRoute = async (req, res) => {
  const id = req.params.todoId;
  console.log(id);
  try {
    const todos = await TodoModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!todos) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).send({ msg: "data updated" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

let deleteRoute = async (req, res) => {
  let id = req.params.todoId;
  console.log(id);
  try {
    const todos = await TodoModel.findByIdAndDelete(req.params.todoId);
    if (!todos) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).send({ msg: "data deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getRoute, addRoute, updateRoute, deleteRoute };
