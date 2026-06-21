import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  jwtAccessTokenExpiry,
  jwtRefreshTokenExpiry,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
} from "../utils/Env.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 3,
      maxlength: 50,
    },

    userName: {
      type: String,
      trim: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
      lowercase: true,
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
      select: false,
    },

    type: {
      type: String,
      enum: ["consumer", "provider"],
      default: "consumer",
    },

    avatar: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
      maxlength: 300,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    location: {
      type: String,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.userName,
      type: this.type,
    },
    JWT_ACCESS_SECRET,
    { expiresIn: jwtAccessTokenExpiry },
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    JWT_REFRESH_SECRET,
    { expiresIn: jwtRefreshTokenExpiry },
  );
};

userSchema.statics.findByUserNameOrEmail = function (identifier) {
  return this.findOne({
    $or: [
      { email: identifier.toLowerCase() },
      { userName: identifier.toLowerCase() },
    ],
  });
};

const User = mongoose.model("User", userSchema);

export default User;
