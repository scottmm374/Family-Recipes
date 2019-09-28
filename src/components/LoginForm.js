import React from "react";
import {Link} from "react-router-dom";
import { withFormik, Form, Field, ErrorMessage } from "formik";
import styled from "styled-components";
import {Header, Icon, Button} from "semantic-ui-react";
import * as yup from "yup";
import axios from "axios";
import colors from "../Colors.js";
import "semantic-ui-css/semantic.min.css";

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
   height: 525px;
   padding: 2.25rem 2rem;
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
const ErrorBadge = styled.p`
   margin: 0;
   position: absolute;
   color: #721c24;
   background-color: #f8d7da;
   border-color: #f5c6cb;
   border-radius: 4px;
   padding: 5px 10px;
`;
const HorizontalLine = styled.hr`
   background-image: linear-gradient(to right, #00000000, #594236bf, #00000000);
   border: 0;
   height: 2px;
   margin: 1.7rem 0;
   width: 100%;
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
               <ErrorMessage name="username" component={ErrorBadge} />
               <UILabel>Username
                  <UserInput 
                     name="username" 
                     type="text" 
                     placeholder="Enter Your User Name"
                  />
               </UILabel>
               <ErrorMessage name="password" component={ErrorBadge} />
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
            <HorizontalLine />
            <Link to="/register">Create an Accout</Link>
         </MainForm>
      </FormOverlay>
   );
}

export default withFormik({
   mapPropsToValues: values => {
      return {
         history: values.history,
         userLogin: values.userLogin,
         username: values.username || "",
         password: values.password || ""
      };
   },
   validationSchema: yup.object().shape({
      username: yup.string()
         .required("Please enter a username.")
         .min(3, "Your username must be at least 3 characters")
         .matches(/^[\w]+$/, "Your username may only contain letters, numbers, and underscore. "),
      password: yup.string()
         .required("Please enter a password.")
         .min(8, "Your password must be at least 8 characters")
         .matches(/^[\S]+$/, "Your password may not contain whitespace")
   }),
   handleSubmit: values => {
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
            values.userLogin(response.data);
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