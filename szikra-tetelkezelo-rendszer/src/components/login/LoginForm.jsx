import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../Redux/slices/session";
import { useNavigate } from "react-router-dom";
import styles from "./loginForm.module.scss";
import AlertMessages from "../alertMessages/AlertMessages";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const loginBody = { userName, password };

    try {
      await dispatch(loginUser(loginBody)).unwrap();
      navigate("/home");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.loginForm}>
      <AlertMessages slice="session" />
      <Form onSubmit={handleFormSubmit}>
        <FormGroup floating>
          <Input
            id="userName"
            name="userName"
            placeholder="Username"
            type="text"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Label for="userName">Username</Label>
        </FormGroup>
        <FormGroup floating>
          <Input
            id="password"
            name="password"
            placeholder="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Label for="password">Password</Label>
        </FormGroup>
        <Button color="success">Login</Button>
      </Form>
    </div>
  );
};

export default LoginForm;
