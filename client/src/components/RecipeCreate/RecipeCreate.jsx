import React from "react";
import {useState, useEffect} from "react";
import {useDispatch , useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {postRecipe, getDiets} from "../../redux/action";
import style from "./RecipeCreate.module.css";
import defaultImage from "../../img/default_image.jpg"
import { useHistory } from "react-router-dom";

const RecipeCreate = () => {

    const dispatch = useDispatch();
    const diets = useSelector((state) => state.diets);
    const history = useHistory();

    //Estado formulario:
    const [inputState, setInputState] = useState({
        name: "",
        summary: "",
        healthScore: 0,
        steps: "",
        image: "",
        diets: [],
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(getDiets());
    }, [dispatch]);

    function validate(input){

        let errors = {};
        const minSummary = 10;
        const maxSummary = 1800;

        if(!input.name){
            errors.name = "Name is required";
        } else if(input.name.replaceAll(" ","").length === 0){
            errors.name = "Name is required";
        } else if(input.name.match("^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$") == null){
            errors.name = "Name could be letters, no symbols!"
        }

        if(!input.summary){
            errors.summary = "Summary is required";
        } else if(input.summary.replaceAll(" ", "").length === 0){
            errors.summary = "Summary is required";
        } else if(input.summary.length < minSummary) {
            errors.summary = "Summary is too short";
        } else if(input.summary.length > maxSummary) {
            errors.summary = "Summary is too long";
        }

        if(!input.healthScore){
            errors.healthScore = "Health Score is required"
        } else if(input.healthScore < 1 || input.healthScore > 100){
            errors.healthScore = "The number entered must bebetween 1 and 100."
        }

        if(!input.steps || !input.steps.length){
            errors.steps = "At least one step is required"
        } else {
            for(let i = 0; i < input.steps.length; i++){
                if(input.steps[i].replaceAll(" ", "").length === 0){
                    errors.steps = "Steps can not be empty";
                    break;
                }
            }
        }

        if(input.diets.length === 0){
            errors.diets = "At least one diet is required"
        }

        return errors;
    }

    function updateState(name, value) {
        setInputState({
            ...inputState,
            [name] : value
        })
    }

    function handleOnChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        updateState(name, value);
        setErrors(validate({...inputState, [name]: value}));
    }
    
    function handleStepBtn(e){
        e.preventDefault();
        const steps = inputState.steps ? inputState.steps.map(e => e) : [];
        const id = Number(e.target.id);
        const nextStep = id + 1;

        if(e.target.name === "add"){

            //si el elemento que sigue existe 
            if(typeof(steps[nextStep]) !== "undefined"){
                steps.splice(nextStep, 0, ""); // creo un nuevo elemento "entre medio"
                updateState("steps", [...steps]);
            } else {
            //creo un nuevo elemento al final
                steps.push("");
                updateState("steps", [...steps]);
            }
        } else {
            steps.splice(id, 1); //borro el elemento clickeado
            updateState("steps", [...steps]);
        }
        setErrors(validate({...inputState, "steps" : steps}));
    }

    function updateStateCard(e) {
        const name = e.target.name;
        const id = Number(e.target.id);
        const steps = inputState.steps.map(e => e);

        steps[id] = e.target.value;

        updateState(name, [...steps]);
        setErrors(validate({...inputState, [name]: steps}));
    }

    function handleAdd(e) {
        if(!inputState.diets.includes(e.target.value)){
            updateState("diets", [...inputState.diets, e.target.value])
            setErrors(validate({...inputState, "diets": [...inputState.diets, e.target.value]}));
        } else {
            alert("Can not select the same diet again")
        }        
    }

    function handleRemove(e) {
        const updateDiets = inputState.diets.filter((diet) => diet !== e.target.value)

        updateState("diets", updateDiets);
    }

    function resetState(){
        setInputState({
            name: "",
            summary: "",
            healthScore: "",
            steps: "",
            image: "",
            diets: [],
        })
        setErrors({});
    }

    function handleOnSubmit(e){
        e.preventDefault();
        if(!errors.name && !errors.summary && !errors.healthScore && !errors.steps && !errors.diets){
            const dataRecipe ={
                name: inputState.name.trim(),
                summary: inputState.summary,
                healthScore: Number(inputState.healthScore),
                steps: inputState.steps,
                image: inputState.image || defaultImage,
                diets: inputState.diets,
                createdInDb: true,
            };
    
                dispatch(postRecipe(dataRecipe));
                alert("The recipe was successfully saved")
           
                resetState();
                history.push("/home");
        }     
    }   

    return (
        <div className={style.conteiner}>
            <div className={style.header}>
                <div className={style.conteiner_back}>
                    <Link className={style.link_back}to="/home">
                        <p className={style.back}>←</p>
                    </Link>
                </div>

                <h1>CREATE YOUR RECIPE</h1>

            </div>

            <form className={style.form} onSubmit={(e)=> handleOnSubmit(e)}>
                
                    <label className={style.label}>Name:</label>
                    <input 
                        className={style.input}
                        key="name"
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={inputState.name}
                        autoComplete={"off"}
                        required
                        onChange={(e) => handleOnChange(e)}/>
                        <div>
                            {errors.name && <p className={style.error}>{errors.name}</p>}
                        </div>
                
        
                
                    <label className={style.label}>Summary:</label>
                    <input 
                        className={style.input}
                        key="summary"
                        type="text"
                        name="summary"
                        placeholder="Summary: "
                        value={inputState.summary}
                        autoComplete={"off"}
                        required
                        onChange={(e) => handleOnChange(e)}/>
                    
                            {errors.summary && <p className={style.error}>{errors.summary}</p>}
                    
                

                
                    <label className={style.label}>Health Score: (%)</label>
                    <input 
                        className={style.input}
                        key="healthScore"
                        type="number"
                        name="healthScore"
                        placeholder="Health Score: "
                        value={inputState.healthScore}
                        autoComplete={"off"}
                        onChange={(e) => handleOnChange(e)}/>
                    
                            {errors.healthScore && <p className={style.error}>{errors.healthScore}</p>}
                    
                

                
                    <label className={style.label}>Image: </label>

                    <input 
                        className={style.input}
                        key="image"
                        type="text"
                        name="image"
                        placeholder="URL Image: "
                        value={inputState.image}
                        autoComplete={"off"}
                        onChange={(e) => handleOnChange(e)}/>

                    
                    <img className={style.image}
                        src={inputState.image || defaultImage} 
                        alt="img default" />

                    <div className={style.conteiner_steps}>
                        <label className={style.label}>Steps: </label>
                        <button
                            className={style.add_button}
                            onClick={(e) => handleStepBtn(e)}
                            name="add"
                            id={-1}>
                                Add First
                        </button>
                    </div>
                    
                        {inputState.steps && inputState.steps.length > 0 && inputState.steps?.map((step, i) => 
                        <div key={i}>
                            <div className={style.header_step}>
                                <span>{`${i+1}`}</span>
                                <div>
                                    <button
                                        className={style.add_delete_button}
                                        onClick={(e) => handleStepBtn(e)}
                                        id={i}
                                        name="add">
                                            Add
                                    </button>
                                    <button
                                        className={style.add_delete_button}
                                        onClick={(e) => handleStepBtn(e)}
                                        id={i}
                                        name="remove">
                                            Delete
                                    </button>
                                </div>
                            </div>
                            
                            <textarea 
                                className={style.text}
                                key={i}
                                id={i}
                                name="steps"
                                placeholder="Write a new step... "
                                value={`${step}`}
                                onChange={(e) => updateStateCard(e)}>
                            </textarea>
                        </div>)}
                    
                    
                        {errors.steps && <p className={style.error}>{errors.steps}</p>}
                    
                        <label className={style.label}>Types of diets:</label>
                        <select name="diets"
                                onChange={handleAdd}
                                className={style.select}>
                                    <option value="select">All</option>
                                    {diets && diets.length > 0 && 
                                         diets.map(diet =>
                                            <option
                                                key={diet.id}
                                                value={diet.name}>
                                                    {diet.name}
                                            </option>
                            )}
                        </select>

                        {inputState.diets.length > 0 && (
                            <div>
                                {inputState.diets.map((diet) => (
                                    <span
                                        key={diet}
                                        className={style.selected}>
                                            {diet}
                                            <button
                                                id={diet}
                                                onClick={handleRemove}
                                                value={diet}
                                                className={style.x}>
                                                x
                                            </button>
                                                
                                    </span>
                                ))}
                            </div>
                        )}

                        {errors.diets && <p className={style.error}>{errors.diets}</p>}

                    <button
                        className={style.create_button}
                        type="submit">
                            CREATE
                    </button>
                    
                
            </form>
        </div>
    )
};

export default RecipeCreate;