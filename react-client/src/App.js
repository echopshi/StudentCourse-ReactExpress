import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
// css design from bootstrap
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./App.css";
// get the related components from components folder
import ShowStudent from "./components/ShowStudent";
import EditStudent from "./components/EditStudent";

import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import StudentList from "./components/StudentList";
//
function App() {
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/studentList">List of students</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signUp">Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div>
        <Route render={() => <Home />} path="/home" />
        <Route render={() => <Login />} path="/login" />
        <Route render={() => <SignUp />} path="/signUp" />
        <Route render={() => <StudentList />} path="/studentList" />
        <Route render={() => <ShowStudent />} path="/show/:id" />
        <Route render={() => <EditStudent />} path="/edit/:id" />
      </div>
    </Router>
  );
}
//<Route render ={()=> < App />} path="/" />
export default App;
