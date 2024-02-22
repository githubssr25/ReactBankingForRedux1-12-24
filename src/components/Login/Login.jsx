// import React from "react";
// import { useState } from "react";
// // import Stack from "react-bootstrap/Stack";
// import Accordion from "react-bootstrap/Accordion";
// import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// // import login from "../../services/api-service";
// import { login } from "../../services/api-service";
// import { useDispatch, useSelector } from "react-redux";

// const SuccessfulModal = ({ show }) => {
//   const [showing, setShowing] = useState(show);

//   useEffect(() => {
//     setTimeout(() => {
//       setShowing(false);
//     }, 3000);
//   }, []);

//   return (
//     <Modal show={showing} onHide={() => setShowing(false)}>
//       <Modal.Header closeButton>
//         <Modal.Title>Test Modal Title</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>This will vanish soon!</Modal.Body>
//       <Modal.Footer>
//         <Button variant="success" onClick={() => setShowing(false)}>
//           Close Modal
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// const Login = ({ handleSuccessfulLogin }) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [saveUsername, setSaveUsername] = useState(false);
//   const navigate = useNavigate();
//   const [showModal, setShowModal] = useState(false);
//   const dispatch = useDispatch();

//   const currentUserState = useSelector((state) => state.user.user);
//   // use selector is how component is tied to redux store. Allows components to subscribe to changes in redux state and be notified when those parts of state(user for login comp) are updated

//   const { currentUser, isLoggedIn } = currentUserState;
//   // when we want to create another store how is that store going to know about other stores
//   // so inside of reducers we create a file called root reducer we have log in and dispatch is in app.js
//   useEffect(() => {
//     const onSuccessfulLogin = () => {
//       handleSuccessfulLogin();
//       setShowModal(true);
//     };

//     // Run the login logic only when username or password changes
//     // if truthy you do this but if falsy like if "" you dont
//     if (username && password) {
//       login(username, password, onSuccessfulLogin);
//     }
//   }, [username, password]);

//   return (
//     <div>
//       <h1
//         style={{
//           textAlign: "center",
//           marginLeft: "20px",
//           marginTop: "30px",
//           marginBottom: "35px",
//         }}
//       >
//         Log In To Your Account
//       </h1>
//       <div
//         style={{
//           textAlign: "left",
//           maxWidth: "600px",
//           margin: "0 auto",
//           marginBottom: "40px",
//         }}
//       ></div>
//       <Container>
//         <Row className="show-grid">
//           <Col md={6}>
//             <Form>
//               <Form.Group controlId="formUsername">
//                 <Form.Label>CustomerID</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter your customerID"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                 />
//               </Form.Group>
//               <Form.Group controlId="formPassword">
//                 <Form.Label>Pin</Form.Label>
//                 <Form.Control
//                   type="password"
//                   placeholder="Enter your pin"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </Form.Group>
//               <Form.Group controlId="formSaveUsername" className="mb-3">
//                 <Form.Check
//                   type="checkbox"
//                   label="Save CustomerID"
//                   checked={saveUsername}
//                   onChange={(e) => setSaveUsername(e.target.checked)}
//                 />
//               </Form.Group>
//               <Button variant="primary" type="submit">
//                 Sign On
//               </Button>
//             </Form>
//           </Col>
//         </Row>
//         {/* if the yare logged in show this successfulModal so import the values and allow us to see if they are logged in */}
//         {/* useSelectors is how to get info from store */}

//         {showModal && <SuccessfulModal show={showModal} />}
//       </Container>
//     </div>
//   );
// };

// export default Login;
// // so at top its just this now import login from "../../services/api-service";
