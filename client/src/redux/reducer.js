
const inicialState = {
    recipes:[],
    copyRecipes:[],
    recipeDetail: {},
    diets:[],
}

function rootReducer (state = inicialState, action) {
    switch(action.type){
        case "GET_ALL_RECIPES":
            return {
                ...state,
                //guardamos las recetas ordenadas alfabeticamente.
                recipes: action.payload.sort((a,b) => a.name.localeCompare(b.name)),
                copyRecipes: action.payload,
            };
        case "GET_RECIPE_DETAIL":
            return {
                ...state,
                recipeDetail: action.payload,
            };
        case "RESET_DETAIL":
            return {
                ...state,
                recipeDetail: {},
            };
        case "GET_DIETS":
            return {
                ...state,
                diets: action.payload
            };
        case "ORDER_ALPHABETICALLY":
            const order = action.payload;
            return {
                ...state,
                recipes: [...orderedArray(state.copyRecipes, order)]
            }
        case "ORDER_BY_HEALTHSCORE":
            const order2 = action.payload;
            return {
                ...state,
                recipes: [...orderedArray2(state.copyRecipes, order2)],
            };

        case "FILTER_DIETS":{
            const recipesDiet = state.copyRecipes?.filter((recipe) => 
                recipe.diets?.includes(action.payload.toLowerCase()) ? recipe : null)
            return {
                ...state,
                recipes: recipesDiet
            }
        };

        case "FILTER_CREATED":{
            const createdFilter = 
                action.payload === "recipes from API"
                    ? state.copyRecipes.filter((recipe) => !recipe.createdInDb)
                    : state.copyRecipes.filter((recipe) => recipe.createdInDb);
                return {
                    ...state,
                    recipes: createdFilter
                }
        };

        case "GET_QUERY": {
            return {
                ...state,
                recipes: action.payload,
            }
        }

        case "DELETE_RECIPE": {
            return {...state}
        }

        case "UPDATE_RECIPE":{
            return {...state}
        }

        default: 
            return {...state};
    }
};

function orderedArray(array, order){
    if(order === "A-Z"){
        return array.sort((a, b) => orderAZ(a.name, b.name));
    }
    if(order === "Z-A"){
        return array.sort((a,b) => orderZA(a.name, b.name));
    }
}

function orderAZ(a,b) {
    if(a > b){
        return 1;
    } if (a < b){
        return -1;
    }
    return 0;
}

function orderZA(a,b) {
    if(a > b){
        return -1;
    } if (a < b){
        return 1;
    }
    return 0;
}

function orderedArray2(array, order){
    if(order === "min health score"){
        return array.sort((a,b) => orderMinor(a.healthScore, b.healthScore))
    }
    if(order === "max health score"){
        return array.sort((a,b) => orderMajor(a.healthScore, b.healthScore))
    }
}

function orderMinor(a,b) {
    return a - b;
}

function orderMajor(a,b){
    return orderMinor(b,a)
}
export default rootReducer;