import React, { useState, useEffect } from 'react';
import { Route, Link } from "react-router-dom";
import axios from "axios";
import './App.css';
import { Icon } from 'semantic-ui-react';

import LoginForm from './components/LoginForm.js';
import RecipeForm from './components/RecipeForm.js';
import RecipiesList from './components/RecipiesList.js';
import RegisterForm from './components/RegisterForm';

//this is for testing
// import Data from "./data.js";

function App() {
   const [userName, setUserName] = useState();
   const [userId, setUserId] = useState();
   const [recipes, setRecipes] = useState();
   const [loggedIn, setLoggedIn] = useState();

   //Logs the user into the application which will trigger
   //  a call to the server for any stored recipes
   const userLogin = ({ user_id, username, token }, storeData = true) => {
      if (storeData) {
         localStorage.setItem("user-data", JSON.stringify({
            user_id,
            username,
            token
         }));
      }
      setUserId(user_id);
      setUserName(username);
      setLoggedIn(true);
   };

   //  adds recipe to state
   const addRecipe = recipe => {
      setRecipes([...recipes, recipe])
   }

   const deleteRecipe = (recipeId, updateDisplayList) => {
      const recipeList = recipes;

      const newList = recipeList.filter((recipe) => {
         return (recipe.id !== recipeId);
      })

      setRecipes(newList)
      updateDisplayList(newList)
   }

   //Logs the user out of the application
   const userLogout = event => {
      event.preventDefault();

      localStorage.removeItem("user-data");

      setUserId(null);
      setUserName(null);
      setRecipes(null);
      setLoggedIn(false);
   };

   //First page render
   useEffect(() => {
      // console.log("First page render");

      //check to see if user is already logged in
      const userData = localStorage.getItem("user-data");

      if (userData !== null) {
         userLogin(JSON.parse(userData), false);
      }
   }, []);

   //Whenever loggedIn changed
   useEffect(() => {
      const userData = JSON.parse(localStorage.getItem("user-data"));
      // console.log("First render -=or=- loggedIn changed");
      // console.log(userData);

      if (loggedIn) {
         console.log("Grabbing Recipes!");

         // setRecipes(Data);
         axios
            .get("https://family-cookbook-api.herokuapp.com/recipes", {
               user_id: userData.user_id,
               token: userData.token
            })
            .then(response => {
               // console.log(JSON.stringify(response.data, null, 3));
               setRecipes(response.data);
            })
            .catch(error => {
               console.log(error);
            })
      }
   }, [loggedIn]);

   return (
      <div className="App">
         <header>
            <h1>My Secret Family Recipes</h1>
            <div className="user-container">
            {
               (loggedIn)
               ?  (
                     <div>
                        <Icon circular name="user" title="Sign Out" onClick={userLogout} />
                        <p>{userName || "Anonymous"}</p>
                     </div>
                  )
               : <Link to="/login"><button>Sign In</button></Link>
            }
            </div>
            <img src='./img/app-header.jpg' height='347' width='1024' />
         </header>

         {/* <button onClick={() => {
            console.log(`
               username: ${userName || ""},
               user_id: ${userId || ""},
               # recipes: ${(recipes && recipes.length) || 0},
               logged_in: ${loggedIn || false},
            `);
         }}>Show State</button> */}
         <Route path="/" render={
            props => {
               if (loggedIn) {
                  if (!recipes || recipes.length === 0) {
                     return (
                        <div className="welcome-msg empty-list">
                           <Link to='/add-recipe'><button>Add New Recipe</button></Link>
                           <h2>Wow!! Such Empty...</h2>
                        </div>
                     );
                  } else {
                     return (
                        <RecipiesList recipes={recipes} deleteRecipe={deleteRecipe} />
                     );
                  }
               } else {
                  return (
                     <div className="welcome-msg">
                        <h2>Welcome to My Secret Family Recipes!</h2>
                     </div>
                  );
               }
            }
         } />
         <Route exact path="/login" render={
            props => {
               if (!loggedIn) {
                  return <LoginForm {...props} userLogin={userLogin} />;
               }

               return null;
            }
         } />
         <Route exact path="/register" render={
            props => {
               if (!loggedIn) {
                  return <RegisterForm {...props} userLogin={userLogin} />;
               }

               return null;
            }
         } />
         <Route exact path="/add-recipe" render={
            props => {
               if (loggedIn) {
                  return <RecipeForm {...props} addRecipe={addRecipe} />;
               }

               return null;
            }
         } />
         {/* <Route path="/recipe/:id" component={} /> */}
      </div>
   );
}

export default App;
