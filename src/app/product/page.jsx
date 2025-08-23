"use client";
import React, { useContext } from "react";
import { ProductContext } from "@/context/ProductContext";

const ProductPage = () => {
  const { products, removeProduct } = useContext(ProductContext);

  return (
    <div className="bg-red-700 min-h-screen mt-24 p-6">
      <h1 className="text-2xl font-bold text-white text-center mb-6">
        Product Page
      </h1>

      {products.length === 0 ? (
        <p className="text-white text-center">No products added yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold">{product.name}</h2>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-yellow-600 mt-2">⭐ {product.rating}/5</p>
              </div>
              <div>
                {products.map((item, index) => (
                  <div key={index}>
                    <h2>{item.name}</h2>
                    <button onClick={() => removeProduct(index)}>Remove</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductPage;
