import React, {useState, useEffect} from 'react';
import {Route} from "react-router-dom";
import './App.css';

import LoginForm from './components/LoginForm.js';
import RecipeForm from './components/RecipeForm.js';
import RecipiesList from './components/RecipiesList.js';

function App(props) {
   const [userName, setUserName] = useState();
   const [userId, setUserId] = useState();
   const [recipes, setRecipes] = useState();
   const [loggedIn, setLoggedIn] = useState(false);
   const UserProps = {
      setUserId,
      setUserName,
      setLoggedIn,
      setRecipes
   };

   useEffect(() => {
      //check to see if user is already logged in
      const userToken = localStorage.getItem("token");
      console.log(`userToken: ${userToken}`);
      
      if (!userToken) {
         setLoggedIn(true);
      } else {
         console.log(props);
      };
   }, []);
   useEffect(() => {
      console.log(`loggedIn: ${loggedIn}`);
   }, []);

   return (
      <div className="App">
         <header>
            <h1>My Secret Family Recipes</h1>
            <img src="https://via.placeholder.com/1024x200" />
         </header>

         <Route exact path="/" render={ 
            props => {
               if (!recipes || recipes.length === 0) {
                  return <h2>Wow!! Such Empty...</h2>;
               } else {
                  return <RecipiesList {...props} />
               }
            }
         } />
         <Route path="/login" render={props => <LoginForm {...props} userProps={UserProps} />} />
         {/* <Route exact path="/register" component={} />
         <Route exact path="/add-recipe" component={} />
         <Route path="/recipe/:id" component={} /> */}
      </div>
   );
}

export default App;
