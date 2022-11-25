import React from "react";
import {connect} from "react-redux";
import { getAllRecipes } from "../client/src/redux/action";

class Home extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            cuerrentPage: 1,
            page: 1}
    }

    componentDidMount(){
        this.props.getAllRecipes()
    }

    render(){
        
        const recipesPerPage = 9;
        const {currentPage} = this.state;

        return {

        }
    }
}

export const mapStateToProps = (state) => {
    return {
        allRecipes: state.recipes,
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        getAllRecipes: () => dispatch(getAllRecipes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);