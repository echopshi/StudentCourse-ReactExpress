import React, { useState, useEffect } from "react";
//import ReactDOM from 'react-dom';
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
//
import View from "./View";
//
function App() {
  //state variable for the screen, admin or user
  const [screen, setScreen] = useState("auth");
  const [studentId, setStudentId] = useState();
  const [studentName, setStudentName] = useState("auth");
  //store input field data, user name and password
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const apiUrl = "http://localhost:3000/api/signin";
  //send username and password to the server
  // for initial authentication
  const auth = async () => {
    try {
      //call api
      let loginData = { username, password };
      const res = await axios.post(apiUrl, loginData);
      //process the response
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        setStudentId(res.data.studentId);
        setStudentName(res.data.studentName);
        console.log(res.data.screen);
      }
    } catch (e) {
      //print the error
      console.log(e);
    }
  };

  //check if the user already logged-in
  const readCookie = async () => {
    try {
      console.log("--- in readCookie function ---");
      const res = await axios.get("/api/read_cookie");
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        setStudentId(res.data.studentId);
        setStudentName(res.data.studentName);
        console.log(res.data.screen);
      }
    } catch (e) {
      setScreen("auth");
      console.log(e);
    }
  };
  //runs the first time the view is rendered
  //to check if user is signed in
  useEffect(() => {
    readCookie();
  }, []); //only the first render
  //
  return (
    <div className="App">
      {screen === "auth" ? (
        <Container className="mt-5">
          <Form className="form-signin">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Student Number</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter student number"
                onChange={e => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button onClick={auth}>Login</Button>
          </Form>
        </Container>
      ) : (
        <View
          screen={screen}
          setScreen={setScreen}
          studentId={studentId}
          setStudentId={setStudentId}
          studentName={studentName}
          setStudentName={setStudentName}
        />
      )}
    </div>
  );
}

export default App;
