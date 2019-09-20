import React from "react";
import styled from "styled-components";
import {Button, Input} from "semantic-ui-react";
import { withFormik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";

import "semantic-ui-css/semantic.min.css";

const FormOverlay = styled.div`
   background-color: #efedec80;
   display: block;
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
   background-color: #4b719c;
   border-radius: 20px;
   width: 600px;
   height: 340px;

   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
`;

const UserInput = styled(Input)`
   font-size: 1.5rem;
   margin: 1rem;
   width: 70%;
`;

const ButtonContainer = styled.div`
   width: 70%;

   display: flex;
   justify-content: flex-end;
`;

function LoginForm () {
   return (
      <FormOverlay>
         <MainForm>
            <Field 
               name="username" 
               type="text" 
               icon="user" 
               iconPosition="left" 
               placeholder="Enter a User Name" 
               component={UserInput}
            />
            <Field 
               name="attempt1" 
               type="password" 
               icon="key" 
               iconPosition="left" 
               placeholder="Type a password" 
               component={UserInput}
            />
            <Field 
               name="attempt2" 
               type="password" 
               icon="key" 
               iconPosition="left" 
               placeholder="Type a password" 
               component={UserInput}
            />
            <ButtonContainer>
               <Button>Register</Button>
            </ButtonContainer>
         </MainForm>
      </FormOverlay>
   );
}

export default withFormik({
   mapPropsToValues: values => {
      return {
         username: values.username || "",
         attempt1: values.attempt1 || "",
         attempt2: values.attempt2 || ""
      };
   },
   handleSubmit: values => {
      console.log(`Register with: \n"${JSON.stringify(values, null, 3)}`);
   }
})(LoginForm);