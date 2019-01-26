import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

//layouts
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import Landing from "./components/layouts/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import "./App.css";

//check for token
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  //decode
  const userDataDecoded = jwt_decode(localStorage.jwtToken);
  //set current user
  store.dispatch(setCurrentUser(userDataDecoded));

  //check for experied token
  const currentTime = Date.now() / 1000;
  if (userDataDecoded.exp < currentTime) {
    //logoutUser
    store.dispatch(logoutUser());
    //redirect to login page
    window.location.href = "/login";
  }
  //Todo Clear Profile
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Route path="/" component={Landing} exact />
            <div className="container">
              <Route path="/login" component={Login} exact />
              <Route path="/Register" component={Register} exact />
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default App;
