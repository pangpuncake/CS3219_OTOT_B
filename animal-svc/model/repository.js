import AnimalModel from "./animal-model.js";
import "dotenv/config";

//Set up mongoose connection
import mongoose from "mongoose";

let mongoDB = process.env.DB_CLOUD_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export async function createAnimal(name, count) {
  return new AnimalModel({ name: name, count: count });
}

export async function isAnimalExist(name) {
  return AnimalModel.exists({ name: name });
}

export async function getAnimal(name) {
  return AnimalModel.findOne({ name: name });
}

export async function deleteAnimal(name) {
  return AnimalModel.deleteOne({ name: name });
}

export async function updateAnimalCount(name, count) {
  return AnimalModel.updateOne({ name }, { count });
}

export async function getAllAnimals() {
  return AnimalModel.find();
}
