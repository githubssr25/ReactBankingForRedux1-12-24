import React from "react";
import { Form, Button, Col, Row } from "react-bootstrap";

const RegisterCustomer = () => {
  return (
    <Form className="register-customer-form">
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>CustomerID</Form.Label>
        <Form.Control size="sm" type="text" placeholder="username12" />
        <Form.Text id="passwordHelpBlock" muted>
          Your customerID must be 4-10 characters long, contain letters and
          numbers, and must not contain spaces, special characters, or emoji.
        </Form.Text>
      </Form.Group>
      <FormTextExample />
    </Form>
  );
};

export function FormTextExample() {
  return (
    <>
      <Form.Label htmlFor="inputPassword5">Pin</Form.Label>
      <Form.Control
        type="password"
        id="inputPassword5"
        aria-describedby="passwordHelpBlock"
      />
      <Form.Text id="passwordHelpBlock" muted>
        Your pin must be 4-10 characters long, contain letters and numbers, and
        must not contain spaces, special characters, or emoji.
      </Form.Text>
    </>
  );
}

const CombinedForm = () => {
  return (
    <div style={{ textAlign: "left", marginTop: "20px", marginLeft: "20px" }}>
      <div
        style={{
          textAlign: "center",
          backgroundColor: "#f0f0f0",
          padding: "10px",
        }}
      >
        <h2>Register a Customer Below</h2>
      </div>
      <Row className="justify-content-center">
        <Col xs={12} sm={6}>
          <RegisterCustomer />
          <Button variant="primary">Register Customer</Button>
        </Col>
      </Row>
    </div>
  );
};

export default CombinedForm;
