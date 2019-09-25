import React from 'react'

function RecipesCard(props) {
    return (
        <div className='card'>
            <h3>{props.card.title.toUpperCase()}</h3>
            <h4>{props.card.catagories}</h4>
            <p>{props.card.author}</p>
            {/* {props.card.ingredients.map(ingredient =>
                <ul>
                    <li>{ingredient}</li>
                </ul>    
            )} */}
            
        </div>
    )
}

export default RecipesCard
