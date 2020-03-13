import { withRouter } from "react-router-dom";
import Container from "react-bootstrap/Container";
import React from "react";

function Home(props) {
  return (
    <Container className="mt-5">
      <div>
        <h2> Express - React with Student Course Assignment</h2>
        <p>
          React front-end calls Express REST API to <br />
          add, update, or delete student, <br />
          create, enroll, drop and update (switching the section) course,
          <br />
          display a list of students or courses <br />
          list all the courses taken by a student, <br />
          list all students that are taking a given course.
        </p>
      </div>
    </Container>
  );
}

export default withRouter(Home);
