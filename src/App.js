import React, { useEffect, useState } from 'react';
import './App.css'; 
import Recipe from './Recipe'; 

const App = () => { 
    const APP_ID = 'c7568f90';
    const APP_KEY = '40b21b69f64c36db388c45759fab3b69';

    const [recipes, setRecipes] = useState([]); 
    const [search, setSearch] = useState(""); 
    const [query, setQuery] = useState("chicken"); 

    useEffect(() => { 
        getRecipes(); 
    }, [query]); // Dependency array ensures getRecipes runs when 'query' changes

    const getRecipes = async () => { 
        const response = await fetch(
            `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
        ); 
        const data = await response.json(); 
        setRecipes(data.hits); 
    }; 

    const updateSearch = e => { 
        setSearch(e.target.value); 
    }; 

    const getSearch = e => { 
        e.preventDefault(); 
        setQuery(search); 
        setSearch(""); 
    }; 

    return ( 
        <div className="App"> 
            <form className="search-form" onSubmit={getSearch}> 
                <input 
                    className="search-bar" 
                    type="text" 
                    value={search} 
                    onChange={updateSearch} 
                /> 
                <button className="search-button" type="submit"> 
                    Search 
                </button> 
            </form> 
            <div className="recipes"> 
                {recipes.map((recipe, index) => ( // Added index as a key for uniqueness
                    <Recipe 
                        key={index} 
                        title={recipe.recipe.label} 
                        calories={recipe.recipe.calories} 
                        image={recipe.recipe.image} 
                        ingredients={recipe.recipe.ingredients} 
                    /> 
                ))} 
            </div> 
        </div> 
    ); 
}; 

export default App;
