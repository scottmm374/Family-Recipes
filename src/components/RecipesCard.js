import React from "react";
import styled from "styled-components";
import DeleteRecipe from "./DeleteRecipe";
import RecipeCardModal from "./RecipeCardModal";

const colors = {
  attention: "#ed7769",
  accent: "#04040587",
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
  padding: 3rem;
  margin: 5rem auto;
  width: 30%;
  text-align: center;
  font-family: "Roboto", sans-serif;
`;

const NewH1 = styled.h1`
  border-bottom: 1px solid white;
`;

function RecipesCard({
  title,
  author,
  instructions,
  ingredients,
  category,
  id,
  deleteRecipe,
  setDisplayRecipes
}) {
  const renderIngredients = () => {
    const items = ingredients.split(",");
    return items.map((item, idx) => <p key={idx}>{item.trim()}</p>);
  };

  return (
    <Card>
      <NewH1>{title.toUpperCase()}</NewH1>

      <h2>{category}</h2>
      <h3>{author}</h3>
      {/* <h4>Ingredients</h4>
         {
            (ingredients && ingredients.length > 0)
               ? renderIngredients()
               : null
         }

         <h4>Instructions</h4>
         <p>{instructions}</p> */}

      <DeleteRecipe
        id={id}
        deleteRecipe={deleteRecipe}
        setDisplayRecipes={setDisplayRecipes}
      />
      <RecipeCardModal
        title={title}
        author={author}
        instructions={instructions}
        ingredients={ingredients}
      />
    </Card>
  );
}

export default RecipesCard;
