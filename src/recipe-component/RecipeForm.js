import React, { useState, useEffect } from 'react'
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';
import { Container, Card } from 'semantic-ui-react'
import axios from 'axios';

const RecipeForm = ({ errors, touched, status }) => {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        if (status) {
            setRecipes([...recipes, status])
        }
    }, [status])

    

    return (

        <Container>
            <Form>
                <div className="input-field">
                    {touched.title && errors.title && <p>{errors.title}</p>}
                        <Field type="title" name="title" placeholder="Title" />
                </div>
                <div className="input-field">
                    {touched.author && errors.author && <p>{errors.author}</p>}
                        <Field type="author" name="author" placeholder="Author" />
                </div>
                <div className="input-field">
                    {touched.ingredients && errors.ingredients && <p>{errors.ingredients}</p>}
                        <Field type="ingredients" name="ingredients" placeholder="Ingredients" />
                </div>
                <div className="input-field">
                    {touched.instructions && errors.instructions && <p>{errors.instructions}</p>}
                        <Field type="instructions" name="instructions" placeholder="Instructions" />
                </div>
                <div className="input-field">
                    {touched.catagories && errors.catagories && <p>{errors.catagories}</p>}
                        <Field type="catagories" name="catagories" placeholder="Catagory" />
                </div>

                <div>
                    <button>Submit</button>
                </div>
            </Form>

            <Card>
                <h4>Recipe</h4>
                {recipes.map(recipe => (
                    <div key={recipe.author}>
                        <p> Title: {recipe.title}</p>
                    </div>
                ))}
            </Card>
        </Container>
    );
}


const FormikForm = withFormik({
    mapPropsToValues({ title, author, ingredients, instructions, catagory}) {
        return {
            title: title || "",
            author: author || "",
            ingredients: ingredients || "",
            instructions: instructions || "",
            catagory: catagory || "",
            
        };
    },


    validationSchema: yup.object().shape({
        title: yup.string().required("Please add Title"),
        author: yup.string().required("Chef's name"),
        ingredients: yup.string().required("List all ingredients"),
        instructions: yup.string().required("Don't forget the instructions!"),
        catagory: yup.string().required(),
    }),

    handleSubmit({resetForm, setSubmitting, setStatus}) {
        axios
        .post(" some url")
        .then(res => {
            // console.log(res, "res");
            setStatus(res.data);
            resetForm();
            setSubmitting(false)
        })
        .catch(err => {
            console.log(err);
            setSubmitting(false);
        })
    }
})(RecipeForm)

export default FormikForm;