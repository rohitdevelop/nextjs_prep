"use client";

import React, { use, useEffect, useState } from "react";
import Link from "next/link";

export default function ProductDetailPage({ params }) {
  const { id } = use(params); // unwrap promise
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) return <p className="text-white">Loading...</p>;

  return (
    <div className="text-white p-8">
      <Link href="/">← Back</Link>
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p>{product.info}</p>
      <p className="text-blue-400">₹{product.price}</p>
    </div>
  );
}
