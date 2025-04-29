import React from "react";
import { toast } from 'react-hot-toast';

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../store/reducers/cartReducer";
import axios from "axios";
import loadRazorpay from "../utils/loadRazorpay";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Inside component


  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const handleCheckout = async () => {
    const amount = calculateTotal();

    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      // Create Razorpay order on backend
      const { data } = await axios.post("http://localhost:5000/api/payment/create-order", {
        amount: amount,
      });

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY, // Razorpay Test Key
        amount: data.order.amount,
        currency: "INR",
        name: "ReBuyHub",
        description: "Cart Checkout",
        order_id: data.order.id,
        handler: async function (response) {
          
          toast.success("Payment Successful!");

          console.log("Razorpay Response:", response);

          try {
            // Send order data to backend
            await axios.post(
              "http://localhost:5000/api/createorder",
              {
                items: cartItems,
                totalAmount: amount,
                paymentId: response.razorpay_payment_id,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
              }
            );

            dispatch(clearCart());
            navigate("/orders");

          } catch (orderError) {
            console.error("Failed to save order:", orderError);
            toast.error("Payment succeeded, but saving order failed.");

          }
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#10B981",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Something went wrong during checkout.");

    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item, index) => (
              <li
                key={index}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="text-lg font-medium">{item.title}</h3>
                    <p className="text-blue-600 font-semibold">₹{item.price}</p>
                    <div className="flex items-center mt-2 space-x-2">
                      <button
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        −
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(increaseQuantity(item.id))}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      Subtotal: ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="mt-4 sm:mt-0 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          {/* Cart Summary Section */}
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total:</span>
              <span>₹{calculateTotal().toFixed(2)}</span>
            </div>
            <button
              className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300"
              onClick={handleCheckout}
            >
              Proceed to Buy
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
