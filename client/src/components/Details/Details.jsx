import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRecipeDetail, resetDetail } from "../../redux/action";
import RecipeDetails from "../RecipeDetails/RecipeDetails";
import Header from "../Header/Header"

const Details = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const recipe = useSelector((state) => state.recipeDetail);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(getRecipeDetail(id, setLoading))

        //Equivale a ComponentDidInmount()
        return () => dispatch(resetDetail());
    },[dispatch, id]);

    return (
        <div>
            <Header />
            <RecipeDetails 
                    recipe={recipe}
                    id={recipe.id}
                    loading={loading}/>
        </div>
    )
};

export default Details;