
import { Header } from './components/header';
import './App.css';
import React, { useState, useEffect } from "react";
import { onLoginStatusChange, getUserDetails, firebase } from './modules/authManager';
import { Router } from 'react-router-dom';
import { ApplicationViews } from './components/userProfile/applicationViews';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null),
    [user, setUser] = useState(null);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      // firebase.auth().currentUser.uid grabs the firebaseUID -- firebase has many helpers like this
      getUserDetails(firebase.auth().currentUser.uid)
        .then(userObject => {
          setUser(userObject.userType.name)
        })
    } else {
      setUser("")
    }
  }, [isLoggedIn])

  // if (isLoggedIn === null) {
  //   return <Spinner className="app-spinner dark" />;
  // }

  return (
    <div className="App">
      <Router>
        <Header isLoggedIn={isLoggedIn} user={user} />
        <ApplicationViews isLoggedIn={isLoggedIn} />

      </Router>
    </div>
  );
}

// return (
//   <Router>
//     <Header isLoggedIn={isLoggedIn} role={role} />
//     <ApplicationViews isLoggedIn={isLoggedIn} role={role} />
//   </Router>
// );
// }


export default App;
