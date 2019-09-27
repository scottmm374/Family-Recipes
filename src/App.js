import React, {useState, useEffect} from 'react';
import {Route, Link} from "react-router-dom";
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
   const userLogin = ({user_id, username, token}, storeData=true) => {
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

     const newList = recipeList.filter((recipe) =>{
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
                  ?  <div><Icon circular name="user" title="Sign Out" onClick={userLogout} /><p>{userName || "Anonymous"}</p></div>
                  :  <Link to="/login">Sign In</Link>
               }
            </div>
        <img src='./img/app-header.jpg' height='347' width='1024' />
         </header>
         {/* <div className="filter-bar">
            <button>All</button>
            <button>Breakfast</button>
            <button>Lunch</button>
            <button>Dinner</button>
            <button>Desert</button>
            <button>Snacks</button>
         </div> */}

         {/* <button onClick={() => {
            console.log(`
            {
               userName: ${userName},
               userId: ${userId},
               recipes: ${recipes},
               loggedIn: ${loggedIn}
            }`);
         }} >State Variables</button> */}
         {/* {!loggedIn && <Redirect to="/login" />} */}


         <Route exact path="/" render={ 
            props => {
               if (!recipes || recipes.length === 0) {
                  return <h2>Wow!! Such Empty...</h2>;
               } else {
                  return (
                     <RecipiesList recipes={recipes} deleteRecipe={deleteRecipe} />
                  );
               }
            }
         } />
         <Route exact path="/login" render={
            props => <LoginForm {...props} userLogin={userLogin} />
         } />
         <Route exact path="/register" render={
            props => <RegisterForm {...props} userLogin={userLogin} />
         } />
         <Route exact path="/add-recipe" render={
           props => <RecipeForm {...props} addRecipe={addRecipe} />
         } />
         {/* <Route path="/recipe/:id" component={} /> */}
      </div>
   );
}

export default App;
