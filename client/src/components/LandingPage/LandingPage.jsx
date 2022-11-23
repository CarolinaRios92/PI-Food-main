import React from "react";
import {Link} from "react-router-dom";
import linkedin from "../../img/linkedin.png";
import github from "../../img/github.png";
import style from "./LandingPage.module.css";

const LandingPage = () => {
    return (
        <div className={style.background}>
            <div className={style.conteiner}>
                <div className={style.main}>
                    <h1 className={style.title}>Welcome to my Individual Proyect Food</h1>
                    <Link to="/home">
                        <button className={style.button}>INGRESAR</button>
                    </Link>
                    <button className={style.buttonRedes}>
                        <span>ABOUT ME</span>
                        <div>
                                <a className={style.a1}
                                    href="https://www.linkedin.com/in/leandra-carolina-rios-431965151"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img className={style.icon} src={linkedin} alt="" />
                                </a>

                                <a
                                    href="https://github.com/CarolinaRios92"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img className={style.icon} src={github} alt="" />
                                </a>
                            </div>
                    </button>
                    <p>Leandra Carolina Ríos</p>
                </div>
            </div>
        </div>
    )
};

export default LandingPage;