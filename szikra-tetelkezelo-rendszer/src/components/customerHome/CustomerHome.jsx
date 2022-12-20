import { useDispatch } from "react-redux";
import { fetchCustomersOfUser } from "../../Redux/slices/customer";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import PreviewOfCustomers from "../previewOfCustomers/PreviewOfCustomers";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import styles from "./customerHome.module.scss";

const CustomerHome = () => {
  const userId = useSelector((state) => state.session.id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCustomersOfUser(userId));
  }, [dispatch, userId]);

  const handleNavigateToForm = () => {
    navigate("/customer/new");
  };

  return (
    <div className={styles.customerHome}>
      <div className="header">
        <h1>Current customers:</h1>
        <Button color="success" onClick={handleNavigateToForm}>
          Create new customers
        </Button>
      </div>
      <PreviewOfCustomers />
    </div>
  );
};

export default CustomerHome;
