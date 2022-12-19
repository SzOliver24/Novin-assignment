import { Button, Form, FormGroup, Input, Label } from "reactstrap";

const LoginForm = () => {
  return (
    <Form>
      <FormGroup floating>
        <Input
          id="userName"
          name="userName"
          placeholder="Username"
          type="text"
        />
        <Label for="userName">Username</Label>
      </FormGroup>
      <FormGroup floating>
        <Input
          id="password"
          name="password"
          placeholder="Password"
          type="password"
        />
        <Label for="password">Password</Label>
      </FormGroup>
      <Button>Login</Button>
    </Form>
  );
};

export default LoginForm;
