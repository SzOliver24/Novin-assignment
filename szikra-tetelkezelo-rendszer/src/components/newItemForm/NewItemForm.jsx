import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNewItem } from "../../Redux/slices/item";

const NewItemForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const urlParams = useParams();
  const customerId = urlParams.id;

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("Open");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { name, comment, price, status, customerId };
    try {
      await dispatch(addNewItem(data)).unwrap();
      navigate(-1);
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
            Item name
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="Please enter name of the item"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="comment" tag="h4">
            Comment
          </Label>
          <Input
            id="comment"
            name="comment"
            placeholder="Please give a short comment about the item"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="price" tag="h4">
            Price
          </Label>
          <Input
            id="price"
            name="price"
            placeholder="Please enter a price"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="status" tag="h4">
            Status
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
        <Button color="primary">Submit</Button>
      </Form>
    </div>
  );
};

export default NewItemForm;
