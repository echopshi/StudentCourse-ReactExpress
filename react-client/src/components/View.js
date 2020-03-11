import React, { useState } from "react";
//
import axios from "axios";
//
function View(props) {
  const { screen, setScreen } = props;
  const [data, setData] = useState();

  const deleteCookie = async () => {
    try {
      await axios.get("/signout");
      setScreen("auth");
    } catch (e) {
      console.log(e);
    }
  };
  // called when user clicks on Get Data button
  // end-point demonstrates another example for the use
  // of cookie specific response from the server.
  const getData = async () => {
    try {
      const res = await axios.get("/api/welcome");
      console.log(res.data);
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  //
  return (
    <div>
      <p>{screen}</p>
      <p>{data}</p>
      <button onClick={getData}>Get Data</button>
      <button onClick={deleteCookie}>Log out</button>
    </div>
  );
}

//
export default View;
