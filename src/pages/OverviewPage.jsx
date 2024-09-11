import React from 'react'
import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Header from '../common/header';
import StatCard from '../common/statcard';
import SalesChannelChart from '../common/saleschannelchart';
import SalesOverviewChart from '../common/salesoverviewchart';
import CategoryDistributionChart from '../common/catagorydistributionchart';
import Layout from '../layout/layout';

const OverviewPage = () => {
  return (
	<Layout>

		<div className='flex-1  overflow-auto relative z-10 '>
		  {/* <div className='flex-1 overflow-auto relative z-10'> */}
				<Header title='dernsupport dashboard' />
	
				<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
					{/* STATS */}
					<motion.div
						className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1 }}
					>
						<StatCard name='Total Sales' icon={Zap} value='$12,200' color='#6366F1' />
						<StatCard name='total Users' icon={Users} value='180' color='#8B5CF6' />
						<StatCard name='Total Products' icon={ShoppingBag} value='567' color='#EC4899' />
						<StatCard name='order completed' icon={BarChart2} value='12.5%' color='#10B981' />
					</motion.div>
	
					{/* CHARTS */}
	
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
						<SalesOverviewChart />
			  <CategoryDistributionChart/>
						<SalesChannelChart />
					</div>
				</main>
			</div>
	
	</Layout>
  )
}

export default OverviewPage