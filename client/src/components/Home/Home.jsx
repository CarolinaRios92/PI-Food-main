import React from "react";
import Header from "../Header/Header";
import {useDispatch, useSelector} from "react-redux";
import {useState, useEffect} from "react";
import { getAllRecipes,
        orderAlphabetically,
        orderByHealthScore,
        filterDiets,
        filterCreated } from "../../redux/action";
import RecipeCard from "../RecipeCard/RecipeCard";
import Pagination from "../Pagination/Pagination";
import Filters from "../Filters/Filters";
import loading from "../../img/loading.gif";
import style from "./Home.module.css";

const Home = () => {

    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);

    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 9;
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(getAllRecipes());
    },[dispatch])

    // --------- Pagination -------------
    const lastIndex = page * recipesPerPage;
    const firstIndex = lastIndex - recipesPerPage;
    let recipesPaginated = allRecipes.slice(firstIndex, lastIndex);

    // --------- Filters -----------------

    const handleOrderAlphabetically = (e) => {
        e.preventDefault();
        dispatch(orderAlphabetically(e.target.value));
        setCurrentPage(1);
    }

    const handleOrderByHealthScore = (e) => {
        e.preventDefault();
        dispatch(orderByHealthScore(e.target.value));
        setCurrentPage(1);
    }
   
    const handleDietFilter = (e) => {
        e.preventDefault();
        dispatch(filterDiets(e.target.value));
        setCurrentPage(1);
    }

    const handleFilterCreated = (e) => {
        e.preventDefault();
        dispatch(filterCreated(e.target.value));
        setCurrentPage(1);
    }

    return (
        <div className={style.background}>
            <Header className={style.header}/>
            <div className={style.nav}>
                <Filters
                    handleOrderAlphabetically={handleOrderAlphabetically}
                    handleOrderByHealthScore={handleOrderByHealthScore}
                    handleDietFilter={handleDietFilter}
                    handleFilterCreated={handleFilterCreated}
                        />
                <Pagination 
                            totalRecipes={allRecipes.length}
                            recipesPerPage={recipesPerPage}
                            page={page}
                            setPage={setPage}/>
            </div>
        
            <div className={style.main}>
            {recipesPaginated.length > 0 ? recipesPaginated.map((el) => {
                        return (
                            <RecipeCard id={el.id}
                                        name={el.name}
                                        diets={el.diets}
                                        image={el.image}
                                        healthScore={el.healthScore}
                                        key={el.id}
                            />
                        )
                    }) : (
                        <img 
                            src={loading}
                            className={style.loading}
                            alt="loading page" />
                    )
            }
            </div>
                <div className={style.page}>
                    <p>{page}</p>
                </div>
        </div>
    )
};

export default Home;