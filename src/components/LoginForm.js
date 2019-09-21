import React from "react";
import styled from "styled-components";
import {Header, Icon, Button} from "semantic-ui-react";
import { withFormik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";

import "semantic-ui-css/semantic.min.css";

const FormOverlay = styled.div`
   /* background-color: #efedec80; */
   background: #f26656;
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
   align-items: center;
`;
const MainForm = styled(Form)`
   background-color: #efedec;
   border-radius: 20px;
   width: 300px;
   height: 500px;
   padding: 3rem 1rem;

   display: flex;
   flex-direction: column;
   justify-content: flex-start;
   align-items: center;
`;
const UserInput = styled(Field)`
   /* background-color: transparent;
   border: none;
   border-bottom: 2px solid #594236; */
   font-size: 1.5rem;
   margin: 0.75rem;
   width: 100%;
`;
const ButtonContainer = styled.div`
   width: 100%;

   display: flex;
   justify-content: flex-end;
`;

function LoginForm ({token}) {
   return (
      <FormOverlay>
         <MainForm>
            <Header as="h2" icon textAlign="center">
               <Icon name="sign-in" circular/>
               <Header.Content>Login</Header.Content>
               {/* <Icon name="signup" circular/>
               <Header.Content>Login</Header.Content> */}
            </Header>
            {/* <label>Username</label> */}
            <UserInput 
               name="username" 
               type="text" 
               placeholder="Enter Your User Name"
            />
            <UserInput 
               name="password1"
               type="password" 
               placeholder="Type your password"
            />
            {
               (token)
               ?  <UserInput 
                     name="password2"
                     type="password" 
                     placeholder="Retype your password"
                  />
               :  null
            }
            <ButtonContainer>
               <Button size="medium" color="blue" type="submit" >Login</Button>
            </ButtonContainer>
         </MainForm>
      </FormOverlay>
   );
}

export default withFormik({
   mapPropsToValues: values => {
      return {
         username: values.username || "",
         password1: values.attempt1 || "",
         password2: values.attempt2 || ""
      };
   },
   handleSubmit: values => {
      console.log(`Register with: \n"${JSON.stringify(values, null, 3)}`);
   }
})(LoginForm);