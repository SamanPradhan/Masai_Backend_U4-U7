const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "admin", "super admin"],
    default: "user",
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = { userModel };
// {
//   "name":"Saman Pradhan",
//   "email":"pradhansaman2017@gmail.com",
//   "password":"fjir89f0f",
// }
