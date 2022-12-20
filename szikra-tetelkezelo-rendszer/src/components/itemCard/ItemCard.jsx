import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { deleteItem } from "../../Redux/slices/item";

const ItemCard = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const urlParams = useParams();
  const customerId = urlParams.id;

  const handleDelete = async (itemId, customerId) => {
    try {
      await dispatch(deleteItem([itemId, customerId]));
    } catch (error) {
      console.error("Failed to delete customer: ", error);
    }
  };

  const handleNavigateToForm = () => {
    navigate(`/customer/items/${props.id}/edit`);
  };

  return (
    <div className="itemCard">
      <Card>
        <CardBody>
          <CardTitle tag="h5">{props.name}</CardTitle>
          <CardText>Comment: {props.comment}</CardText>
          <CardText>Price: {props.price}</CardText>
          <CardText>Status: {props.status}</CardText>
          <CardText>Created at: {props.createdAt}</CardText>
        </CardBody>
        <Button
          color="danger"
          outline
          onClick={() => handleDelete(props.id, customerId)}
        >
          Delete
        </Button>
        <Button color="primary" outline onClick={handleNavigateToForm}>
          Edit
        </Button>
      </Card>
    </div>
  );
};

export default ItemCard;
