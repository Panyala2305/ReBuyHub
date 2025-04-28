import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/reducers/cartReducer";
 // adjust path as needed

const ProductSlider = ({ products = [] }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="w-full py-6 container m-auto">
      <h2 className="text-2xl font-semibold mb-4 px-4">Newly Added</h2>
      <div className="overflow-x-auto whitespace-nowrap px-4 scroll-smooth no-scrollbar">
        <div className="flex gap-4">
          {products.map((product, index) => (
            <div
              key={index}
              className="w-60 flex-shrink-0 bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-cover rounded-t-2xl"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-800 truncate">
                  {product.title}
                </h3>
                <p className="text-blue-600 font-semibold mt-1 text-base">
                  ₹{product.price}
                </p>
                <button
                  className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
