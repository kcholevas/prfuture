import React, { useState, useEffect } from "react";
import { Form, Jumbotron, Alert, Spinner, Button } from "react-bootstrap";
import axios from "axios";

import { API } from "./api";

const AddNewCourse = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState([]);
  const [dbInstructors, setDBInstructors] = useState([]);

  const [title, setTitle] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [duration, setDuration] = useState("");
  const [open, setOpen] = useState(false);
  const [instructors, setInstructors] = useState([]);
  const [description, setDescription] = useState("");
  const [dates, setDate] = useState({
    start_date: "",
    end_date: "",
  });
  const [price, setPrice] = useState({
    normal: 0,
    early_bird: 0,
  });

  const { start_date, end_date } = dates;
  const { normal, early_bird } = price;

  useEffect(() => {
    const fetchData = () => {
      setError(false);
      setIsLoading(true);

      axios
        .get(`${API}/courses`)
        .then((response) => {
          setCourses(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = () => {
      setError(false);
      setIsLoading(true);
      axios
        .get(`${API}/instructors`)
        .then((response) => {
          setDBInstructors(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    };
    fetchData();
  }, []);

  if (error) {
    return <Alert variant="warning">{error.message}</Alert>;
  }

  if (isLoading) {
    return <Spinner animation="border" size="lg" />;
  }

  const handleChange = (event) => {
    const value = event.target.value;
    const checked = event.target.checked;

    setInstructors((prevState) => {
      let newInstructors = [...prevState];
      if (checked) {
        newInstructors = newInstructors.concat(value);
      } else {
        const index = newInstructors.indexOf(value);
        if (index > -1) {
          newInstructors.splice(index, 1);
        }
      }
      return newInstructors;
    });
  };

  const onInputChange = (event, setState) => {
    const { name, value, id } = event.target;
    if (name === "start_date" || name === "end_date") {
      setState((dates) => {
        return {
          ...dates,
          [name]: value,
        };
      });
    } else if (name === "normal" || name === "early_bird") {
      setState((price) => {
        return {
          ...price,
          [name]: value,
        };
      });
    } else if (id === `bookable`) {
      const checked = event.target.checked;

      if (checked) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    } else {
      setState(event.target.value);
    }
  };

  const AddCourse = (data) => {

    const newData = {
      ...data,
      id: Math.max(...courses.map(({ id }) => id)) + 1,
    };

    axios.post(`${API}/courses`, newData).then((res) => {
      window.location.href = `/courses`;
    });
  };

  return (
    <div>
      
        <Jumbotron>
          <Form>
            <h2>Add Course</h2>
            {[
              {
                field: "title",
                state: title,
                type: "text",
                placeholder: "Title",
                label: "Title",
                setState: setTitle,
              },
              {
                field: "duration",
                state: duration,
                type: "text",
                placeholder: "Duration",
                label: "Duration",
                setState: setDuration,
              },
              {
                field: "imagePath",
                state: imagePath,
                type: "text",
                placeholder: "Image path",
                label: "Image path",
                setState: setImagePath,
              },
            ].map(({ field, state, type, placeholder, label, setState }) => (
              <Form.Group key={field} controlId={field}>
                <Form.Label>{label}</Form.Label>
                <Form.Control
                  placeholder={placeholder}
                  type={type}
                  value={state}
                  name={field}
                  onChange={(e) => onInputChange(e, setState)}
                />
              </Form.Group>
            ))}
            <Form.Check
              type={`checkbox`}
              id={`bookable`}
              label={`Bookable`}
              value={open}
              onChange={(e) => onInputChange(e, setOpen)}
            />
            <hr className="my-2" />
            <h2>Instructors</h2>
            {dbInstructors.map(({ id, name }) => (
              <Form.Check
                type={`checkbox`}
                value={id}
                name={id}
                key = {id}
                label={`${name.first}  ${name.last}`}
                checked={instructors.includes({ id })}
                onChange={handleChange}
              />
            ))}

            <hr className="my-2" />
            <Form.Group controlId="formCourseDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => onInputChange(e, setDescription)}
              />
            </Form.Group>
            <hr className="my-2" />
            <h2>Dates</h2>
            {[
              {
                field: "start_date",
                state: start_date,
                type: "date",
                placeholder: "Start date",
                label: "Start date",
                setState: setDate,
              },
              {
                field: "end_date",
                state: end_date,
                type: "date",
                placeholder: "End date",
                label: "End date",
                setState: setDate,
              },
            ].map(({ field, state, type, placeholder, label, setState }) => (
              <Form.Group key={field} controlId={field}>
                <Form.Label>{label}</Form.Label>
                <Form.Control
                  placeholder={placeholder}
                  type={type}
                  value={state}
                  name={field}
                  onChange={(e) => onInputChange(e, setState)}
                />
              </Form.Group>
            ))}
            <hr className="my-2" />
            <h2>Price</h2>
            {[
              {
                field: "early_bird",
                state: early_bird,
                type: "number",
                placeholder: "Early bird",
                label: "Early bird",
                setState: setPrice,
              },
              {
                field: "normal",
                state: normal,
                type: "number",
                placeholder: "Normal Price",
                label: "Normal Price",
                setState: setPrice,
              },
            ].map(({ field, state, type, placeholder, label, setState }) => (
              <Form.Group key={field} controlId={field}>
                <Form.Label>{label}</Form.Label>
                <Form.Control
                  placeholder={placeholder}
                  type={type}
                  value={state}
                  name={field}
                  onChange={(e) => onInputChange(e, setState)}
                />
              </Form.Group>
            ))}
            <hr className="my-2" />
            <Button
              style={{ float: "right" }}
              color="primary"
              onClick={() =>
                AddCourse({
                  title,
                  duration,
                  imagePath,
                  open,
                  price,
                  dates,
                  instructors,
                  description,
                })
              }
            >
              Add Course
            </Button>
          </Form>
        </Jumbotron>
      
    </div>
  );
};
export default AddNewCourse;
