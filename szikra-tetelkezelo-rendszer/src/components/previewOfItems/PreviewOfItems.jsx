import { Container, Row, Col, Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchItemsOfCustomer } from "../../Redux/slices/item";
import ItemCard from "../itemCard/ItemCard";

const PreviewOfItems = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const urlParams = useParams();
  const customerId = urlParams.id;

  useEffect(() => {
    dispatch(fetchItemsOfCustomer(customerId));
  }, [dispatch, customerId]);

  const handleNavigateToForm = () => {
    navigate(`/customer/items/${customerId}/new`);
  };

  const { items } = useSelector((state) => state.items);
  const allItems = items.map((item) => {
    return (
      <Col sm="2" key={item.id}>
        <ItemCard {...item} />
      </Col>
    );
  });
  return (
    <div className="previewOfItems">
      <Button onClick={handleNavigateToForm}>
        Create new item for this customer
      </Button>
      <Container fluid>
        <Row>{allItems}</Row>
      </Container>
    </div>
  );
};

export default PreviewOfItems;
