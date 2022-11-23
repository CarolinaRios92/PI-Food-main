import React from "react";
import style from "./Pagination.module.css"

const Pagination = ({page, totalRecipes, setPage, recipesPerPage}) => {

    const totalPages = Math.ceil(totalRecipes / recipesPerPage);
    let pagesNumber = [];
    for (let i = 1; i < totalPages; i++){
        pagesNumber.push(i);
    }
    
    return (
        <nav className={style.nav}>
        {page !== 1 && (
            <button
                className={style.number}
                onClick={() => setPage(page-1)}
            >
                <span>Prev</span>
            </button>
        )}
        {pagesNumber.map((num) => 
            num > 0 && (
                <button
                    className={style.number}
                    onClick={() => setPage(num)}
                    key={num}
                >
                    <span>{num}</span>
                </button>
        ))}
        {page !== totalPages && (
            <button
                className={style.number}
                onClick={() => setPage(page+1)}
            >
                <span>Next</span>
            </button>
        ) }
    </nav>

    )
};

export default Pagination;