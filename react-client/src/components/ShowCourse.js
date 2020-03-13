import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, Button, Container, Card } from "react-bootstrap";
import { withRouter } from "react-router-dom";

function ShowCourse(props) {
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl =
    "http://localhost:3000/api/courses/" + props.match.params.courseId;

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const editCourse = id => {
    props.history.push({
      pathname: "/course/edit/" + id
    });
  };

  const deleteCourse = id => {
    setShowLoading(true);
    const course = {
      courseCode: data.courseCode,
      courseName: data.courseName,
      section: data.section,
      semester: data.semester
    };

    axios
      .delete(apiUrl, course)
      .then(result => {
        setShowLoading(false);
        props.history.push("/courseList");
      })
      .catch(error => setShowLoading(false));
  };

  return (
    <Container className="mt-5">
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      <Card style={{ width: "18rem" }}>
        <Card.Header as="h5">Course Code: {data.courseCode}</Card.Header>
        <Card.Body>
          <Card.Title>Course Name: {data.courseName}</Card.Title>
          <Card.Text>
            Section: {data.section}
            <br />
            Semester: {data.semester}
          </Card.Text>
          <Button
            variant="primary"
            onClick={() => {
              editCourse(data._id);
            }}
          >
            Edit
          </Button>
          &nbsp;
          <Button
            type="button"
            variant="danger"
            onClick={() => {
              deleteCourse(data._id);
            }}
          >
            Delete
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default withRouter(ShowCourse);
