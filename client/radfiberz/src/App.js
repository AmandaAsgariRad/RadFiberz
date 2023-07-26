import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null),
    [role, setRole] = useState("")

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      // firebase.auth().currentUser.uid grabs the firebaseUID -- firebase has many helpers like this
      getUserDetails(firebase.auth().currentUser.uid)
        .then(userObject => {
          setRole(userObject.userType.name)
        })
    } else {
      setRole("")
    }
  }, [isLoggedIn])

  // if (isLoggedIn === null) {
  //   return <Spinner className="app-spinner dark" />;
  // }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
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
