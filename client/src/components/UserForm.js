import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import "../App.css";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

function UserForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    id: "",
    reason: "",
  });

  const clearNotifications = () => {
    axios
      .delete("http://localhost:3001/api/requests/not-pending")
      .then((response) => {
        console.log(response.data);
        setRequest([]);
      })
      .catch((error) => console.error(error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/api/requests", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        id: formData.id,
        reason: formData.reason,
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const [requests, setRequest] = useState([]);

  useEffect(() => {
    const userId = "noursibai";

    axios
      .get(`http://localhost:3001/api/requests/not-pending`)
      .then((response) => setRequest(response.data))
      .catch((error) => console.error(error));
  }, []);

  const NotificationComponent = ({ request }) => {
    const isDenied = request?.status === "denied";
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: isDenied ? "#FFD2D2" : "#D4EDDA",
          padding: "10px",
          borderRadius: "5px",
          margin: "10px 0",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        {isDenied ? (
          <FaTimesCircle color="red" size="20px" />
        ) : (
          <FaCheckCircle color="green" size="20px" />
        )}
        <div style={{ marginLeft: "10px" }}>
          <div
            style={{ fontWeight: "bold", color: isDenied ? "red" : "green" }}
          >
            {isDenied ? "Leave Request Denied" : "Leave Request Approved"}
          </div>
          <div>Reason: {request.reason}</div>
        </div>
      </div>
    );
  };
  return (
    <Container
      style={{
        maxWidth: "1400px",
        margin: "20px auto",
        padding: "20px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        backgroundColor: "#fff",
      }}
    >
      <div>
        {requests?.map((request) => {
          return <NotificationComponent request={request} />;
        })}
      </div>
      <Form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <h2 style={{ marginBottom: "20px" }}>Leave Request Form</h2>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              style={{ padding: "10px", borderRadius: "5px" }}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              style={{ padding: "10px", borderRadius: "5px" }}
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formID">
          <Form.Label>ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter ID"
            name="id"
            value={formData.id}
            onChange={handleChange}
            style={{ padding: "10px", borderRadius: "5px" }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formReason">
          <Form.Label>Reason</Form.Label>
          <Form.Select
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="custom-dropdown-toggle"
          >
            <option value="">Choose...</option>
            <option value="sick">Sick</option>
            <option value="travel">Travel</option>
            <option value="other">Other</option>
          </Form.Select>
        </Form.Group>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <Button
            variant="primary"
            type="submit"
            style={{ padding: "10px 20px", borderRadius: "5px" }}
          >
            Submit
          </Button>

          <Button
            variant="warning"
            onClick={clearNotifications}
            style={{ padding: "10px 20px", borderRadius: "5px" }}
          >
            Clear Notifications
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default UserForm;
