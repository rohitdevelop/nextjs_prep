"use client";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [form, setForm] = useState({ name: "", info: "", price: "" });
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch products from backend
  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add new product
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ name: "", info: "", price: "" });
    fetchProducts();
  };

  // Delete product
  const handleDelete = async (id) => {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  // Start editing a product
  const handleEdit = (product) => {
    setEditingProduct(product._id);
    setForm({ name: product.name, info: product.info, price: product.price });
  };

  // Update product
  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`/api/products/${editingProduct}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setEditingProduct(null);
    setForm({ name: "", info: "", price: "" });
    fetchProducts();
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-6 space-y-6">
        <h1 className="text-2xl font-bold text-blue-400">Admin Panel</h1>
        <ul className="space-y-3">
          <li className="cursor-pointer hover:text-blue-400">📦 Products</li>
          <li className="cursor-pointer hover:text-blue-400">➕ Add Product</li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 p-10">
        <h2 className="text-3xl font-bold mb-6">Manage Products</h2>

        {/* Add / Update Form */}
        <form
          onSubmit={editingProduct ? handleUpdate : handleSubmit}
          className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4 w-full max-w-md mb-10"
        >
          <h3 className="text-xl font-bold">
            {editingProduct ? "Update Product" : "Add Product"}
          </h3>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
          <input
            type="text"
            name="info"
            placeholder="Product Info"
            value={form.info}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700"
          >
            {editingProduct ? "Update Product" : "Add Product"}
          </button>
        </form>

        {/* Product List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item) => (
            <div
              key={item._id}
              className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-all"
            >
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-gray-400">{item.info}</p>
              <p className="text-lg font-bold text-blue-400">${item.price}</p>

              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
