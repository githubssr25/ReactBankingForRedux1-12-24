import React, { useState } from "react";
import { useEffect } from "react";
import { Stack, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

// react context google and also google react authentication
// normally if you register new account it will take them back to log in page and they still have to log in
// value is whatever state vlaue is
// onchange can also put componnent here if relevant instead of e

// session storage is in browser and not tracked by react. Info that lasts as long as browser is open.
// state is totally diff state is ina context of react is created by using
//  useState and what react pays attention to its what react re renders when state changes
// state exists as long as component exist

const RegisterAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    apiTest();
  }, []);

  // type would like if you put in number only type in number for input and for passwrod it hides characters as you type them

  // thisi s where make fetch call
  // we dont want page to refresh when we fire off this request, front ends are known to build spaws
  // (single page app, ie not reloading just changing content) that spaw is what we are buliding here
  // we dontw ant to re load page when we make a request because of archaic rules and the way that
  // javascript and html was built yrs ago when you hit submit that usually required a page refresh
  // lose session data w refresh and you will lsoe state data. if you hit refresh everything is lost like form data stuff like that.

  // prevents it from refreshing

  // this is same as below event.ttarget 0 or 1
  // console.log(event.target[0]);
  // console.log(event.target[1]);
  // can index an object like this so we are grabbing element of this object that has a
  // property of 0 the property name ofi ti s 0 and in our case that isthe username
  // username nad password are same event becasue event is whe nyou type log in

  // fetch(`localhost:9000/login/${}`) if want to pass in a userId the whole thing has toh ave backticks like this
  // await vs asynch 312 asycnh is specify as function and await is what you put when you want to make a promise resolve
  // await is make promise resolve and asynch to specify a function that has a promise in it that you will use await in it

  // if user starts typing into box you call onchagne, if user clicks log in the nti will call handle submit
  // on change is just something changing within the box. e.target.value is value of current text box

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
      // data will be actual response object the JSON data that back end responded with
      // if oyu want to cath an an error you sourrund w try catch
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
