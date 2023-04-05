const { Diet } = require("../db");

let dietsArr = [
  "Gluten free",
  "Dairy Free",
  "Vegan",
  "Pescetarian",
  "Ketogenic",
  "Lacto ovo vegetarian",
  "Paleolithic",
  "Primal",
  "Fodmap friendly",
  "Whole 30",
];

const getAllDiets = async () => {
  dietsArr.map((diet) => {
    Diet.findOrCreate({ where: { name: diet } });
  });

  let allDiets = await Diet.findAll();
  return allDiets;
};

module.exports = getAllDiets;
