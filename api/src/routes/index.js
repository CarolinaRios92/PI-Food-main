const { Router } = require('express');
const routerRecipes = require("./routes_recipes");
const routerDiets = require("./router_diets")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes", routerRecipes);
router.use("/diets", routerDiets);

module.exports = router;
