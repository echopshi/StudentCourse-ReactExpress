import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, Button, Container, Card } from "react-bootstrap";
import { withRouter } from "react-router-dom";

function ShowStudent(props) {
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl =
    "http://localhost:3000/api/students/" + props.match.params.studentNumber;

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const editStudent = studentNumber => {
    props.history.push({
      pathname: "/edit/" + studentNumber
    });
  };

  const deleteStudent = studentNumber => {
    setShowLoading(true);
    const student = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      studentNumber: data.studentNumber,
      password: data.password,
      program: data.program,
      semester: data.semester
    };

    axios
      .delete(apiUrl, student)
      .then(result => {
        setShowLoading(false);
        props.history.push("/studentList");
      })
      .catch(error => setShowLoading(false));
  };

  const findEnrolledCourses = studentNumber => {
    props.history.push({
      pathname: "/student/" + studentNumber + "/courses"
    });
  };

  return (
    <Container className="mt-5">
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      <Card>
        <Card.Header as="h5">
          Name: {data.firstName}, {data.lastName}
        </Card.Header>
        <Card.Body>
          <Card.Title>Student Number: {data.studentNumber}</Card.Title>
          <Card.Text>
            Email: {data.email}
            <br />
            Program: {data.program}
            <br />
            Semester: {data.semester}
          </Card.Text>
          <Button
            variant="primary"
            onClick={() => {
              editStudent(data.studentNumber);
            }}
          >
            Edit
          </Button>
          &nbsp;
          <Button
            type="button"
            variant="danger"
            onClick={() => {
              deleteStudent(data.studentNumber);
            }}
          >
            Delete
          </Button>
          &nbsp;
          <Button
            type="button"
            variant="primary"
            onClick={() => {
              findEnrolledCourses(data.studentNumber);
            }}
          >
            Enrolled Courses
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default withRouter(ShowStudent);
