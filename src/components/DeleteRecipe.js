import React from "react";
import axios from "axios";

import styled from "styled-components";

const DelButton = styled.button`
  border-radius: 10px;
  background: #453b3b;
  color: white;
  padding: 11px;
  max-width: 125px;
  margin-left: 55px;

  margin-top: 1.5rem;
  &:hover {
    background: white;
    color: #453b3b;
  }
`;

function DeleteRecipe(props) {
  console.log("props", props);

  const handleDelete = () => {
    axios
      .delete(`https://family-cookbook-api.herokuapp.com/recipes/${props.id}`)
      .then(res => {
        console.log(
          "deleting Recipe: ",
          JSON.stringify(res.data.removed, null, 3)
        );

        props.deleteRecipe(props.id, props.setDisplayRecipes);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <DelButton onClick={handleDelete}>Delete Recipe</DelButton>
    </div>
  );
}

export default DeleteRecipe;
