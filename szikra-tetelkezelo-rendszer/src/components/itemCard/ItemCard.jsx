import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { deleteItem } from "../../Redux/slices/item";

const ItemCard = (props) => {
  const dispatch = useDispatch();
  const urlParams = useParams();
  const customerId = urlParams.id;

  const handleDelete = async (itemId, customerId) => {
    try {
      await dispatch(deleteItem([itemId, customerId]));
    } catch (error) {
      console.error("Failed to delete customer: ", error);
    }
  };

  return (
    <div className="itemCard">
      <Card>
        <CardBody>
          <CardTitle tag="h5">{props.name}</CardTitle>
          <CardText>{props.comment}</CardText>
          <CardText>{props.price}</CardText>
          <CardText>{props.status}</CardText>
          <CardText>{props.createdAt}</CardText>
          <Button onClick={() => handleDelete(props.id, customerId)}>
            Delete
          </Button>
          <Button>Edit</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default ItemCard;
