import { Sidebar } from "lucide-react";
import React from "react";
import Sidebars from "../components/sidebar";


// Pass the child props
export default function Layout({ children }) {
  return (

    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
    {/* Background */}
    <div className='fixed inset-0 z-0'>
        <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 ' />
        <div className='absolute inset-0 backdrop-blur-sm' />
    </div>
    <Sidebars/>
       {children}
    </div>
  );
}