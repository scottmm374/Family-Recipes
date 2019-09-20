import React, { useState, useEffect } from 'react'
import { withFormik, Form, Field } from 'formik';
import 
import * as yup from 'yup';
import axios from 'axios';

const RecipeForm = ({ errors, touched, status }) => {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        if (status) {
            setRecipes([...recipes, status])
        }
    }, [status])

    return (
        <div>
            <Form>
                <div className="input-field">
                    {touched.title && errors.title && <p>{errors.title}</p>
                        <Field type="title" name="title" placeholder="Title" />
                </div>
                <div className="input-field">
                    {touched.author && errors.author && <p>{errors.author}</p>
                        <Field type="author" name="author" placeholder="Author" />
                </div>
                <div className="input-field">
                    {touched.ingredients && errors.ingredients && <p>{errors.ingredients}</p>
                        <Field type="ingredients" name="ingredients" placeholder="Ingredients" />
                </div>
                <div className="input-field">
                    {touched.instructions && errors.instructions && <p>{errors.instructions}</p>
                        <Field type="instructions" name="instructions" placeholder="Instructions" />
                </div>
                <div className="input-field">
                    {touched.catagories && errors.catagories && <p>{errors.catagories}</p>
                        <Field type="catagories" name="catagories" placeholder="Catagory" />
                </div>
                <div>
                    <button>Submit</button>
                </div>
            </Form>

        </div>

    )
}

export default RecipeForm;