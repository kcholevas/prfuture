import React, { useState, useEffect } from "react";
import CoursesTable from "./CoursesTable";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Jumbotron, Alert, Spinner } from "react-bootstrap";
import "./index.css";
import axios from "axios";
import { API } from "./api";

function Dashboard() {
  const [stats, setStats] = useState([]);
  const [data, SetData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      setIsLoading(true);
      try {
        const response = await axios.get(`${API}/stats`);
        setStats(response.data);
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

  // Intro
  // ========================================
  const Intro = () => {
    return (
      <div>
        <Jumbotron>
          <h1 className="display-3">Welcome to Code.Hub Dashboard</h1>
          <p className="lead">Manage everything and have fun!</p>
        </Jumbotron>
      </div>
    );
  };

  // Stats
  // ========================================
    const StatsList = () => {
    return stats.map((stats) => {
      return (
        <Card
          key={stats.id}
          style={{ width: "12rem", display: "inline-block" }}
        >
          <Card.Body>
            <Card.Title>{stats.title.toUpperCase()}</Card.Title>
            <Card.Text>{stats.amount}</Card.Text>
          </Card.Body>
        </Card>
      );
    });
  };

  return (
    <div>
      <Intro />
      <StatsList />
      <CoursesTable />
    </div>
  );
}

export default Dashboard;
