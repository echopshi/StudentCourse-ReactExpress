import React, { useState } from "react";
import CreateCourse from "./CreateCourse";
//
import axios from "axios";
//
function View(props) {
  const {
    screen,
    setScreen,
    studentId,
    setStudentId,
    studentName,
    setStudentName
  } = props;
  const [course, setCourse] = useState("");

  const deleteCookie = async () => {
    try {
      await axios.get("/api/signout");
      setScreen("auth");
    } catch (e) {
      console.log(e);
    }
  };
  //
  const createCourse = () => {
    setCourse("y");
  };
  //
  return (
    <div className="App">
      {course !== "y" ? (
        <div className="mt-5">
          <h2 className="mb-5">{screen}</h2>
          <button onClick={createCourse}>Create Course</button>
          <button onClick={deleteCookie}>Log out</button>
        </div>
      ) : (
        <CreateCourse
          screen={screen}
          setScreen={setScreen}
          studentId={studentId}
          setStudentId={setStudentId}
          studentName={studentName}
          setStudentName={setStudentName}
        />
      )}
    </div>
  );
}

//
export default View;
