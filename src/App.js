import React, {useState, useEffect} from 'react';
import {Route, Redirect} from "react-router-dom";
import './App.css';

import LoginForm from './components/LoginForm.js';
import RecipeForm from './components/RecipeForm.js';
import RecipiesList from './components/RecipiesList.js';

function App() {
   const [userName, setUserName] = useState("what?");
   const [userId, setUserId] = useState("another thing");
   const [recipes, setRecipes] = useState([]);
   const [loggedIn, setLoggedIn] = useState(false);
   let isLoggedIn = loggedIn;
   const UserProps = {
      setUserId,
      setUserName,
      setLoggedIn,
      setRecipes
   };

   useEffect(() => {
      //check to see if user is already logged in
      const userToken = localStorage.getItem("token");
      // console.log(`userToken: ${userToken}`);

      isLoggedIn = (userToken !== null);
      // console.log(`isLoggedIn: ${isLoggedIn}`); 
      setLoggedIn(isLoggedIn);
   }, []);
   
//    useEffect(() => {
//       console.log(`{
//    userName: ${userName},
//    userId: ${userId},
//    recipes: ${recipes},
//    loggedIn: ${loggedIn}
// }`
//       );
//    }, [loggedIn]);

//    useEffect(() => {
//       console.log(`{
//    userName: ${userName},
//    userId: ${userId},
//    recipes: ${recipes},
//    loggedIn: ${loggedIn}
// }`
//       );
//    }, [recipes]);

   return (
      <div className="App">
         <header>
            <h1>My Secret Family Recipes</h1>
            <img src="https://via.placeholder.com/1024x200" />
         </header>
         <div className="filter-bar">
            <button>All</button>
            <button>Breakfast</button>
            <button>Lunch</button>
            <button>Dinner</button>
            <button>Desert</button>
            <button>Snacks</button>
         </div>

         {/* <button onClick={() => {
            console.log(`
{
   userName: ${userName},
   userId: ${userId},
   recipes: ${recipes},
   loggedIn: ${loggedIn}
}            
            `);
         }} >State Variables</button> */}
         {!isLoggedIn && <Redirect to="/login" />}


         <Route exact path="/" render={ 
            props => {
               if (!recipes || recipes.length === 0) {
                  return <h2>Wow!! Such Empty...</h2>;
               } else {
                  return (
                     <ul>
                        {recipes.map(recipe => <li key={recipe.id}>{recipe.title}</li>)}
                     </ul>
                  );
               }
            }
         } />
         <Route path="/login" render={props => <LoginForm {...props} userProps={UserProps} />} />
         {/* <Route exact path="/register" component={} /> */}
         {/* <Route exact path="/add-recipe" component={} /> */}
         {/* <Route path="/recipe/:id" component={} /> */}
      </div>
   );
}

export default App;
