import React from 'react';
import styled from "styled-components";
import DeleteRecipe from './DeleteRecipe';

const colors = {
   attention: "#ed7769",
   accent: "#4b719c",
   subtle: "#97a1a5",
   textLight: "#efedec",
   textDark: "#594236"
};

const Card = styled.div`
   background-color: ${colors.accent};
   border: 0;
   box-shadow: 0 4px 8px 3px ${colors.subtle};
   color: ${colors.textLight};
   cursor: pointer;
   padding: 1rem;
   margin: 1rem auto;
   width: 30%;
`;

function RecipesCard({ title, author, instructions, ingredients, category,  id, deleteRecipe, setDisplayRecipes }) {
   const renderIngredients = () => {
      const items = ingredients.split(",");
      return (
         items.map((item, idx) => <p key={idx}>{item.trim()}</p>)
      );
   };

   return (
      <Card>
         <h1>{title.toUpperCase()}</h1>
         <h2>{category}</h2>
         <h3>{author}</h3>
         {
            (ingredients && ingredients.length > 0)
               ? renderIngredients()
               : null
         }

         <p>{instructions}</p>

         <DeleteRecipe id={id} deleteRecipe={deleteRecipe} setDisplayRecipes={setDisplayRecipes}/>
      </Card>
   )
}

export default RecipesCard
