import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function GET() {
  await connectDB();
  const products = await Product.find();
  return NextResponse.json(products);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const newProduct = new Product(body);
  await newProduct.save();
  return NextResponse.json(newProduct, { status: 201 });
}
// 