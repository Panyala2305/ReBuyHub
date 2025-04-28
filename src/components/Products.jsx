import React from "react";
import ProductSlider from "./ProductSlider";


    const sampleProducts = [
        {
          id: 1,
          title: "Mobiles",
          image: "https://cdn.pixabay.com/photo/2017/04/03/15/52/mobile-phone-2198770_1280.png",
          price: 499,
        },
        {
          id: 2,
          title: "Trendy Sunglasses",
          image: "https://cdn.pixabay.com/photo/2016/06/28/05/10/laptop-1483974_640.jpg",
          price: 999,
        },
        {
          id: 3,
          title: "Smart Watch",
          image: "https://cdn.pixabay.com/photo/2014/07/31/23/00/wristwatch-407096_640.jpg",
          price: 2499,
        },
        {
          id: 4,
          title: "Cool Sneakers",
          image: "https://cdn.pixabay.com/photo/2018/07/31/11/30/shoes-3574855_640.jpg",
          price: 1799,
        },
      ];
      


const Products = () => {
  return (
    <div className="bg-gray-100 min-h-screen ">
      <ProductSlider products={sampleProducts} />
    </div>
  );
};

export default Products;
