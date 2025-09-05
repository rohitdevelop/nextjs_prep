 
import {NextResponse} from "next/server";

export async function GET() {
   const products = [
    { id: 1, name: "Laptop", info: "High-performance laptop for students", price: "$899" },
    { id: 2, name: "Headphones", info: "Noise-canceling headphones", price: "$199" },
    { id: 3, name: "Speaker", info: "Bluetooth wireless speaker", price: "$79" },
    { id: 4, name: "Smartwatch", info: "Fitness tracking smartwatch", price: "$299" },
    { id: 5, name: "Smartphone", info: "Latest smartphone model", price: "$699" },
    { id: 6, name: "Gaming Setup", info: "Computer and PS5 bundle", price: "$1299" },
  ];
  return NextResponse.json(products)
}