import { Link, useNavigate } from "react-router-dom";
import {
  Nav,
  Button,
  Navbar as NavbarReactstrap,
  NavbarBrand,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../Redux/slices/session";
import { toast } from "react-toastify";
import styles from "./navbar.module.scss";

function Navbar() {
  const userRole = useSelector((state) => state.session.role);
  const userName = useSelector((state) => state.session.userName);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogOut() {
    dispatch(logOut());
    toast.success(`You have successfully logged out`, {
      position: "bottom-left",
    });
    navigate("/login");
  }

  return userRole === "customer" ? (
    <NavbarReactstrap className={styles.nav}>
      <NavbarBrand to="/home" tag={Link}>
        <h1>Home</h1>
      </NavbarBrand>
      <Nav className="me-auto" navbar>
        {/* <NavItem>add links here</NavItem> */}
      </Nav>
      <p>{userName}</p>
      <Button
        color="success"
        outline
        size="md"
        onClick={() => {
          handleLogOut();
        }}
      >
        Logout
        {/* <i className="fas fa-door-open" />
        {` Log Out`} */}
      </Button>
      &nbsp;
    </NavbarReactstrap>
  ) : (
    <NavbarReactstrap className={styles.nav}>
      <NavbarBrand>
        <h2>Welcome to Szikra Customer and Item Management System</h2>
        <h4>Please log in to continue</h4>
      </NavbarBrand>
    </NavbarReactstrap>
  );
}

export default Navbar;
