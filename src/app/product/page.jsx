import React from "react";
import Link from "next/link";

const ProductsPage = () => {
  const products = [
    { id: 1, name: "Laptop", info: "High-performance laptop for students", price: "$899" },
    { id: 2, name: "Headphones", info: "Noise-canceling headphones", price: "$199" },
    { id: 3, name: "Speaker", info: "Bluetooth wireless speaker", price: "$79" },
    { id: 4, name: "Smartwatch", info: "Fitness tracking smartwatch", price: "$299" },
    { id: 5, name: "Smartphone", info: "Latest smartphone model", price: "$699" },
    { id: 6, name: "Gaming Setup", info: "Computer and PS5 bundle", price: "$1299" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Our Products
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item) => (
            <Link 
              key={item.id} 
              href={`/product/${item.id}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border hover:border-blue-300 group-hover:-translate-y-1">
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                    {item.name}
                  </h2>
                  <p className="text-gray-600 mb-4 text-sm">
                    {item.info}
                  </p>
                  <div className="text-2xl font-bold text-blue-600">
                    {item.price}
                  </div>
                  <div className="mt-4 text-blue-500 group-hover:text-blue-700 font-medium">
                    View Details →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;