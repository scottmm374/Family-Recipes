import React from 'react'
import axios from 'axios'

function DeleteRecipe(props) {
    console.log("props", props)



    const handleDelete = () => {
        axios
            .delete(`https://family-cookbook-api.herokuapp.com/recipes/${props.id}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
           

return (
    <div> 

        <button onClick={handleDelete}>Delete Recipe</button>
    </div>
)
    }

export default DeleteRecipe
