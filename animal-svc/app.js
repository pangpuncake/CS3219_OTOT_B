import express from "express";
import cors from "cors";

import {
  getAllAnimals,
  createAnimal,
  deleteAnimal,
  updateAnimalCount,
} from "./controller/animal-controller.js";
const app = express();
const port = 3000;

const router = express.Router();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

router.get("/", getAllAnimals);
router.post("/", createAnimal);
router.delete("/", deleteAnimal);
router.put("/", updateAnimalCount);

app.use("/api/animal", router).all((_, res) => {
  res.setHeader("content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
