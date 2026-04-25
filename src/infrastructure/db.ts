import mongoose from "mongoose";

export async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI!);
}

const MappingSchema = new mongoose.Schema({
  mappingId: String,
  mapping: Object
});

export const MappingModel = mongoose.model("Mapping", MappingSchema);
