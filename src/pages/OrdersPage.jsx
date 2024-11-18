import React from 'react'
import Layout from '../layout/layout';
import Header from '../components/common/header';
import StatCard from '../components/common/statcard';
import {  CalendarRange, CheckCircle, Clock, DollarSign, ShoppingBag  } from "lucide-react";
import { motion } from "framer-motion";
import Orderlist from '../components/order/orderlist';
import { format } from 'date-fns';


const currentMonth = format(new Date(), 'MMMM'); 

const orderStats = {
	totalOrders: "50",
	Month: currentMonth,
};
const OrdersPage = () => {
  return (
	<Layout>

    <div className='flex-1 overflow-auto relative z-10'>
       <Header title='Orders Page' />
       <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Orders' icon={ShoppingBag} value={orderStats.totalOrders} color='#6366F1' />
					
					<StatCard name='Month' icon={CalendarRange} value={orderStats.Month} color='#EF4444' />
				</motion.div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
					
				</div>

				<Orderlist />
			</main>
    </div>
	</Layout>
  )
}

export default OrdersPage