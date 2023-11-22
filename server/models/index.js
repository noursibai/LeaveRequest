const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
});
const Admin = mongoose.model("Admin", adminSchema);


const requestSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "approved", "denied"],
    default: "pending",
  },
  reason: {
    type: String, 
  }
});
const Request = mongoose.model("Request", requestSchema);


module.exports = {
  User,
  Admin,
  Request,
};
