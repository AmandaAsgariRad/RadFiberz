
import Header from './components/header';
import './App.css';
import React, { useState, useEffect } from "react";
import { onLoginStatusChange, getUserDetails, firebase } from './modules/authManager';
import { BrowserRouter as Router } from 'react-router-dom';
import ApplicationViews from './components/applicationViews';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null),
    [user, setUser] = useState(null);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getUserDetails(firebase.auth().currentUser.uid)
        .then((userObject) => {
          setUser(userObject)
        })
    } else {
      setUser("")
    }
  }, [isLoggedIn])

  // useEffect(() => {
  //   onLoginStatusChange(setIsLoggedIn);
  //   if (!firebase.auth().currentUser) {
  //     setIsLoggedIn(false);
  //     setUser(null);
  //   } else {
  //     setIsLoggedIn(true);
  //     getUserDetails(firebase.auth().currentUser.uid)
  //       .then((userObject) => {
  //         setUser(userObject);
  //       });
  //   }
  // }, []);


  return (
    <div className="App">
      <Router>
        <Header isLoggedIn={isLoggedIn} user={user} />
        <ApplicationViews isLoggedIn={isLoggedIn} />

      </Router>
    </div>
  );
}



export default App;
