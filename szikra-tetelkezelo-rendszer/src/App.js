import LoginForm from "./components/login/LoginForm";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import CustomerHome from "./components/customerHome/CustomerHome";
import { useSelector } from "react-redux";
import NewCustomerForm from "./components/newCustomerForm/NewCustomerForm";
import PreviewOfItems from "./components/previewOfItems/PreviewOfItems";
import NewItemForm from "./components/newItemForm/NewItemForm";
import RequireAuth from "./components/requireAuth/RequireAuth";
import Unauthorized from "./components/unauthorized/Unauthorized";
import EditItemForm from "./components/editItemForm/EditItemForm";

function App() {
  const userRole = useSelector((state) => state.session.role);
  const sessionStatus = useSelector((state) => state.session.status);

  return (
    (sessionStatus === "succeeded" ||
      sessionStatus === "failed" ||
      sessionStatus === "loading") && (
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
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route element={<RequireAuth allowedRoles={["customer"]} />}>
            <Route path="/home" element={<CustomerHome />} />
            <Route path="/customer/new" element={<NewCustomerForm />} />
            <Route path="/customer/items/:id" element={<PreviewOfItems />} />
            <Route path="/customer/items/:id/new" element={<NewItemForm />} />
            <Route path="/customer/items/:id/edit" element={<EditItemForm />} />
          </Route>
        </Route>
      </Routes>
    )
  );
}

export default App;
