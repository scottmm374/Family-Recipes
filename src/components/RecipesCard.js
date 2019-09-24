import React from 'react'

function RecipesCard(props) {
    return (
        <div className='card'>
            <h3>{props.card.title.toUpperCase()}</h3>
            
        </div>
    )
}

export default RecipesCard
