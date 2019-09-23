import React from "react";
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
// const ButtonContainer = styled.div`
//    width: 100%;

//    display: flex;
//    justify-content: flex-end;
// `;

function LoginForm ({token}) {
   return (
      <FormOverlay>
         <MainForm>
            <Header as="h1" icon textAlign="center">
               <Icon name="sign-in" circular/>
               <Header.Content>Login</Header.Content>
               {/* <Icon name="signup" circular/>
               <Header.Content>Login</Header.Content> */}
            </Header>
            {/* <label>Username</label> */}
            <UIContainer>
               <UILabel>Username
                  <UserInput 
                     name="username" 
                     type="text" 
                     placeholder="Enter Your User Name"
                  />
               </UILabel>
               <UILabel>Password
                  <UserInput 
                     name="password1"
                     type="password" 
                     placeholder="Type your password"
                  />
               </UILabel>
               {
                  (token)
                  ?  <UILabel>Password 2
                        <UserInput 
                           name="password2"
                           type="password" 
                           placeholder="Retype your password"
                        />
                     </UILabel>
                  :  null
               }
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
         username: values.username || "",
         password1: values.attempt1 || "",
         password2: values.attempt2 || ""
      };
   },
   handleSubmit: values => {
      console.log(`Register with: \n"${JSON.stringify(values, null, 3)}`);
   }
})(LoginForm);