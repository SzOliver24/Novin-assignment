import { Container, Row, Col } from "reactstrap";
import { useSelector } from "react-redux";
import CustomerCard from "../customerCard/CustomerCard";

const PreviewOfCustomers = () => {
  const { customers } = useSelector((state) => state.customers);
  const allCustomers = customers.map((customer) => {
    return (
      <Col sm="2" key={customer.id}>
        <CustomerCard {...customer} />
      </Col>
    );
  });
  return (
    <div className="previewOfCustomers">
      <Container fluid>
        <Row>{allCustomers}</Row>
      </Container>
    </div>
  );
};

export default PreviewOfCustomers;
