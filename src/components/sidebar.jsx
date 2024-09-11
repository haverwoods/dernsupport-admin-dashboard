import {
  BarChart2,
  DollarSign,
  Menu,
  Settings,
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";


export const Sidebars = () => {
  const SIDEBAR_ITEMS = [
    { name: "Overview", icon: BarChart2, route: "/OverviewPage" },
    { name: "Products", icon: ShoppingBag, route: "/products" },
    { name: "Users", icon: Users, route: "/users" },
    { name: "Sales", icon: DollarSign, route: "/sales" },
    { name: "Orders", icon: ShoppingCart, route: "/orders" },
    { name: "Analytics", icon: TrendingUp, route: "/analytics" },
    { name: "Settings", icon: Settings, route: "/settings" },
  ];

  const navigate = useNavigate();

  const navigateRoute = (Route) => {
    navigate(Route);
   }

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
    >
      <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
        >
          <Menu size={24} />
        </motion.button>
        {/* sidebar item below */}
        <nav className="mt-8 flex-grow">
          {SIDEBAR_ITEMS?.map((item) => (<span onClick={() => navigateRoute(item.route)}>
          <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2 cursor-pointer">
                <item.icon
                  size={20}
                  style={{  minWidth: "20px" }}
                />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="ml-4 whitespace-nowrap "
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.1, delay: 0.3 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
              </span>
            )
           
          )}
        </nav>
       
      </div>
    </motion.div>
  );
};
// };
export default Sidebars;
