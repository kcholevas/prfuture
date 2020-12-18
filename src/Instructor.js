import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";


const Instructor = (props) => {
  return (
    <div>
      <h3>{`${props.children.name.first} ${props.children.name.last} (${props.children.dob})`}</h3>

      <React.Fragment>{"Email: "}</React.Fragment>
      <a href={props.children.email}>{props.children.email}</a>
      <React.Fragment>{" | "}</React.Fragment>
      <a href={props.children.linkedin}>{"Linkedin"}</a>

      <p>{props.children.bio}</p>
    </div>
  );
};

export default Instructor;
