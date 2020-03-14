import React, { useState, useEffect } from "react";
import axios from "axios";
import { ListGroup, Container, Spinner, Table } from "react-bootstrap";
import { withRouter } from "react-router-dom";

function List(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl =
    "http://localhost:3000/api/students/" +
    props.match.params.studentNumber +
    "/courses";

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const showDetail = studentNumber => {
    props.history.push({
      pathname: "/show/" + studentNumber
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
              showDetail(item.studentNumber);
            }}
          >
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Section</th>
                  <th>Semester</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{item.courseCode}</td>
                  <td>{item.courseName}</td>
                  <td>{item.section}</td>
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
