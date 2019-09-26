import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom';
import axios from 'axios'
import DeleteRecipe from './DeleteRecipe'

function RecipeView() {
    const [newRecipe, setNewRecipe] = useState([]);

    useEffect(() => {
        axios
            .get("https://family-cookbook-api.herokuapp.com/recipes")
            .then(res => {
                setNewRecipe(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    console.log("newRecipe", newRecipe)
    return (
        <section className="Recipe">
            <h2> {newRecipe.map((recipe) => {
                return (
                    <>
                        <DeleteRecipe key={recipe.id}
                            id={recipe.id}
                            title={recipe.title}
                            author={recipe.author}
                            ingredients={recipe.ingredients}
                            instructions={recipe.instructions}
                            category={recipe.category} />
                    </>
                )
            })}</h2>
        </section>
    );
}

export default RecipeView;
