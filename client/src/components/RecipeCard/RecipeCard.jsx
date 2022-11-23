import React from "react";
import {Link} from "react-router-dom";
import style from "./RecipeCard.module.css";

const RecipeCard = ({id, image, name, diets, healthScore}) => {

    return (
        <div className={style.card} >
            <div className={style.contents} key={id}>
                <img className={style.image_card} src={image} alt={`recipe ${name}`}/>
                <p className={style.name}>{name}</p>
                <div className={style.info}>
                    <div>
                        <p className={style.subtitles}>Types of diets: </p>
                        <ul className={style.contents}>{diets.map((diet, i) => 
                                <li key={id + i}>{diet[0].toUpperCase() + diet.substring(1)}</li>)
                            }
                        </ul>
                    </div>
                    <div>
                        <p className={style.subtitles} >Health Score:</p>
                        <p className={style.contents}>{healthScore}%</p>
                    </div>
                </div>
                <Link className={style.card_link} to={`/recipes/${id}`}>
                    <button className={style.button}>
                        <span>DETAILS</span>
                    </button>
                </Link>
            </div>
        </div>
    )
};

export default RecipeCard;