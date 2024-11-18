
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  BarChart2,
  Menu,
  ShoppingBag,
  ShoppingCart,
  Users,
  Wrench,
} from "lucide-react";
import { jwtDecode } from "jwt-decode";


// Navigation items configuration
const getNavigationItems = (isAdmin) => {
 
  return isAdmin
 };

// Sidebar Item Component
const SidebarItem = ({ item, isOpen, onClick }) => (
  <div 
    onClick={() => onClick(item.route)}
    className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2 cursor-pointer"
  >
    <item.icon size={20} className="min-w-[20px]" />
    {isOpen && (
      <span className="ml-4 whitespace-nowrap">
        {item.name}
      </span>
    )}
  </div>
);

// Main Sidebar Component
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  // const [isAdmin, setIsAdmin] = useState(false);
  // const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  
  const getToken = localStorage.getItem("token");
  const checkAdmin  = jwtDecode(getToken)
  const admin = checkAdmin.role?.[0]?.name;

 let navigationItem;
 if (admin !== "admin") {
    navigationItem = [
      { name: "Repair Request", icon: Wrench, route: "/repairreq" },
    ];
  }
  else {
    navigationItem = [
      { name: "Overview", icon: BarChart2, route: "/OverviewPage" },
      { name: "Products", icon: ShoppingBag, route: "/products" },
      { name: "Users", icon: Users, route: "/users" },
      { name: "Orders", icon: ShoppingCart, route: "/orders" },
    ];
  
  }


  const handleNavigate = (route) => {
    navigate(route);
  };


  // const navigationItems = getNavigationItems(isAdmin);
  // console.log("isadmin", navigationItem)

  return (
    <div 
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
        >
          <Menu size={24} />
        </button>
        
        <nav className="mt-8 flex-grow">
          {navigationItem.map((item, index) => (
            <SidebarItem
              key={index}
              item={item}
              isOpen={isOpen}
              onClick={handleNavigate}
            />
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;