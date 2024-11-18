import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Invoice = ({ orderId, clientId }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sparePartCost, setSparePartCost] = useState("");
  const [serviceHours, setServiceHours] = useState("");
  const [perHourRate, setPerHourRate] = useState("");
  const [description, setDescription] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [userMessage, setUserMessage] = useState('');
  const location = useLocation();
  const clientEmail = location.state?.clientEmail || 'No email provided';
const navigate = useNavigate()
  const back = () => {
    navigate("/orders")
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  
//fetch products from database
  const fetchProducts = async (search = "") => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/products`,
        {
          params: { search },
        }
      );
      setProducts(response.data);
      setFilteredProducts(response.data); // Initialize filtered products
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };
 

  // Handle product search
  const handleSearch = (e) => {
    const search = e.target.value;
    setSearchTerm(search);
    fetchProducts(search);
  };
  // const handleAddProduct = (product) => {
  //   setSelectedProduct([...selectedProduct, product]);
  //   setSparePartCost(prevCost => prevCost + product.price);
  // };

  const handleAddProduct = (product) => {
    setSelectedProduct((prevSelectedProducts) => {
      const updatedProducts = [...prevSelectedProducts, product];
      const updatedSparePartCost = updatedProducts.reduce((total, p) => total + p.price, 0);
      setSparePartCost(updatedSparePartCost); // Update spare part cost with total price of added products
      return updatedProducts;
    });
  };


  // Function to calculate total price
  const calculateTotalPrice = () => {
    const totalServiceCharge = (serviceHours || 0) * (perHourRate || 0);
    const total = (sparePartCost || 0) + totalServiceCharge;
    setTotalPrice(total.toFixed(2)); // round to two decimal places
  };

  // Function to handle sending the invoice email
  const handleSendEmail = async () => {
    try {
      const invoiceDetails = {
        sparePartCost,
        serviceHours,
        perHourRate,
        description,
        totalPrice,
      };

      await axios.post("http://localhost:5000/api/invoice/invoice", {
        clientId,
        orderId,
        invoiceDetails,
      });
      alert("Invoice email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send invoice email.");
    }
  };



  return (
    <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-md bg-gradient-to-r from-blue-50 to-white">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Order Details for Invoice
      </h3>
      {/* <p>User Email: {{clientEmail} || "Email not available"}</p> */}

     
      {/* Product Selection Box */}
      <div className="mb-4 p-4 border border-gray-300 rounded-md">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search for products"
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
        />
        <div className="overflow-y-auto max-h-40">
          {filteredProducts.map((product) => (
            <div key={product.id} className="flex justify-between items-center p-2 border-b">
              <span>{product.name} - ${product.price}</span>
              <button
                onClick={() => handleAddProduct(product)}
                className="bg-green-500 text-white p-1 rounded-md"
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </div>

     
      {/* Selected Products Description */}
      <div className="mb-4 p-4 border border-gray-300 rounded-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">Selected Products:</label>
        {selectedProduct.length > 0 ? (
          selectedProduct.map((product, index) => (
            <p key={index} className="text-gray-700">{product.name} - ${product.price}</p>
          ))
        ) : (
          <p className="text-gray-500">No products added.</p>
        )}
      </div>

      {/* Description Input */}
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Type message"
          required
        />
      </div>

      {/* Spare Part Cost Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Spare Part Cost ($)
        </label>
        <input
          type="number"
          value={sparePartCost}
          readOnly
          // onChange={(e) => setSparePartCost(Number(e.target.value))}
          onChange={(e) =>
            setSparePartCost(
              e.target.value === "" ? "" : Number(e.target.value)
            )
          }
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          min="0"
          step="0.01"
          placeholder="Enter cost"
        />
      </div>

      {/* Service Hours Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Service Hours (hrs)
        </label>
        <input
          type="number"
          value={serviceHours}
          onChange={(e) =>
            setServiceHours(e.target.value === "" ? "" : Number(e.target.value))
          }
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          min="0"
          step="0.1"
          placeholder="Enter hours"
        />
      </div>

      {/* Per Hour Rate Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Per Hour Rate ($)
        </label>
        <input
          type="number"
          value={perHourRate}
          onChange={(e) =>
            setPerHourRate(e.target.value === "" ? "" : Number(e.target.value))
          }
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          min="0"
          step="0.01"
          placeholder="Enter rate"
        />
      </div>

      {/* Total Price Calculation */}
      <div className="mb-4">
        <button
          onClick={calculateTotalPrice}
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Calculate Total Price
        </button>
        <h4 className="mt-2 text-lg font-bold text-gray-800">
          Total Price: ${totalPrice}
        </h4>
      </div>

      {/* Button to send invoice */}
      <button
        className="w-full p-2 mb-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        onClick={handleSendEmail}
      >
        Send Invoice Email
      </button>

      {/* Stripe Payment Button */}
      {/* {totalPrice > 0 && (
        <button
          className="w-full p-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition"
          onClick={handleStripePayment}
        >
          Pay Invoice (${totalPrice})
        </button>
      )} */}
        <button
                        onClick={(back)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        back
                      </button>
    </div>
  );
};

export default Invoice;
