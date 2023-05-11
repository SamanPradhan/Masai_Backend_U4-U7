const { json } = require("express");
const express = require("express");
const jwt = require("jsonwebtoken");
const noteRouter = express.Router();
const { noteModel } = require("../models/note.model");
// get all the notes of the current user
noteRouter.get("/", async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  try {
    jwt.verify(token, "masai", async (err, decoded) => {
      if (decoded) {
        console.log(decoded);
        const notes = await noteModel.find({ userID: decoded.userID });
        res.status(200).send(notes);
      }
    });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});
// get all the notes of the current user
noteRouter.get("/:noteID", async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  const id = req.params.noteID;
  try {
    jwt.verify(token, "masai", async (err, decoded) => {
      if (decoded) {
        console.log(decoded);
        const notes = await noteModel.find({ userID: decoded.userID, _id: id });

        res.status(200).send(notes);
      } else {
        res.status(404).send({ msg: err.message });
      }
    });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

// adding new notes of the current user
noteRouter.post("/add", async (req, res) => {
  try {
    const note = new noteModel(req.body);
    await note.save();
    res.status(200).send({ msg: "A new Note has been added" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});
//updating a note of the current user
noteRouter.patch("/update/:noteID", async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  const id = req.params.noteID;
  try {
    jwt.verify(token, "masai", async (err, decode) => {
      if (decode) {
        console.log(decode);
        let noteFind = await noteModel.findByIdAndUpdate(id, req.body, {
          new: true,
        });

        res.status(200).send(noteFind);
      } else {
        res.status(400).send({ msg: "could not verify the user" });
      }
    });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});
//deleting a note of the current user
noteRouter.delete("/delete/:noteID", async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  const id = req.params.noteID;
  try {
    jwt.verify(token, "masai", async (err, decode) => {
      if (decode) {
        console.log(decode);
        let noteFind = await noteModel.findByIdAndDelete(id);

        res.status(200).send({ msg: "The note is deleted" });
      } else {
        res.status(400).send({ msg: "could not verify the user" });
      }
    });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = { noteRouter };
