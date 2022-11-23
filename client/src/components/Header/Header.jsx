import React from "react";
import {Link} from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import style from "./Header.module.css";

const Header = () => {
    return (
        <div className={style.conteiner}>
            <button className={style.btn1}>
                <Link className={style.link_button} to={"/home"}>
                    <span className={style.span}>HOME</span>
                </Link>
            </button>
            <SearchBar className={style.search_bar}/>
            <button className={style.btn2}>
                <Link className={style.link_button} to={"/recipeCreate"}>
                    <span className={style.span}>CREATE RECIPE</span>
                </Link>
            </button>
            
        </div>
        
    )
};

export default Header;