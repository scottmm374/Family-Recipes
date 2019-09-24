import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm.js';

import RecipiesList from './components/recipiesList/RecipiesList'

function App() {
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
         <LoginForm />
      </div>
   );
}

export default App;
