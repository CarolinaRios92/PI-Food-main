const {Router} = require("express");
const { getAllRecipes } = require("../controllers/c_recipes");
const {Diet, Recipe} = require("../db");

const router = Router();

router.get("/", async(req, res) => {
    const {name} = req.query;
    const recipes = await getAllRecipes();
    try {
        if(name){
            const recipeName = await recipes.filter((el) => el.name.toLowerCase().includes(name.toLocaleLowerCase()));
            recipeName.length ? res.status(200).send(recipeName) : res.status(404).send("We can't find the recipe");
        } else {
            res.status(200).send(recipes);
        }
    } catch (error) {
        res.status(404).send(error.message)
    }
});

router.get("/:id", async(req, res) => {
    const {id} = req.params;
    
    try {
        if(isNaN(Number(id))){
            Recipe.findByPk(id, {include: [{model: Diet}]})
            .then(recipeDB => {
                if(!recipeDB){
                    return res.status(404).send({error: "Recipe not found!"});
                }
                return res.status(200).send(recipeDB);
            })
        } else {
            const recipes = await getAllRecipes();
            const recipeId = await recipes.find((el) => el.id == id);
            recipeId ? res.status(200).send(recipeId) : res.status(404).send("Incorrect ID");
        }
        
    } catch (error) {
        res.status(404).send(error.message);
    }
});

router.post("/", async(req, res) => {
    const {name, 
            summary, 
            healthScore, 
            steps, 
            image, 
            diets, 
            createdInDb} = req.body;
    
    try {
        if(!name, !summary) return res.status(404).send("name and summary are requied");
        if(/[^a-zA-Z, ]/g.test(name)) return res.status(404).send("Name could be letters, no symbols!")

        const newRecipe = await Recipe.create({name, summary, healthScore, steps, image, createdInDb});

        let dietDb = await Diet.findAll({
            where: {name: diets}
        })

        await newRecipe.addDiet(dietDb);

        res.status(200).send("The recipe was created and added to database");
    } catch (error) {
        res.status(404).send(error.message);
    }
})

router.delete("/:id", async(req, res) => {
    const {id} = req.params;

    try {
        if(id){
            const deleteRecipe = await Recipe.findByPk(id);

            if(deleteRecipe){
                await deleteRecipe.destroy();
                res.status(200).send("The recipe was deleted successfully")
            } else {
                res.status(404).send("ERROR: No matches for that ID.")
            }
        } else res.status(404).send("ERROR: ID does not exist")
    } catch (error) {
        res.status(404).send(error.message);
    }
});

router.put("/:id", async(req, res) => {
    const {id} = req.params;
    const {name, 
            summary, 
            healthScore, 
            steps, 
            image, 
            diets} = req.body;
    
    try {
        const modifyRecipe = await Recipe.findByPk(id);
        modifyRecipe.name = name;
        modifyRecipe.summary = summary;
        modifyRecipe.healthScore = healthScore;
        modifyRecipe.steps = steps;
        modifyRecipe.image = image;
       
        if(diets.length){
            await modifyRecipe.setDiets([]);
            diets.forEach(async e => {
                const auxDiets = await Diet.findAll({
                    where: {name: e}
                });
                await modifyRecipe.addDiet(auxDiets[0])
            });
        }

        await modifyRecipe.save();
        res.status(200).send("The recipe was updated successfully")
    } catch (error) {
        res.status(404).send(error.message);
    }
});

module.exports = router;