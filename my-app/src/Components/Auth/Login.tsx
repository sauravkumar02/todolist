import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      email: email,
      password: password,
    });

    let response = await fetch(process.env.REACT_APP_API_URL +"login/", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    let data = await response.json();
    console.log(data);
    if (response.ok) {
      console.log("kk", data.token);

      localStorage.setItem("token", data.token);
      localStorage.setItem("fullname", data.fullname);
      localStorage.setItem("userId", data.user_id);
      toast.success("Login Successfully");
      navigate("/dashboard");
      window.location.reload();
    } else {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ maxWidth: "600px" }}>
        <h1 className="mb-4">Login</h1>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Login
          </Button>
        </Form>
        <p className="mt-3">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </Container>
  );
};

export default Login;
