import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { deleteCustomer } from "../../Redux/slices/customer";

const CustomerCard = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const redirect = () => {
    navigate(`/customer/items/${props.id}/?name=${props.name}`);
  };

  const handleDelete = async (customerId) => {
    try {
      await dispatch(deleteCustomer(customerId));
    } catch (error) {
      console.error("Failed to delete customer: ", error);
    }
  };

  return (
    <div className="customerCard">
      <Card>
        <CardBody onClick={redirect}>
          <CardTitle tag="h5">{props.name}</CardTitle>
          <CardText>{props.createdAt}</CardText>
        </CardBody>
        <Button onClick={() => handleDelete(props.id)}>Delete</Button>
      </Card>
    </div>
  );
};

export default CustomerCard;
