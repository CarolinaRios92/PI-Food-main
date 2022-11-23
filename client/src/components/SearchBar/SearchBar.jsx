import React from "react";
import {useState} from "react";
import { useDispatch } from "react-redux";
import {getQuery} from "../../redux/action";
import style from "./SearchBar.module.css";

const SearchBar = () => {

    const dispatch = useDispatch();
    const [name, setName] = useState("");

    const handlerChange = (e) => {
        e.preventDefault()
        setName(e.target.value);
    }

    const handlerSubmit = (e) => {
        e.preventDefault()
        dispatch(getQuery(name));
        setName("");
    }

    return (
        <div className={style.conteiner}>
            <input 
                className={style.input}
                type="text"
                name="search"
                placeholder="Search a Recipe"
                value={name}
                onChange={(e) => handlerChange(e)}
            />

            <button
                className={style.button}
                type="submit"
                onClick={(e) => handlerSubmit(e)}>
                <span className={style.search}>SEARCH</span>
            </button>

        </div>
    )

}

export default SearchBar;