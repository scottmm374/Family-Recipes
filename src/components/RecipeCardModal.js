import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import DinnerImage from '../assets/asparagus-barbecue-bbq-675951.jpg'

const RecipeCardModal = ({ title, author, instructions, ingredients, category,}) => (
  <Modal trigger={<Button>Show Recipe</Button>}>
    <Modal.Header>{title.toUpperCase()}</Modal.Header>
    <Modal.Content image>
      <Image wrapped size='medium' src={DinnerImage}/>
      <Modal.Description>
        <Header>Chef: {author}</Header>
        <p>Ingedients: {ingredients}</p>
        <p>Instructions: 
         {instructions}
        </p>
       
      </Modal.Description>
    </Modal.Content>
  </Modal>
)



export default RecipeCardModal
