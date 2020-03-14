import React, { useState, useEffect } from "react";
import axios from "axios";
import { ListGroup, Spinner, Container, Table } from "react-bootstrap";
import { withRouter } from "react-router-dom";

function List(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl =
    "http://localhost:3000/api/courses/" +
    props.match.params.courseId +
    "/students";

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const showDetail = id => {
    props.history.push({
      pathname: "course/show/" + id
    });
  };

  return (
    <Container className="mt-5">
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}

      <ListGroup>
        {data.map((item, idx) => (
          <ListGroup.Item
            key={idx}
            action
            onClick={() => {
              showDetail(item._id);
            }}
          >
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Student First Name</th>
                  <th>Student Last Name</th>
                  <th>Student Number</th>
                  <th>Program</th>
                  <th>Semester</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.studentNumber}</td>
                  <td>{item.program}</td>
                  <td>{item.semester}</td>
                </tr>
              </tbody>
            </Table>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default withRouter(List);
