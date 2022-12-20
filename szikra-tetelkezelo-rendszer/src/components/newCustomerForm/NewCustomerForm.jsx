import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNewCustomer } from "../../Redux/slices/customer";

const NewCustomerForm = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { name };

    try {
      await dispatch(addNewCustomer(data)).unwrap();
      navigate("/home");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="newCustomerForm">
      <h2>Create new customer</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name" tag="h4">
            Full name
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="Please enter full name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <Button color="primary">Submit</Button>
      </Form>
    </div>
  );
};

export default NewCustomerForm;
