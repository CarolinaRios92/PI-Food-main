const axios = require("axios");
const {Recipe , Diet} = require("../db");

const {API_KEY_1, API_KEY_2, API_KEY_3, API_KEY_4} = process.env;

const getApiInfo = async() => {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY_1}&addRecipeInformation=true&number=100`);
    const apiInfo = await apiUrl.data.results.map((el) => {
        return {
            id: el.id,
            name: el.title,
            summary: el.summary?.replace(/<\/?[^>]+(>|$)/g, ""),
            healthScore: el.healthScore,
            steps: el.analyzedInstructions[0] ? el.analyzedInstructions[0].steps.map(data => data.step) : ["..."],
            image: el.image,
            diets: el.diets,
            createdInDb: false,
        }    
    });
    return apiInfo;
};

const getDbInfo = async() => {
    return Recipe.findAll({
        include: {
            model: Diet,
            attributes: ["name"],
            through: {
                attributes: [],
            }
        }
    });
}

const getAllRecipes = async() => {
    const apiInfo = await getApiInfo();
    let dbInfo = await getDbInfo();
    dbInfo = await dbInfo.map((el) => {
        return {
            id: el.id,
            name: el.name,
            summary: el.summary,
            healthScore: el.healthScore,
            steps: el.steps,
            image: el.image,
            diets: el.diets.map((diet) => diet.name),
            createdInDb: el.createdInDb,
        }
    });
    const totalInfo = apiInfo.concat(dbInfo)
    return totalInfo;
}

module.exports = {
    getApiInfo,
    getDbInfo,
    getAllRecipes
}
