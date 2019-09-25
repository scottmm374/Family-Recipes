import React, {useState} from "react";
import styled from "styled-components";
import {Header, Icon, Button} from "semantic-ui-react";
import { withFormik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";

import "semantic-ui-css/semantic.min.css";

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

function LoginForm ({errors, touched}) {
   return (
      <FormOverlay>
         <MainForm>
            <Header as="h1" icon textAlign="center">
               <Icon name="sign-in" circular/>
               <Header.Content>Login</Header.Content>
            </Header>
            <UIContainer>
               <ErrorMessage name="username" className="error" component="p" />
               <UILabel>Username
                  <UserInput 
                     name="username" 
                     type="text" 
                     placeholder="Enter Your User Name"
                  />
               </UILabel>
               <ErrorMessage name="password" className="error" component="p" />
               <UILabel>Password
                  <UserInput 
                     name="password"
                     type="password" 
                     placeholder="Type your password"
                  />
               </UILabel>
            </UIContainer>
            <Button fluid animated="fade" color="blue" type="submit">
               <Button.Content visible>Login</Button.Content>
               <Button.Content hidden>
                  <Icon name="sign-in"/>
               </Button.Content>
            </Button>
         </MainForm>
      </FormOverlay>
   );
}

export default withFormik({
   mapPropsToValues: values => {
      return {
         history: values.history,
         ...values.userProps,
         username: values.username || "",
         password: values.password || ""
      };
   },
   validationSchema: yup.object().shape({
      username: yup.string()
         .required("Please enter a username.")
         .min(3, "Your username must be at least 3 characters")
         .matches(/^[\w]+$/, "Please no whitespace. "),
      password: yup.string()
         .required("Please enter a password.")
         .min(8, "Your password must be at least 8 characters")
         .matches(/^[\S]+$/, "Your password may not contain whitespace")
   }),
   handleSubmit: values => {
      /* Login
         {
            user_id: "",
            username: "",
            token: ""
         }
      */

      /* Register
         {
            username: "",
            userID: "",
            token: ""
         }
      */

      console.log(`Send this to auth/login: {
   username: "${values.username}",
   password: "${values.password}"
}`);

      axios
         .post("https://family-cookbook-api.herokuapp.com/auth/login", {
            // username: "admin",
            // password: "password"
            username: values.username,
            password: values.password
         })
         .then(response => {
            values.setLoggedIn(true);
            values.setUserId(response.data.user_id);
            values.setUserName(response.data.username);
            // localStorage.setItem("token", response.data.token);

            return axios.get("https://family-cookbook-api.herokuapp.com/recipes", {
               user_id: response.data.user_id,
               token: response.data.token
            });
         })
         .then(response => {
            console.log("Get Them Recipes!");
            console.log(response.data);
            values.setRecipes(response.data);
            values.history.push("/");
         })
         .catch(error => {
            const msgWords = error.message.split(" ");
            const code = Number(msgWords[msgWords.length-1]);

            switch (code) {
               case 401:
                  console.error("There was a problem with your Username/Password!");
                  break;
               case 500:
                  console.error("There was a problem with the server!");
                  break;
               default:
                  console.error(error);
            }
         });
   }
})(LoginForm);