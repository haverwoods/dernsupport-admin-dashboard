import React, { useState } from 'react'
import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";

const PRODUCT_DATA = [
	// Laptops
	{ id: 1, name: "Dell XPS 13 Screen", category: "Laptop Parts", price: 200, stock: 10 },
	{ id: 2, name: "HP Pavilion 15 Battery", category: "Laptop Parts", price: 120, stock: 20 },
	{ id: 3, name: "Lenovo ThinkPad X1 Keyboard", category: "Laptop Parts", price: 90, stock: 15 },
	{ id: 4, name: "Apple MacBook Air 13\" Trackpad", category: "Laptop Parts", price: 150, stock: 8 },
	{ id: 5, name: "Asus ROG Zephyrus G14 Fan", category: "Laptop Parts", price: 100, stock: 12 },
	
	// Mobile Phones
	{ id: 6, name: "Apple iPhone 12 Screen", category: "Mobile Parts", price: 250, stock: 30 },
	{ id: 7, name: "Samsung Galaxy S21 Battery", category: "Mobile Parts", price: 90, stock: 50 },
	{ id: 8, name: "OnePlus 9 Pro Charging Port", category: "Mobile Parts", price: 60, stock: 25 },
	{ id: 9, name: "Google Pixel 5 Back Glass", category: "Mobile Parts", price: 40, stock: 40 },
	{ id: 10, name: "Apple iPhone 11 Rear Camera", category: "Mobile Parts", price: 100, stock: 15 },
	
	// Tablets
	{ id: 11, name: "Apple iPad Pro 11\" Screen", category: "Tablet Parts", price: 200, stock: 10 },
	{ id: 12, name: "Samsung Galaxy Tab S7 Battery", category: "Tablet Parts", price: 110, stock: 20 },
	{ id: 13, name: "Microsoft Surface Pro 7 Keyboard", category: "Tablet Parts", price: 150, stock: 12 },
	
	// Device Upgrades (Laptops, Desktops)
	{ id: 14, name: "WD Blue SSD 1TB", category: "Device Upgrades", price: 150, stock: 35 },
	{ id: 15, name: "Samsung 970 Evo NVMe SSD 1TB", category: "Device Upgrades", price: 180, stock: 30 },
	{ id: 16, name: "Corsair Vengeance 16GB RAM", category: "Device Upgrades", price: 150, stock: 40 },
	{ id: 17, name: "Kingston 32GB DDR4 RAM", category: "Device Upgrades", price: 250, stock: 20 },
	{ id: 18, name: "Nvidia GTX 1660 Graphics Card", category: "Device Upgrades", price: 300, stock: 10 },
	{ id: 19, name: "AMD Ryzen 5 5600X Processor", category: "Device Upgrades", price: 220, stock: 18 },

	// Accessories and Peripherals
	{ id: 20, name: "Logitech MX Master 3 Mouse", category: "Accessories", price: 90, stock: 50 },
	{ id: 21, name: "Anker 60W USB-C Charger", category: "Accessories", price: 60, stock: 60 },
	{ id: 22, name: "Apple Lightning Cable 1m", category: "Accessories", price: 20, stock: 100 },
	{ id: 23, name: "Dell 65W Laptop Charger", category: "Accessories", price: 50, stock: 40 },
	{ id: 24, name: "Samsung Wireless Charger Duo", category: "Accessories", price: 70, stock: 30 },
	{ id: 25, name: "Spigen iPhone 12 Screen Protector", category: "Accessories", price: 25, stock: 200 },
	
	// Repair Tools
	{ id: 26, name: "iFixit Pro Tech Toolkit", category: "Repair Tools", price: 70, stock: 20 },
	{ id: 27, name: "Pry Tools for Mobile and Tablet Repairs", category: "Repair Tools", price: 15, stock: 50 },
	{ id: 28, name: "Anti-static Wrist Strap", category: "Repair Tools", price: 10, stock: 100 },
	{ id: 29, name: "Precision Screwdriver Set", category: "Repair Tools", price: 25, stock: 60 },
	{ id: 30, name: "Magnetic Mat for Screws", category: "Repair Tools", price: 12, stock: 30 }
];



const Productstable = () => {
    const [searchTerm, setSearchTerm] = useState("");
	const [filteredProducts, setFilteredProducts] = useState(PRODUCT_DATA);

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = PRODUCT_DATA.filter(
			(product) => product.name.toLowerCase().includes(term) || product.category.toLowerCase().includes(term)
		);

		setFilteredProducts(filtered);
	};

  return (
    // <div>productstable</div>
    <motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold text-gray-100'>Product List</h2>
				<div className='relative'>
					<input
						type='text'
						placeholder='Search products...'
						className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
						onChange={handleSearch}
						value={searchTerm}
					/>
					<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
				</div>
			</div>

			<div className='overflow-x-auto'>
				<table className='min-w-full divide-y divide-gray-700'>
					<thead>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Name
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Category
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Price
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Stock
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Sales
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Actions
							</th>
						</tr>
					</thead>

					<tbody className='divide-y divide-gray-700'>
						{filteredProducts.map((product) => (
							<motion.tr
								key={product.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center'>
									{/* <img
										src='https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lyZWxlc3MlMjBlYXJidWRzfGVufDB8fDB8fHww'
										alt='Product img'
										className='size-10 rounded-full'
									/> */}
									{product.name}
								</td>

								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									{product.category}
								</td>

								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									${product.price.toFixed(2)}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>{product.stock}</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>{product.sales}</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									<button className='text-indigo-400 hover:text-indigo-300 mr-2'>
										<Edit size={18} />
									</button>
									<button className='text-red-400 hover:text-red-300'>
										<Trash2 size={18} />
									</button>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>
		</motion.div>
  )
}

export default Productstable