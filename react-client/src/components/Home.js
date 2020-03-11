import { withRouter } from "react-router-dom";

import React, { Component } from "react";

function Home(props) {
  return (
    <div>
      <h2> Express - React with Student Course Assignment</h2>
      <p>
        React front-end calls Express REST API to add, list, update, or delete
        student, create, enroll, drop and swicthing the section for course, etc.
      </p>
    </div>
  );
}

export default withRouter(Home);
