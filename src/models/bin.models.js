import mongoose from "mongoose";

const BinSchema = new mongoose.Schema({
  binId: { type: String, required: true, unique: true },
  status: { type: String, default: "new_device" },
  fillLevel: { type: Number, default: 0 },
  location: {
    lat: { type: Number, default: null },
    lng: { type: Number, default: null }
  }
}, { timestamps: true });

const Bin = mongoose.model("Bin", BinSchema);
export default Bin
