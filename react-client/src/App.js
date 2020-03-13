import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// css design from bootstrap
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./App.css";
// get the related components from components folder

// student related components
import ShowStudent from "./components/ShowStudent";
import EditStudent from "./components/EditStudent";

// student related components
import ShowCourse from "./components/ShowCourse";
import EditCourse from "./components/EditCourse";
import CreateCourse from "./components/CreateCourse";

// navigation components
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import StudentList from "./components/StudentList";
import CourseList from "./components/CourseList";
//
function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/home">React Express - Student Course</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/studentList">List of students</Nav.Link>
            <Nav.Link href="/courseList">List of courses</Nav.Link>
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
        <Route render={() => <CourseList />} path="/courseList" />
        <Route render={() => <ShowStudent />} path="/show/:studentNumber" />
        <Route render={() => <EditStudent />} path="/edit/:studentNumber" />
        <Route render={() => <ShowCourse />} path="/course/show/:courseId" />
        <Route render={() => <EditCourse />} path="/course/edit/:courseId" />
        <Route render={() => <CreateCourse />} path="/course/create" />
      </div>
      <p className="text-center mt-5">Hang Li, Frank Zhou, COMP308, Lab 3</p>
    </Router>
  );
}
//<Route render ={()=> < App />} path="/" />
export default App;
