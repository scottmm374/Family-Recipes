import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import styled from "styled-components";
import { Header, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import * as yup from "yup";
import axios from "axios";

// Styling

const colors = {
  attention: "#ed7769",
  accent: "#04040587",
  subtle: "#97a1a5",
  textLight: "#efedec",
  textDark: "#594236"
};

const FormOverlay = styled.div`
  background: #04040587;

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
  width: 900px;
  height: 800px;
  padding: 3rem 2rem;
  margin-top: 5%;
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-shadow: 0 4px 15px black;
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
  // margin: 0.25rem 0 1.75rem;
  margin-bottom: 5rem;
  outline: none;
  width: 100%;
`;

const NewHeader = styled.h4`
  font-size: 2.5rem;
  padding-bottom: 2rem;
  color: ${colors.attention};
`;

const Error = styled.p`
  font-size: 1rem;
  color: red;
`;

// Main form

const RecipeForm = ({ values, errors, touched, status }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (status) {
      setRecipes([...recipes, status]);
    }
  }, [status]);

  return (
    <FormOverlay
      className="overlay"
      onClick={event => {
        if (event.target.matches(".overlay")) {
          values.history.push("/");
        }
      }}
    >
      <MainForm>
        <Header>
          <NewHeader>Add Family Recipe</NewHeader>
        </Header>

        <UIContainer>
          <div>
            {touched.title && errors.title && <Error>{errors.title}</Error>}
            <UserInput type="text" name="title" placeholder=" Recipe Title" />
          </div>
          <div>
            {touched.author && errors.author && <Error>{errors.author}</Error>}
            <UserInput type="text" name="author" placeholder="Recipe Author" />
          </div>
          <div>
            {touched.ingredients && errors.ingredients && (
              <Error>{errors.ingredients}</Error>
            )}
            <UserInput
              component="textarea"
              name="ingredients"
              placeholder="List all Ingredients separated by a comma"
            />
          </div>
          <div>
            {touched.instructions && errors.instructions && (
              <Error>{errors.instructions}</Error>
            )}
            <UserInput
              component="textarea"
              name="instructions"
              placeholder="Cooking Instructions"
            />
          </div>

          <div>
            {touched.category && errors.category && (
              <Error>{errors.category}</Error>
            )}
            <UserInput
              component="select"
              name="category"
              placeholder="category"
            >
              <option value="" defaultValue disabled>
                Select one
              </option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Dessert">Dessert</option>
              <option value="Snacks">Snacks</option>
            </UserInput>
          </div>

          <Button fluid animated="fade" color="blue" type="submit">
            <Button.Content visible>Add Recipe</Button.Content>
            <Button.Content hidden></Button.Content>
          </Button>
        </UIContainer>
      </MainForm>
    </FormOverlay>
  );
};

const FormikForm = withFormik({
  mapPropsToValues({
    title,
    author,
    ingredients,
    instructions,
    category,
    history,
    addRecipe
  }) {
    return {
      title: title || "",
      author: author || "",
      ingredients: ingredients || "",
      instructions: instructions || "",
      category: category || "",
      history,
      addRecipe
    };
  },

  validationSchema: yup.object().shape({
    title: yup.string().required("Please add recipe Title"),
    author: yup.string().required("Add recipe authors name"),
    ingredients: yup.string().required("List all ingredients"),
    instructions: yup.string().required("Don't forget the instructions!")
  }),

  handleSubmit(values, { setSubmitting }) {
    console.log({
      title: values.title,
      author: values.author,
      ingredients: values.ingredients,
      instructions: values.instructions,
      category: values.category
    });
    axios
      .post("https://family-cookbook-api.herokuapp.com/recipes", {
        title: values.title,
        author: values.author,
        ingredients: values.ingredients,
        instructions: values.instructions,
        category: values.category
      })
      .then(res => {
        console.log("server Response: ", res.data);
        values.addRecipe(res.data);
        values.history.push("/");
      })

      .catch(err => {
        console.log(err);
        setSubmitting(false);
      });
  }
})(RecipeForm);

export default FormikForm;
