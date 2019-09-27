import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import RecipesCard from './RecipesCard';
import styled from 'styled-components';

const CardsContainer = styled.div`
   display: flex;
   flex-flow: row wrap;
   justify-content: space-between;
`;

function RecipiesList({recipes, deleteRecipe}) {
   const [displayRecipes, setDisplayRecipes] = useState(recipes || []);
   console.log(JSON.stringify(recipes, null, 3));


   const filterRecipes = value => {
        const allRecipes = recipes;
        const results = allRecipes.filter(recipe => {
            return (recipe.category === value);
        });

        setDisplayRecipes(results);
    } 

   return (
      <>

         <div className="filter-bar">
            <Link to='/add-recipe'><button>Add New Recipe</button></Link>
            <button onClick={() => {setDisplayRecipes(recipes)}}>All</button>
            <button onClick={() => {filterRecipes('Breakfast')}}>Breakfast</button>
            <button onClick={() => {filterRecipes('Lunch')}}>Lunch</button>
            <button onClick={() => {filterRecipes('Dinner')}}>Dinner</button>
            <button onClick={() => {filterRecipes('Dessert')}}>Dessert</button>
            <button onClick={() => {filterRecipes('Snack')}}>Snacks</button>
         </div>
         <CardsContainer>
            {displayRecipes.map(recipe => (
               // <p key={recipe.id}>{recipe.title}</p>
               <RecipesCard key={recipe.id} {...recipe} setDisplayRecipes={setDisplayRecipes} deleteRecipe={deleteRecipe}/>
            ))}
         </CardsContainer>
      </>
   )
}

export default RecipiesList;
