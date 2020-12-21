import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert, Spinner } from "react-bootstrap";
import "./index.css";
import axios from "axios";
import { API } from "./api";

const Instructor = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, SetData] = useState(false);
  const [instructors, SetInstructor] = useState([]);

  const fetchInstructorsPostfix = props.children.reduce(function (
    accumulator,
    currentValue
  ) {
    if (currentValue === props.children[props.children.length - 1])
      return `${accumulator}id=${currentValue}`;
    else return `${accumulator}id=${currentValue}&`;
  },
  "");

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${API}/instructors/?${fetchInstructorsPostfix}`
        );
        SetInstructor(response.data);
        setIsLoading(false);
        SetData(true);
      } catch {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <Alert variant="warning">{error.message}</Alert>;
  }

  if (isLoading) {
    return <Spinner animation="border" size="lg" />;
  }

  return data ? (
    <React.Fragment>
      {instructors.map(
        ({ id, gender, name, email, dob, bio, hobbies, linkedin }) => (
          <React.Fragment key={id}>
            <h3>{`${name.first} ${name.last} (${dob})`}</h3>

            <React.Fragment>{"Email: "}</React.Fragment>
            <a href={email}>{email}</a>
            <React.Fragment>{" | "}</React.Fragment>
            <a href={linkedin}>{"Linkedin"}</a>

            <p>{bio}</p>
          </React.Fragment>
        )
      )}
    </React.Fragment>
  ) : (
    <Spinner animation="border" size="lg" />
  );
};

export default Instructor;
