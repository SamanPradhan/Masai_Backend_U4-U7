const mongoose = require("mongoose");

const ToDoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    password: { type: String, default: false },
    todo: { type: String, required: true },
    completed: { type: Boolean, default: "name" },
  },
  { versionKey: false }
);

const TodoModel = mongoose.model("todo", ToDoSchema);
module.exports = { TodoModel };
