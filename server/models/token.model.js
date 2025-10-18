const { Schema, model } = require("mongoose");

const tokenSchema = new Schema({
  device: { type: Schema.Types.ObjectId, ref: "DeviceModel" },
  refreshToken: { type: String, required: true },
});

module.exports = model("TokenModel", tokenSchema);
