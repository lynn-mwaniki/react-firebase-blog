import React, { useState } from 'react'
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../firebase/firebase'

const SignIn = ({setIsAuth}) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

const submitUser = (e) =>{
  e.preventDefault();
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
            // Signed in
            setIsAuth(true);
      localStorage.setItem("isAuth", true)
            const user = userCredential.user;
            console.log(user);
            navigate("/")
            // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorCode, errorMessage)
          });
}

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className=" text-center fw-bold mb-2 text-uppercase text-primary ">Sign Up</h2>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" 
                         onChange={(e)=>setEmail(e.target.value)}/>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                         onChange={(e)=>setPassword(e.target.value)} />
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit"
                        onClick={submitUser}>
                          Sign In
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account? 
                        <Link className="text-decoration-none" to="/login"> login</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default SignIn