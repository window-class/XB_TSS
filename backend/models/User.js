import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    UserName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    Password: {
      type: String,
      required: true,
      minlength: 6,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "Users" }
);

const User = mongoose.model("Users", userSchema);
export default User;

