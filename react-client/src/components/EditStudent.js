import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Spinner,
  Jumbotron,
  Form,
  Button,
  Container,
  Col
} from "react-bootstrap";
import { withRouter } from "react-router-dom";

function EditStudent(props) {
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
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl =
    "http://localhost:3000/api/students/" + props.match.params.studentNumber;
  //runs only once after the first render
  useEffect(() => {
    setShowLoading(false);
    //call api
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setStudent(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const updateStudent = e => {
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
      .put(apiUrl, data)
      .then(result => {
        setShowLoading(false);
        props.history.push("/show/" + result.data.studentNumber);
      })
      .catch(error => setShowLoading(false));
  };
  //runs when user enters a field
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
        <h2 className="text-center mb-3">Update Student Information</h2>
        <Form onSubmit={updateStudent}>
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
          <Form.Row>
            <Form.Group as={Col}>
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
            <Form.Group as={Col}>
              <Form.Label>Student Number</Form.Label>
              <Form.Control
                disabled={true}
                type="text"
                name="studentNumber"
                id="studentNumber"
                placeholder="Enter student number"
                value={student.studentNumber}
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
            Update
          </Button>
        </Form>
      </Jumbotron>
    </Container>
  );
}

export default withRouter(EditStudent);
