import mongoose from "mongoose";
var Schema = mongoose.Schema;
let AnimalModelSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("AnimalModel", AnimalModelSchema);
