import React from 'react';
import styled from "styled-components";

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

function RecipesCard({ title, author, instructions, ingredients, category }) {
   const renderIngredients = () => {
      const items = ingredients.split(",");
      return (
         items.map((item, idx) => <p key={idx}>{item.trim()}</p>)
      );
   };

   return (
      <Card>
         <h3>{title.toUpperCase()}</h3>
         <h4>{category}</h4>
         <p>{author}</p>
         {
            (ingredients && ingredients.length > 0)
               ? renderIngredients()
               : null
         }
      </Card>
   )
}

export default RecipesCard
