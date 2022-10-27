import {
  ormCreateAnimal as _createAnimal,
  ormIsAnimalExist as _checkAnimalExist,
  ormDeleteAnimal as _deleteAnimal,
  ormUpdateCount as _updateAnimalCount,
  ormGetAllAnimals as _getAllAnimals,
} from "../model/animal-orm.js";

export async function createAnimal(req, res) {
  try {
    const { name, count } = req.body;
    console.log(req);

    if (name) {
      const isAnimalExist = await _checkAnimalExist(name);

      if (isAnimalExist.err) {
        return res.status(500).json({
          message: "Database failure when creating new animal!",
        });
      }

      if (isAnimalExist.success) {
        return res.status(400).json({
          message: "Animal name already exists, use a different name",
        });
      }

      const resp = await _createAnimal(name, count);
      if (resp?.err) {
        return res
          .status(400)
          .json({ message: "Could not create a new animal!" });
      } else {
        console.log(`Created new animal ${name} successfully!`);
        return res
          .status(201)
          .json({ message: `Created new animal ${name} successfully!` });
      }
    } else {
      return res.status(400).json({ message: "Animal name is missing!" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Database failure when creating new animal!" });
  }
}

export async function deleteAnimal(req, res) {
  try {
    const { name } = req.body;
    const resp = await _deleteAnimal(name);
    if (resp?.err) {
      return res.status(500).json({
        message: "Database failure when attempting to delete animal!",
      });
    }
    return res
      .status(200)
      .json({ message: `Deleted animal ${name} successfully!` });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Database failure when attempting to delete animal!" });
  }
}

export async function updateAnimalCount(req, res) {
  try {
    const { name, count } = req.body;
    console.log(name, count);
    const resp = await _updateAnimalCount(name, count);

    if (resp?.err) {
      return res.status(500).json({
        message: "Database failure when attempting to update animal count!",
      });
    }
    if (resp.success) {
      return res
        .status(200)
        .json({ message: `Updated animal ${name} count successfully!` });
    } else {
      return res.status(resp.status).json({
        message: resp.message,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Database failure when attempting to update animal count!",
    });
  }
}

export async function getAllAnimals(req, res) {
  try {
    const resp = await _getAllAnimals();

    if (resp?.err) {
      return res.status(500).json({
        message: "Database failure when attempting to get animals!",
      });
    }
    if (resp.success) {
      return res.status(200).json({
        animals: resp.animals,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Database failure when attempting to get animals!",
    });
  }
}
