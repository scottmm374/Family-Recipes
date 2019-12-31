import React, { useState } from "react";
import { Link } from "react-router-dom";
import RecipesCard from "./RecipesCard";
import styled from "styled-components";

const CardsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;

const NewButton = styled.button`
  border-radius: 10px;
  background: #453b3b;
  color: white;
  padding: 11px;
  width: 92px;
  margin-left: 55px;
  box-shadow: 0 4px 8px 3px #97a1a5;
  margin-top: 1.5rem;
  &:hover {
    background: white;
    color: #453b3b;
  }
`;
function RecipiesList({ recipes, deleteRecipe }) {
  const [displayRecipes, setDisplayRecipes] = useState(recipes || []);
  console.log(JSON.stringify(recipes, null, 3));

  const filterRecipes = value => {
    const allRecipes = recipes;
    const results = allRecipes.filter(recipe => {
      return recipe.category === value;
    });

    setDisplayRecipes(results);
  };

  return (
    <>
      <div className="filter-bar">
        <Link to="/add-recipe">
          <NewButton>Add New Recipe</NewButton>
        </Link>
        <NewButton
          onClick={() => {
            setDisplayRecipes(recipes);
          }}
        >
          All
        </NewButton>
        <NewButton
          onClick={() => {
            filterRecipes("Breakfast");
          }}
        >
          Breakfast
        </NewButton>
        <NewButton
          onClick={() => {
            filterRecipes("Lunch");
          }}
        >
          Lunch
        </NewButton>
        <NewButton
          onClick={() => {
            filterRecipes("Dinner");
          }}
        >
          Dinner
        </NewButton>
        <NewButton
          onClick={() => {
            filterRecipes("Dessert");
          }}
        >
          Dessert
        </NewButton>
        <NewButton
          onClick={() => {
            filterRecipes("Snacks");
          }}
        >
          Snacks
        </NewButton>
      </div>
      <CardsContainer>
        {displayRecipes.map(recipe => (
          // <p key={recipe.id}>{recipe.title}</p>
          <RecipesCard
            key={recipe.id}
            {...recipe}
            setDisplayRecipes={setDisplayRecipes}
            deleteRecipe={deleteRecipe}
          />
        ))}
      </CardsContainer>
    </>
  );
}

export default RecipiesList;
