import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Spinner,
  Jumbotron,
  Form,
  Button,
  Col
} from "react-bootstrap";
import { withRouter } from "react-router-dom";

function CreateStudent(props) {
  const [student, setStudent] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    studentNumber: "",
    password: "",
    program: "",
    semester: ""
  });
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3000/api/signup";

  const saveStudent = e => {
    setShowLoading(true);
    e.preventDefault();
    const data = {
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      studentNumber: student.studentNumber,
      password: student.password,
      program: student.program,
      semester: student.semester
    };
    axios
      .post(apiUrl, data)
      .then(result => {
        setShowLoading(false);
        props.history.push("/show/" + result.data.studentNumber);
      })
      .catch(error => setShowLoading(false));
  };

  const onChange = e => {
    e.persist();
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      <Jumbotron>
        <h2 className="text-center mb-3">Sign up as student</h2>
        <Form onSubmit={saveStudent}>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label> First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                value={student.firstName}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label> Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter last name"
                value={student.lastName}
                onChange={onChange}
              />
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              id="email"
              rows="3"
              placeholder="Enter email"
              value={student.email}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Student Number</Form.Label>
              <Form.Control
                type="text"
                name="studentNumber"
                id="studentNumber"
                placeholder="Enter student number"
                value={student.studentNumber}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                name="password"
                id="password"
                placeholder="Enter password"
                value={student.password}
                onChange={onChange}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Program</Form.Label>
              <Form.Control
                type="text"
                name="program"
                id="program"
                placeholder="Enter program"
                value={student.program}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Semester</Form.Label>
              <Form.Control
                type="text"
                name="semester"
                id="semester"
                placeholder="Enter semester"
                value={student.semester}
                onChange={onChange}
              />
            </Form.Group>
          </Form.Row>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Jumbotron>
    </Container>
  );
}

export default withRouter(CreateStudent);
