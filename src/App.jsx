import { Route, Routes } from "react-router-dom";
import OverviewPage from "./pages/OverviewPage";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import SalesPage from "./pages/SalesPage";
import OrdersPage from "./pages/OrdersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import Sidebar from "./components/common/sidebar";
import Login from "./auths/login";
import Registration from "./auths/Registration";
import Invoice from "./components/invoice/invoice";
import { Toaster } from "./components/ui/toaster";
import Repairreq from "./pages/repairrequest";
import { useEffect, useState } from "react";

function App() {
//   const [role, setRole] = useState(null);

//   useEffect(() => {
//     // Get token from localStorage and decode it to get user role
//     const token = localStorage.getItem("token");
//     if (token) {
//       const decoded = JSON.parse(atob(token.split(".")[1])); // Decode JWT token
//       setRole(decoded.role); // Assuming 'role' is included in the token payload
//     }
//   }, []);

//   if (role === null) {
//     return <Login />; // Show login page if no role is found
//   }
  return (
    
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        {/* {role === "admin" && (
          <> */}
            <Route path="/OverviewPage" element={<OverviewPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/sales" element={<SalesPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
			<Route path="/invoice" element={<Invoice />} />
          {/* </>
        )} */}
        {/* {role === "user" && (
          <> */}
            <Route path="/repairreq" element={<Repairreq />} />
          
          {/* </>
        )} */}
      </Routes>
    </div>
  );
}

export default App;
