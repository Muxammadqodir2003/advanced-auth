const { Schema, model } = require("mongoose");

const deviceSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
    deviceName: { type: String },
    ipAddress: { type: String },
    userAgent: { type: String },
    lastUsedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = model("DeviceModel", deviceSchema);
