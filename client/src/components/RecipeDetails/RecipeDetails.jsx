import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import { deleteRecipe } from "../../redux/action";
import {useDispatch} from "react-redux";
import Updater from "../Updater/Updater";
import style from "./RecipeDetails.module.css";
import loadingImg from "../../img/loading.gif";

const RecipeDetails = ({recipe, id, loading}) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [showUpdate, setShowUpdate] = useState(false);

    const handleDelete = async () => {
        const res = await dispatch(deleteRecipe(id));
        alert(res.payload);
        history.push("/home");
    }

    const handleUpdate = () => setShowUpdate(true);

    if(loading){
        return (
            <img 
                src={loadingImg}
                className={style.loading}
                alt="loading page" />
        )
    }

    if(!recipe || !Object.keys(recipe).length){
        return (
            <p>Not found</p>
        )
    }
    
    return (
        <div className={style.background}>
            
            { !showUpdate ?
            <>
                <img className={style.image} src={recipe.image} alt={`recipe ${id}`} />
                <div className={style.conteiner}>
                    <h3 className={style.name}>{recipe.name}</h3>
                    
                    <div className={style.summary}>
                        <p className={style.subtitle}>Summary:</p>
                        <p className={style.text}>{recipe.summary}</p>
                    </div>

                    <div>
                        <p className={style.subtitle}>Type of Diets:</p>
                        <ul className={style.diets}>{recipe.diets?.map((el, i) =>
                                    (typeof el === "object") ?
                                            <li key={id + i} className={style.text}>{el.name[0].toUpperCase() + el.name.substring(1)}</li>
                                        : 
                                            <li key={id + i} className={style.text}>{el[0].toUpperCase() + el.substring(1)}</li>
                                        )}</ul>
                    </div>
                        
                    <div className={style.steps}>
                        <p className={style.subtitle}>Steps:</p>
                        {recipe.steps?.map((step, i) => 
                                    <p className={style.text} key={i}>{`${i+1}. ${step}`}</p>            
                                )}
                    </div>
                        
                    <div className={style.healthScore}>
                        <p className={style.subtitle}>Health Score:</p>
                        <p className={style.text}>{`${recipe.healthScore} %`}</p>
                    </div>
                </div>    

                {(typeof id === "string") ? id.includes("-") && 
                    <div>
                        <button className={style.button_update} onClick={handleUpdate}>Update</button>
                        <button className={style.button_delete} onClick={handleDelete}>Delete</button>
                    </div> : null
                }

                <Link to={"/home"}>
                    <button className={style.button}>
                        <span>Back</span>
                    </button>
                </Link>

            </>
                :
                <div>
                    <Updater id={id} setShowUpdater={setShowUpdate} />
                </div>
            }
            
        </div>
    )
};

export default RecipeDetails;