import React from 'react';
import RecipesCard from './RecipesCard';
import styled from 'styled-components';


function RecipiesList(props) {

    console.log(props);

    return (
        <div className='cards-container'>
            {props.data.map(card => (
                <RecipesCard card={card} />
            ))}
        </div>
    )
}

export default RecipiesList;
