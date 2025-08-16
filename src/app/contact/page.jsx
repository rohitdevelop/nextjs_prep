"use client";
import React, { useState, useContext } from "react";
import { ProductContext } from "@/context/ProductContext";

const ProductCardPage = () => {
  const { products, setProducts } = useContext(ProductContext);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    rating: 0,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProducts([...products, formData]); // add product globally
    setFormData({ name: "", description: "", image: "", rating: 0 });
  };

  return (
    <div className="bg-red-800 min-h-screen mt-24 p-6 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black p-4 rounded-xl max-w-md mx-auto shadow-lg flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold text-center">Add Product</h2>

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        <input
          type="text"
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        <input
          type="number"
          name="rating"
          placeholder="Rating (1-5)"
          value={formData.rating}
          onChange={handleChange}
          className="p-2 border rounded"
          min="1"
          max="5"
        />

        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductCardPage;
