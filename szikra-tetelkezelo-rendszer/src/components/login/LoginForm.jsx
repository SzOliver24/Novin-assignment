import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Redux/slices/session";
import { useNavigate } from "react-router-dom";

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
      if (sessionStatus !== "failed") {
        navigate("/home");
      }
      // navigate to homepage of the current user where he sees his customers and items?
      // show somehow on the homepage his usernam on top right and include logout
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <FormGroup floating>
        <Input
          id="userName"
          name="userName"
          placeholder="Username"
          type="text"
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Label for="password">Password</Label>
      </FormGroup>
      <Button>Login</Button>
    </Form>
  );
};

export default LoginForm;
