import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllRecipes, getDiets } from "../../redux/action";
import style from "./Filters.module.css";

const Filters = ({
  handleOrderAlphabetically,
  handleOrderByHealthScore,
  handleDietFilter,
  handleFilterCreated,
}) => {
  const diets = useSelector((state) => state.diets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getAllRecipes());
  };

  return (
    <>
      <form className={style.form}>
        <select
          className={style.select}
          name="Order alpabetically"
          onChange={(e) => handleOrderAlphabetically(e)}
        >
          <option hidden>Order alpabetically</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>

        <select
          className={style.select}
          name="Order by Health Score"
          onChange={(e) => handleOrderByHealthScore(e)}
        >
          <option hidden>Order by Health Score</option>
          <option value="min health score">Min Health Score</option>
          <option value="max health score">Max Health Score</option>
        </select>

        <select
          className={style.select}
          name="Diet Filter"
          onChange={(e) => handleDietFilter(e)}
        >
          <option hidden>All Diets</option>
          {diets &&
            diets?.map((diet, i) => (
              <option key={i} value={diet.name}>
                {diet.name}
              </option>
            ))}
        </select>

        <select
          className={style.select}
          name="Origin filter"
          onChange={(e) => handleFilterCreated(e)}
        >
          <option hidden>All Recipes</option>
          <option value="recipes from API">Recipes from API</option>
          <option value="recipes from DB">Recipes from DB</option>
        </select>

        <button className={style.button} onClick={handleClick}>
          <span className={style.button_name}>RESET ALL</span>
        </button>
      </form>
    </>
  );
};

export default Filters;
