import firebase from "firebase/app";
import "firebase/auth";


const _apiUrl = "/api/userprofile";

//create function that gets token from firebase
export const getToken = () => firebase.auth().currentUser.getIdToken();


export const getUserDetails = (firebaseUUID) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/${firebaseUUID}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(res => res.json());
    });
};

const _doesUserExist = (firebaseUserId) => {
    return getToken()
        .then((token) =>
            fetch(`${_apiUrl}/${firebaseUserId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        )
        .then((resp) => {
            if (!resp.ok) {
                throw new Error(`HTTP error! status: ${resp.status}`);
            }
            return resp.json();
        })
        .catch((error) => {
            console.error("Error fetching user data:", error);
        });
};

const _saveUser = (userProfile) => {
    return getToken().then((token) =>
        fetch(_apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userProfile),
        }).then((resp) => resp.json())
    );
};



// export const login = (email, pw) => {
//     return firebase.auth().signInWithEmailAndPassword(email, pw)
//         .then((signInResponse) => _doesUserExist(signInResponse.user.uid))
//         .then((doesUserExist) => {
//             if (!doesUserExist) {

//                 // If we couldn't find the user in our app's database, or the user is deactivated, we should logout of firebase
//                 logout();

//                 throw new Error("Something's wrong. The user exists in firebase, but not in the application database. (User may be deactivated)");
//             }
//         }).catch(err => {
//             console.error(err);
//             throw err;
//         });
// };

export const login = (email, pw) => {
    let signInResponse; // declare variable outside of .then() callbacks
    return firebase.auth().signInWithEmailAndPassword(email, pw)
        .then((response) => {
            signInResponse = response; // save response to variable
            return _doesUserExist(response.user.uid);
        })
        .then((doesUserExist) => {
            if (!doesUserExist) {
                logout();
                throw new Error("Something's wrong. The user exists in firebase, but not in the application database. (User may be deactivated)");
            }
            // Save the user's ID and authentication token to the local storage
            localStorage.setItem("userProfile", signInResponse.user.uid);
            signInResponse.user.getIdToken().then((token) => {
                localStorage.setItem("authToken", token);
                getUserDetails(signInResponse.user.uid).then((user) => {
                    localStorage.setItem("user", JSON.stringify(user));
                });
            });

            return signInResponse;
        }).catch(err => {
            console.error(err);
            throw err;
        });
};


export const logout = () => {
    firebase.auth().signOut()
};


export const register = (userProfile, password) => {
    return firebase.auth().createUserWithEmailAndPassword(userProfile.email, password)
        .then((createResponse) => _saveUser({
            ...userProfile,
            firebaseUserId: createResponse.user.uid
        }));
};


export const onLoginStatusChange = (onLoginStatusChangeHandler) => {
    firebase.auth().onAuthStateChanged((user) => {
        onLoginStatusChangeHandler(!!user);
    });
};

export { firebase };