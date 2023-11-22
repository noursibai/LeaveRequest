import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

function AdminResponse() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/requests/pending")
      .then((data) => setRequests(data.data));
  }, []);

  const RequestComponent = ({ firstName, lastName, id, reason }) => {
    return (
      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ fontSize: "24px" }}>Leave Request</h2>{" "}
        {/* Larger heading */}
        <p style={{ fontWeight: "bold", fontSize: "18px", color: "#333" }}>Reason: {reason}</p>
        <p style={{ fontSize: "16px", color: "#555" }}>
          Name: {firstName} {lastName}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <Button
            variant="success"
            onClick={() => handleRequest({ id, status: "approved" })}
          >
            <FaCheckCircle /> Accept
          </Button>
          <Button
            variant="danger"
            onClick={() => handleRequest({ id, status: "denied" })}
          >
            <FaTimesCircle /> Reject
          </Button>
        </div>
      </div>
    );
  };

  const handleRequest = ({ id, status }) => {
    axios
      .put(`http://localhost:3001/api/requests`, { status, id })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto" }}>
      {" "}
      {/* Increased max width */}
      {requests.map((request, index) => {
        return (
          <RequestComponent
            key={index}
            firstName={request.firstName}
            lastName={request.lastName}
            id={request._id}
            reason={request.reason}
          />
        );
      })}
    </div>
  );
}

export default AdminResponse;
