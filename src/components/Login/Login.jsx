import React from "react";
import { useState } from "react";
// import Stack from "react-bootstrap/Stack";
import Accordion from "react-bootstrap/Accordion";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [saveUsername, setSaveUsername] = useState(false);
  const navigate = useNavigate();

  // function handleSubmit() {
  //   const onSuccessfulLogin = () => navigate("/register-account");
  //   loginFetch(username, password, onSuccessfulLogin);
  // }

  const apiTest = async (event) => {
    console.log("Event:", event);
    console.log(username);
    console.log(password);
    try {
      const response = await axios.post("http://localhost:9000/api/login", {
        customerID: 1234,
        pin: 2073,
      });

      const { token } = response.data;
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
      console.log(axios.defaults.headers.common);
      // data will be actual response object the JSON data that back end responded with
      // if oyu want to cath an an error you sourrund w try catch
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  function BasicExample() {
    return (
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            You may access multiple bank accounts through your log in
            information
          </Accordion.Header>
          <Accordion.Body>
            {" "}
            By logging in if you have multiple bank accounts all of them will be
            available to you at once{" "}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Log In To Access Various Features</Accordion.Header>
          <Accordion.Body>
            Successfully log on and have the ability to check your balance,
            deposit money into your account, withdraw money, send money to your
            account or view previous transaction history
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  }
  // mpm axios to try to save token everytime we run app 12-29

  // if user starts typing into box you call onchagne, if user clicks log in the nti will call handle submit
  // on change is just something changing within the box. e.target.value is value of current text box
  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          marginLeft: "20px",
          marginTop: "30px",
          marginBottom: "35px",
        }}
      >
        Log In To Your Account
      </h1>
      <div
        style={{
          textAlign: "left",
          maxWidth: "600px",
          margin: "0 auto",
          marginBottom: "40px",
        }}
      >
        <BasicExample style={{ marginLeft: "0" }} />
      </div>
      <Container>
        <Row className="show-grid">
          <Col md={6}>
            <Form onSubmit={apiTest}>
              <Form.Group controlId="formUsername">
                <Form.Label>CustomerID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your customerID"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Pin</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your pin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formSaveUsername" className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Save CustomerID"
                  checked={saveUsername}
                  onChange={(e) => setSaveUsername(e.target.checked)}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Sign On
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Login;
