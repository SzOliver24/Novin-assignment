import { useDispatch } from "react-redux";
import { fetchCustomersOfUser } from "../../Redux/slices/customer";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import PreviewOfCustomers from "../previewOfCustomers/PreviewOfCustomers";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const CustomerHome = () => {
  const userId = useSelector((state) => state.session.id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCustomersOfUser(userId));
  }, [dispatch]);

  const handleNavigateToForm = () => {
    navigate("/customer/new");
  };

  return (
    <div className="customerHome">
      <h1>Customer home</h1>
      <Button onClick={handleNavigateToForm}>Create new customers</Button>
      <PreviewOfCustomers />
    </div>
  );
};

export default CustomerHome;
