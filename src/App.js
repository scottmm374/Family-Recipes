import React, {useState, useEffect} from 'react';
import './App.css';
import LoginForm from './components/LoginForm.js';
import RecipeForm from './components/RecipeForm.js';
import RecipiesList from './components/RecipiesList.js';

function App() {
   const [userName, setUserName] = useState();
   const [userId, setUserId] = useState();
   const [recipes, setRecipes] = useState();
   const [loggedIn, setLoggedIn] = useState(false);
   const LoginProps = {
      setUserId,
      setUserName,
      setLoggedIn,
      setRecipes
   };

   useEffect(() => {
      //check to see if user is already logged in
      const userToken = localStorage.getItem("token");
      console.log(`userToken: ${userToken}`);
      
      setLoggedIn(userToken || false);
   }, []);
   useEffect(() => {
      console.log(`loggedIn: ${loggedIn}`);
   }, []);

   return (
      <div className="App">
         <nav>
            <a href="#">Home</a>
            <a href="#">About Us</a>
            <a href="#">Contact</a>
         </nav>
         <img src="https://via.placeholder.com/1024x200" />
         <h1>Welcome to the App</h1>
         <p>
            Helping marketers serve unmatched cross-phase personalized 
            experiences at every step of the FirstSpriti Digital Experience 
            Platform powers enterprise-class. These innovations help CMOs 
            challenged with the delivery of omnichannel digital experiences for 
            some of the FirstSpriti Digital Experience Platform powers 
            enterprise-class.
         </p>
         <p>
            Clicking on this link which refers to B2B Marketing awards 
            shortlist will take you to the awards page of the FirstSpriti 
            Digital Experience Platform powers enterprise-class. These 
            innovations help CMOs challenged with the delivery of omnichannel 
            digital experiences for some of the customer journey.
         </p>
         <p>
            Steps taken and calories burnt and send data to a pro version for 
            £7 a month with 15 personalised hub topic and 10 scoops a day. 
            Clicking on this link which refers to B2B Marketing awards 
            shortlist will take you to the awards page of the customer journey.
         </p>
         {!loggedIn && <LoginForm  stateProps={LoginProps} />}
      </div>
   );
}

export default App;
