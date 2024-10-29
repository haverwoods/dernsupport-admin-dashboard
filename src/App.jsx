import { Route, Routes } from "react-router-dom";
import OverviewPage from "./pages/OverviewPage";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import SalesPage from "./pages/SalesPage";
import OrdersPage from "./pages/OrdersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import Sidebar from "./components/sidebar";
import Login from "./auths/login";
import Registration from "./auths/Registration";
import Invoice from "./invoice/invoice";

function App() {
	
	return (
	
			<div>

			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/login' element={<Login/>} />
				<Route path='/registration' element={<Registration/>} />
				<Route path='/OverviewPage' element={<OverviewPage />} />
				<Route path='/products' element={<ProductsPage />} />
				<Route path='/users' element={<UsersPage />} />
				<Route path='/sales' element={<SalesPage />} />
				<Route path='/orders' element={<OrdersPage />} />
				<Route path='/analytics' element={<AnalyticsPage />} />
				<Route path='/settings' element={<SettingsPage />} />
				<Route path='/invoice' element={<Invoice/>}/>
			</Routes>
		</div>
	);
}

export default App;
