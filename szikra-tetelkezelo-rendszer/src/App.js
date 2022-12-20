import LoginForm from "./components/login/LoginForm";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import CustomerHome from "./components/customerHome/CustomerHome";
import { useSelector } from "react-redux";
import NewCustomerForm from "./components/newCustomerForm/NewCustomerForm";

function App() {
  const userRole = useSelector((state) => state.session.role);
  const sessionStatus = useSelector((state) => state.session.status);

  return (
    (sessionStatus === "succeeded" || sessionStatus === "failed") && (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={
              userRole === "customer" ? (
                <Navigate to="/home" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/home" element={<CustomerHome />} />
          <Route path="/customer/new" element={<NewCustomerForm />} />
        </Route>
      </Routes>
    )
  );
}

export default App;
