import React, {useState} from 'react';
import RecipesCard from './RecipesCard';
import styled from 'styled-components';

const CardsContainer = styled.div`
   display: flex;
   flex-flow: row wrap;
   justify-content: space-between;
`;

function RecipiesList({recipes}) {
   const [displayRecipes, setDisplayRecipes] = useState(recipes || []);
   console.log(JSON.stringify(recipes, null, 3));

   return (
      <>
         <div className="filter-bar">
            <button>All</button>
            <button>Breakfast</button>
            <button>Lunch</button>
            <button>Dinner</button>
            <button>Desert</button>
            <button>Snacks</button>
         </div>
         <CardsContainer>
            {displayRecipes.map(recipe => (
               // <p key={recipe.id}>{recipe.title}</p>
               <RecipesCard key={recipe.id} {...recipe} />
            ))}
         </CardsContainer>
      </>
   )
}

export default RecipiesList;
