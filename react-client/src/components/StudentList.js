import React, { useState, useEffect } from "react";
import axios from "axios";
import { ListGroup, Container, Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";

function List(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/students";

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
            Student Name: {item.firstName}, {item.lastName} <br />
            Student Number: {item.studentNumber}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default withRouter(List);
