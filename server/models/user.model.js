const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    isVerified: { type: Boolean, default: false },
    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: { type: String },
    messages: [{ type: Schema.Types.ObjectId, ref: "MessageSchema" }],
  },
  { timestamps: true }
);

module.exports = model("UserModel", userSchema);
