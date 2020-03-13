import axios from "axios";
import {
  Spinner,
  Jumbotron,
  Form,
  Button,
  Col,
  Container
} from "react-bootstrap";
import { withRouter } from "react-router-dom";
import React, { useState } from "react";

//
function CreateCourse(props) {
  //
  const studentId = props.studentId;
  const studenName = props.studentName;
  console.log("props.studentId", props.studentId);
  const [course, setCourse] = useState({
    _id: "",
    courseCode: "",
    courseName: "",
    section: "",
    semester: ""
  });
  const [showLoading, setShowLoading] = useState(false);
  //
  const apiUrl = "http://localhost:3000/api/courses/create";
  //
  const saveCourse = e => {
    setShowLoading(true);
    e.preventDefault();
    const data = {
      courseCode: course.courseCode,
      courseName: course.courseName,
      section: course.section,
      semester: course.semester,
      student: studentId
    };
    //
    axios
      .post(apiUrl, data)
      .then(result => {
        setShowLoading(false);
        console.log("results from save course:", result.data);
        props.history.push("/course/show/" + result.data._id);
      })
      .catch(error => setShowLoading(false));
  };
  //
  const onChange = e => {
    e.persist();
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <h2> Create Course by {studenName} </h2>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      <Jumbotron>
        <Form onSubmit={saveCourse}>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label> Course Code</Form.Label>
              <Form.Control
                type="text"
                name="courseCode"
                id="courseCode"
                placeholder="Enter Course Code"
                value={course.courseCode}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                type="text"
                name="courseName"
                id="courseName"
                placeholder="Enter Course Name"
                value={course.courseName}
                onChange={onChange}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label> Section</Form.Label>
              <Form.Control
                type="text"
                name="section"
                id="section"
                placeholder="Enter Section"
                value={course.section}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Semester</Form.Label>
              <Form.Control
                type="text"
                name="semester"
                id="semester"
                placeholder="Enter Semester"
                value={course.semester}
                onChange={onChange}
              />
            </Form.Group>
          </Form.Row>
          <Button variant="primary" type="submit">
            Save Course
          </Button>
        </Form>
      </Jumbotron>
    </Container>
  );
}

export default withRouter(CreateCourse);
