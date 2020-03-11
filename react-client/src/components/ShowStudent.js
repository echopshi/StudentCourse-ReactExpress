import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
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
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      studentNumber: student.studentNumber,
      password: student.password,
      program: student.program,
      semester: student.semester
    };

    axios
      .delete(apiUrl, student)
      .then(result => {
        setShowLoading(false);
        props.history.push("/list");
      })
      .catch(error => setShowLoading(false));
  };

  return (
    <div>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      <Jumbotron>
        <h1>
          Name: {data.firstName}, {data.lastName}
        </h1>
        <p>Email: {data.email}</p>
        <p>Student Number: {data.studentNumber}</p>

        <p>
          <Button
            type="button"
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
        </p>
      </Jumbotron>
    </div>
  );
}

export default withRouter(ShowStudent);
