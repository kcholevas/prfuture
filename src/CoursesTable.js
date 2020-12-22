import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import "./index.css";
import { API } from "./api";
import { FcCheckmark, FcCancel } from "react-icons/fc";

// Table of courses
// ========================================

function CoursesTable() {
  const [courses, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, SetData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      setIsLoading(true);
      try {
        const response = await axios.get(`${API}/courses`);
        setItems(response.data);
        setIsLoading(false);
        SetData(true);
      } catch {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const checkBookable = (props) => {
    if (props) {
      return <FcCheckmark />;
    } else {
      return <FcCancel />;
    }
  };

  if (error) {
    return <Alert variant="warning">{error.message}</Alert>;
  }

  if (isLoading) {
    return <Spinner animation="border" size="lg" />;
  }

  const DateFormatter = (date) => {
    return new Date(date).toLocaleDateString("en-US");
  };

  return data ? (
    <div>
      Last 5 courses
      <Table>
        <thead>
          <tr>
            <th
              style={{
                width: "20%",
                justifyContent: "center",
                textAlign: "left",
              }}
            >
              Title
            </th>
            <th
              style={{
                width: "20%",
                justifyContent: "center",
                textAlign: "left",
              }}
            >
              Bookable
            </th>
            <th
              style={{
                width: "20%",
                justifyContent: "center",
                textAlign: "left",
              }}
            >
              Price
            </th>
            <th
              style={{
                width: "20%",
                justifyContent: "center",
                textAlign: "left",
              }}
            >
              Date
            </th>
            <th
              style={{
                width: "20%",
                justifyContent: "center",
                textAlign: "left",
              }}
            >
              Actions
            </th>
          </tr>
        </thead>
      </Table>
      {courses.reverse().slice(courses, 5).map(({ id, title, open, price, dates }) => {
        return (
          <div key={id}>
            <Table responsive hover>
              <tbody>
                <tr>
                  <th
                    style={{
                      width: "20%",
                      justifyContent: "center",
                      textAlign: "left",
                    }}
                  >
                    {title}
                  </th>
                  <th
                    style={{
                      width: "20%",
                      justifyContent: "center",
                      textAlign: "left",
                    }}
                  >
                    {checkBookable(open)}
                  </th>
                  <th
                    style={{
                      width: "20%",
                      justifyContent: "center",
                      textAlign: "left",
                    }}
                  >
                    {price.normal}
                  </th>
                  <th
                    style={{
                      width: "20%",
                      justifyContent: "center",
                      textAlign: "left",
                    }}
                  >{`${DateFormatter(dates.start_date)} - ${DateFormatter(
                    dates.end_date
                  )}`}</th>
                  <th>
                    <Button
                      color="info"
                      onClick={(event) =>
                        (window.location.href = `/courses/${id}`)
                      }
                    >
                      View Details
                    </Button>
                  </th>
                </tr>
              </tbody>
            </Table>
          </div>
        );
      })}
      <Button
        className="float-right"
        color="primary"
        onClick={(event) => (window.location.href = "/courses")}
      >
        View All
      </Button>
    </div>
  ) : (
    <Spinner animation="border" size="lg" />
  );
}

export default CoursesTable;
