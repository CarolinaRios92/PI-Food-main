import axios from "axios";

export function getAllRecipes(){
    return async function(dispatch){
        try {
            const json = await axios.get("http://localhost:3001/recipes");
            return dispatch({type: "GET_ALL_RECIPES", payload: json.data});
        } catch (error) {
            return {error: error.message}
        }
    }
};

export function getRecipeDetail(id, setLoading){
    setLoading(true)
    return async function(dispatch){
        try {
            const json = await axios.get(`http://localhost:3001/recipes/${id}`);
            return dispatch({type: "GET_RECIPE_DETAIL", payload: json.data});
        } catch (error) {
            return {error: error.message}
        } finally {
            setLoading(false);
        }
    }
}

export function resetDetail(){
    return {type: "RESET_DETAIL"};
}

export function postRecipe(payload){
    return async function(){
        try {
            const json = await axios.post("http://localhost:3001/recipes", payload);
            return json;
        } catch (error) {
            return {error: error.message};
        }
    }
}

export function getDiets(){
    return async function(dispatch){
        try {
            const json = await axios.get("http://localhost:3001/diets");
            return dispatch({
                type: "GET_DIETS",
                payload: json.data
            })
        } catch (error) {
            return {error: error.message};
        }
    }
}

export function orderAlphabetically(payload){
    return {
        type: "ORDER_ALPHABETICALLY",
        payload: payload,
    }
};

export function orderByHealthScore(payload){
    return {
        type: "ORDER_BY_HEALTHSCORE",
        payload: payload
    }
}

export function filterDiets(payload){
    return {
        type: "FILTER_DIETS",
        payload: payload
    }
};

export function filterCreated(payload){
    return {
        type: "FILTER_CREATED",
        payload: payload,
    }
}

export function getQuery(payload){
    return async function(dispatch){
        try {
            const json = await axios.get(`http://localhost:3001/recipes?name=${payload}`)
            return dispatch ({
                type: "GET_QUERY",
                payload: json.data
            })
        } catch (error) {
            return {error: error.message};            
        }
    }
};

export function deleteRecipe(id){
    return async function(dispatch){
        try {
            const json = await axios.delete(`http://localhost:3001/recipes/${id}`);
            return dispatch({type: "DELETE_RECIPE", payload: json.data});
        } catch (error) {
            return {error: error.message};
        }
    }
};

export function updateRecipe(id, recipe){
    return async function(dispatch){
        try {
            const json = await axios.put(`http://localhost:3001/recipes/${id}`, recipe);
            return dispatch({type: "UPDATE_RECIPE", payload: json.data});
        } catch (error) {
            return {error: error.message};
        }
    }
}