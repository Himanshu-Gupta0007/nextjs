import mongoose, { Schema, model, models, Document } from "mongoose";

// ================= INTERFACE =================
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "student" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

// ================= SCHEMA =================
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// ================= MODEL =================
const User = models.User || model<IUser>("User", userSchema);

export default User;
