import {
  createAnimal,
  getAnimal,
  deleteAnimal,
  isAnimalExist,
  updateAnimalCount,
  getAllAnimals,
} from "./repository.js";

export async function ormCreateAnimal(name, count = 0) {
  try {
    const newAnimal = await createAnimal(name, count);
    await newAnimal.save();
    console.log("NOTHING WRONG HERE", newAnimal);
    return true;
  } catch (err) {
    console.log("ERROR: Could not create new animal");
    return { err };
  }
}

export async function ormIsAnimalExist(name) {
  try {
    const result = await isAnimalExist(name);
    if (result === null) {
      return { success: false };
    }
    return { success: true };
  } catch (err) {
    console.log("ERROR: Could not check that animal exists");
    return { err };
  }
}

export async function ormDeleteAnimal(name) {
  try {
    const { deletedCount } = await deleteAnimal(name);
    return { success: true, message: `Deleted ${name} animal` };
  } catch (err) {
    console.log(`ERROR: Failed to delete animal.`);
    return { err };
  }
}

export async function ormUpdateCount(name, count) {
  try {
    const findAnimal = await getAnimal(name);
    if (findAnimal === null) {
      return { success: false, message: "Animal does not exist", status: 404 };
    }
    const { acknowledged } = await updateAnimalCount(name, count);
    if (acknowledged) {
      return {
        success: true,
        status: 200,
        message: "Successfully updated count",
      };
    } else {
      return {
        success: false,
        status: 500,
        message: "Failed to update count",
      };
    }
  } catch (err) {
    console.log(`ERROR: Failed to update animal count.`);
    return { err };
  }
}

export async function ormGetAllAnimals() {
  try {
    const allAnimals = await getAllAnimals();
    return {
      success: true,
      animals: allAnimals,
    };
  } catch (err) {
    console.log(`ERROR: Failed to get animals.`);
    return { err };
  }
}
