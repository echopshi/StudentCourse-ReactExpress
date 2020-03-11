import React, { useState, useEffect } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
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
    <div>
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
            {item.firstName}, {item.lastName}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default withRouter(List);
