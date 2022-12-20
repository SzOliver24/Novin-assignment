import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editItem } from "../../Redux/slices/item";

const EditItemForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const urlParams = useParams();
  const itemId = urlParams.id;

  const { customers } = useSelector((state) => state.customers);

  const [customerId, setCustomerId] = useState("");
  const [status, setStatus] = useState("Open");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { itemId, status, customerId };
    try {
      await dispatch(editItem(data)).unwrap();
      navigate(-1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="editItemForm">
      <h2>Edit item</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="status" tag="h4">
            Select Status
          </Label>
          <Input
            id="status"
            name="status"
            type="select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="customerId" tag="h4">
            Select Customer
          </Label>
          <Input
            id="customerId"
            name="customerId"
            type="select"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
          >
            {customers.map((customer) => (
              <option value={customer.id} key={customer.id}>
                {customer.name}
              </option>
            ))}
          </Input>
        </FormGroup>
        <Button color="primary">Submit</Button>
      </Form>
    </div>
  );
};

export default EditItemForm;
