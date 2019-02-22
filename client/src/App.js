import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import NotFound from "./components/not-found/NotFound";

import "./App.css";
import { clearCurrentProfile } from "./actions/profileActions";

//wrapper for all private routes
import PrivateRoute from "./components/common/PrivateRoute";

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
    // Clear Profile
    store.dispatch(clearCurrentProfile);
    //logoutUser
    store.dispatch(logoutUser());
    //redirect to login page
    window.location.href = "/login";
  }
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
              <Route path="/profiles" component={Profiles} exact />
              <Route path="/profile/:handle" component={Profile} />
              <Switch>
                <PrivateRoute path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute path="/edit-profile" component={EditProfile} />
              </Switch>
              <Switch>
                <PrivateRoute
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute path="/add-education" component={AddEducation} />
              </Switch>
              <Switch>
                <PrivateRoute path="/feeds" component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute path="/post/:id" component={Post} />
              </Switch>
              <Route path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default App;
