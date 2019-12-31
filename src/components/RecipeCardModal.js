import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import DinnerImage from "../assets/asparagus-barbecue-bbq-675951.jpg";

import styled from "styled-components";

const ShowButton = styled.button`
  border-radius: 10px;
  background: #453b3b;
  color: white;
  padding: 13px;
  margin-top: 1.5rem;
  max-width: 126px;
}
  &:hover {
    background: white;
    color: #453b3b;
  }
`;

const RecipeCardModal = ({
  title,
  author,
  instructions,
  ingredients,
  category
}) => (
  <Modal trigger={<ShowButton>Show Recipe</ShowButton>}>
    <Modal.Header>{title.toUpperCase()}</Modal.Header>
    <Modal.Content image>
      <Image wrapped size="medium" src={DinnerImage} />
      <Modal.Description>
        <Header>Chef: {author}</Header>
        <p>Ingedients: {ingredients}</p>
        <p>
          Instructions:
          {instructions}
        </p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

export default RecipeCardModal;
