import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Redux/slices/session";
import { useNavigate } from "react-router-dom";
import styles from "./loginForm.module.scss";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sessionStatus = useSelector((state) => state.session.status);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const loginBody = { userName, password };

    try {
      await dispatch(loginUser(loginBody)).unwrap();
      console.log(sessionStatus);
      if (sessionStatus !== "failed") {
        navigate("/home");
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.loginForm}>
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
