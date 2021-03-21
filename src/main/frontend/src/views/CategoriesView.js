import React from "react";
import "../css/views/CategoriesView.css"
import Navigation from "../components/Navigation";

const CategoriesView = () => {
    return(
        <div id="CategoriesViewContainer">
            <Navigation selected={1}/>
        </div>
    )
}

export default CategoriesView