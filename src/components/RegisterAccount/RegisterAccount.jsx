import React, { useState } from "react";
import { useEffect } from "react";
import { Stack, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

const RegisterAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    apiTest();
  }, []);

  const apiTest = async (event) => {
    console.log("Event:", event);
    console.log(username);
    console.log(password);
    try {
      const response = await axios.post(
        "http://localhost:9000/api/authentication/register/",
        {
          customerID: 1234,
          pin: 2073,
        }
      );

      const { token } = response.data;
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
      console.log(axios.defaults.headers.common);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <div
            style={{
              textAlign: "center",
              backgroundColor: "#f0f0f0",
              padding: "10px",
              marginBottom: "20px",
            }}
          >
            <h2>Register a Customer Below</h2>
          </div>
          <form onSubmit={apiTest}>
            <Stack gap={2}>
              <div className="form1">Create CustomerID</div>
              <span>
                Please create a customerID between 4 and 10 characters. Only use
                digits.{" "}
              </span>
              <input
                className="form1"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="form2" style={{ marginTop: "25px" }}>
                Create Pin
              </div>
              <span>
                Please create a pin 4 and 10 characters. Only use digits.{" "}
              </span>
              <input
                className="form2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input type="submit" value="Register" />
            </Stack>
          </form>
        </Col>
      </Row>
    </Container>
  );
};
export default RegisterAccount;
