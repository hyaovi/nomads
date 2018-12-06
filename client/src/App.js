import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import Landing from "./components/layouts/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import "./App.css";

class App extends Component {
  render() {
    return (
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
    );
  }
}
export default App;
