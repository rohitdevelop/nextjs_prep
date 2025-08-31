import React from 'react';
import Link from 'next/link';

const ProductDetailPage = ({ params }) => {
  const { id } = params;
  
  const productDetails = {
    1: { name: "Laptop", description: "High-performance laptop perfect for students with 16GB RAM, 512GB SSD, and long battery life.", price: "$899", features: ["16GB RAM", "512GB SSD", "10hr Battery", "Intel i7"] },
    2: { name: "Headphones", description: "Premium noise-canceling headphones with studio-quality sound and wireless connectivity.", price: "$199", features: ["Noise Canceling", "40hr Battery", "Wireless", "Premium Sound"] },
    3: { name: "Speaker", description: "Portable Bluetooth speaker with 360° sound and waterproof design.", price: "$79", features: ["360° Sound", "Waterproof", "12hr Battery", "Bluetooth 5.0"] },
    4: { name: "Smartwatch", description: "Advanced fitness tracking smartwatch with health monitoring and GPS.", price: "$299", features: ["Heart Rate Monitor", "GPS", "Sleep Tracking", "Water Resistant"] },
    5: { name: "Smartphone", description: "Latest flagship smartphone with professional camera system and 5G connectivity.", price: "$699", features: ["5G Ready", "Pro Camera", "Fast Charging", "128GB Storage"] },
    6: { name: "Gaming Setup", description: "Complete gaming bundle including high-end computer and PlayStation 5 console.", price: "$1299", features: ["RTX Graphics", "PS5 Console", "Gaming Monitor", "RGB Lighting"] }
  };

  const product = productDetails[id] || { name: "Product", description: "Product not found", price: "N/A", features: [] };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
        >
          ← Back to Products
        </Link>

        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {product.name}
            </h1>
            <div className="text-3xl font-bold text-blue-600 mb-6">
              {product.price}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Image Placeholder */}
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
              <span className="text-gray-500 text-lg">Product Image</span>
            </div>

            {/* Product Info */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Description</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {product.description}
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Features</h3>
              <ul className="space-y-2 mb-6">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;