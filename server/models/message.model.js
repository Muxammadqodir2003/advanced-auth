const { Schema, model } = require("mongoose");

const messageModel = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
    text: { type: String, required: true },
    device: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("MessageModel", messageModel);
