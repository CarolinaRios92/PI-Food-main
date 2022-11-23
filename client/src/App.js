import './App.css';
import { BrowserRouter, Route} from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import Details from "./components/Details/Details";
import RecipeCreate from "./components/RecipeCreate/RecipeCreate";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        
        <Route exact path={"/home"} component={Home}/>
        <Route exact path={"/"} component={LandingPage}/>
        <Route exact path={"/recipeCreate"} component={RecipeCreate} />
        <Route exact path={"/recipes/:id"} component={Details} />
      </div>
    </BrowserRouter>

  );
}

export default App;
