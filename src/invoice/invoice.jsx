import { useState } from 'react';
import axios from 'axios';

const OrderDetails = ({ orderId, userId }) => {
  const [sparePartCost, setSparePartCost] = useState(0);
  const [serviceHours, setServiceHours] = useState(0);
  const [perHourRate, setPerHourRate] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Function to calculate total price based on inputs
  const calculateTotalPrice = () => {
    const totalServiceCharge = serviceHours * perHourRate;
    const total = sparePartCost + totalServiceCharge;
    setTotalPrice(total);
  };

  // Function to handle sending the invoice email
  const handleSendEmail = async () => {
    try {
      // Invoice details with all the calculated information
      const invoiceDetails = {
        sparePartCost,
        serviceHours,
        perHourRate,
        totalPrice,
      };

      // Send request to backend API
      await axios.post('/admin/send-invoice', {
        userId,
        orderId,
        invoiceDetails,
      });
      alert('Invoice email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send invoice email.');
    }
  };

  return (
    <div>
      <h3>Order Details for Invoice</h3>

      {/* Spare Part Cost Input */}
      <div>
        <label>Spare Part Cost ($):</label>
        <input
          type="number"
          value={sparePartCost}
          onChange={(e) => setSparePartCost(Number(e.target.value))}
        />
      </div>

      {/* Service Hours Input */}
      <div>
        <label>Service Hours (hrs):</label>
        <input
          type="number"
          value={serviceHours}
          onChange={(e) => setServiceHours(Number(e.target.value))}
        />
      </div>

      {/* Per Hour Rate Input */}
      <div>
        <label>Per Hour Rate ($):</label>
        <input
          type="number"
          value={perHourRate}
          onChange={(e) => setPerHourRate(Number(e.target.value))}
        />
      </div>

      {/* Total Price Calculation */}
      <div>
        <button onClick={calculateTotalPrice}>Calculate Total Price</button>
        <h4>Total Price: ${totalPrice}</h4>
      </div>

      {/* Button to send invoice */}
      <button onClick={handleSendEmail}>Send Invoice Email</button>
    </div>
  );
};

export default OrderDetails;
