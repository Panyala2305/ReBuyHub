// components/MyOrders.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/my-orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        });
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="mb-6 p-4 bg-white rounded shadow-md border border-gray-100"
          >
            <h3 className="text-lg font-semibold mb-2">
              Order ID: <span className="text-blue-600">{order._id}</span>
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              Ordered on: {new Date(order.createdAt).toLocaleString()}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-gray-600">
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-right mt-4 font-semibold">
              Total Paid: ₹{order.totalAmount.toFixed(2)}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
