const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  year: { type: Number, required: true },
  type: { type: String, enum: ["notes", "paper"], required: true },
  fileUrl: { type: String, required: true },
  uploadedBy: { type: String, default: "admin" },
}, { timestamps: true });

module.exports = mongoose.model("Material", materialSchema);
