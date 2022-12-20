import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div style={{ paddingBottom: "40px" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
