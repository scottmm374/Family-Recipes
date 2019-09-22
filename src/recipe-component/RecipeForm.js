import React, { useState, useEffect } from 'react'
import { withFormik, Form, Field } from 'formik';
import styled from "styled-components";
import { Header, Icon, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import * as yup from 'yup';
import axios from 'axios';

// Styling 

const colors = {
    attention: "#ed7769",
    accent: "#4b719c",
    subtle: "#97a1a5",
    textLight: "#efedec",
    textDark: "#594236"
};

const FormOverlay = styled.div`
    background: #f26656b2;
    background: linear-gradient(74deg, #f26656b2 0%, #4b559cb2 100%);
    z-index: 1;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    overflow: auto;
    display: flex;
    justify-content: center;
 `;
const MainForm = styled(Form)`
    background-color: ${colors.textLight};
    border-radius: 20px;
    width: 300px;
    height: 480px;
    padding: 3rem 2rem;
    margin-top: 5%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
 `;
const UIContainer = styled.div`
    margin: 2rem 0;
    width: 100%;
 `;
const UserInput = styled(Field)`
    background-color: transparent;
    border: none;
    border-bottom: 2px solid ${colors.textDark};
    color: ${colors.textDark};
    font-size: 1.5rem;
    margin: 0.25rem 0 1.75rem;
    outline: none;
    width: 100%;
 `;
const UILabel = styled.label`
    color: ${colors.textDark};
 `;


// Main form

const RecipeForm = ({ errors, touched, status }) => {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        if (status) {
            setRecipes([...recipes, status])
        }
    }, [status])



    return (


        <FormOverlay>
            <MainForm>
                <UIContainer>
                    <div className="input-field">
                        {/* {touched.title && errors.title && <p>{errors.title}</p>} */}
                        <UserInput type="text" name="title" placeholder="Title" />
                    </div>
                    <div className="input-field">
                        {/* {touched.author && errors.author && <p>{errors.author}</p>} */}
                        <UserInput type="text" name="author" placeholder="Author" />
                    </div>
                    <div className="input-field">
                        {/* {touched.ingredients && errors.ingredients && <p>{errors.ingredients}</p>} */}
                        <UserInput component="textarea" name="ingredients" placeholder="Ingredients" />
                    </div>
                    <div className="input-field">
                        {/* {touched.instructions && errors.instructions && <p>{errors.instructions}</p>} */}
                        <UserInput component="textarea" name="instructions" placeholder="Instructions" />
                    </div>

                    {/* // Just intial field for catagory */}
                    <div className="input-field">
                        {/* {touched.catagories && errors.catagories && <p>{errors.catagories}</p>} */}
                        <UserInput component="select" name="catagories" placeholder="Catagories">
                            <option value="select">Select one</option>
                            <option value="dinner">Dinner</option>
                            <option value="lunch">Lunch</option>
                            <option value="breakfast">Breakfast</option>
                            <option value="desert">Desert</option>
                        </UserInput >
                    </div>

                    <Button fluid animated="fade" color="blue" type="submit">
                        <Button.Content visible>Add Recipe</Button.Content>
                        <Button.Content hidden>
                        </Button.Content>
                    </Button>


                </UIContainer>
            </MainForm>
        </FormOverlay>

    );
}


const FormikForm = withFormik({

    mapPropsToValues({ title, author, ingredients, instructions, catagories }) {
        return {
            title: title || "",
            author: author || "",
            ingredients: ingredients || "",
            instructions: instructions || "",
            catagories: catagories || "",

        };
    },


    validationSchema: yup.object().shape({
        title: yup.string().required("Please add Title"),
        author: yup.string().required("Chef's name"),
        ingredients: yup.string().required("List all ingredients"),
        instructions: yup.string().required("Don't forget the instructions!"),
        // catagory: yup.string().required(),
    }),


    handleSubmit(values, { resetForm, setSubmitting, setStatus }) {

        let newRecipe = values;
        newRecipe.ingredients = newRecipe.ingredients.split(",")
        // console.log(`Recipe: \n"${JSON.stringify(values, null, 3)}`)
        axios
            .post("https://reqres.in/api/recipes", newRecipe)
            .then(res => {
                // console.log(res, "res");
                setStatus(res.data);
                resetForm();
                setSubmitting(false)
                return new Promise ((resolve) => {
                    resolve(res)
                });
            })
            .then(res=> {
                console.log(`post complete: \n"${JSON.stringify(res, null, 3)}`)
                // axios
                // .get(`https://reqres.in/api/recipes/${res.data.id}`)
                // .then(res => {
                //     console.log("responce", res);
                // })

            })
            .catch(err => {
                console.log(err);
                setSubmitting(false);
            })
    }
})(RecipeForm)

export default FormikForm;