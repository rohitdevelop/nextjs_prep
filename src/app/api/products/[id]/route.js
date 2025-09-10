// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/db";
// import Product from "@/models/Product";

// export async function PUT(req, { params }) {
//   await connectDB();
//   const body = await req.json();
//   const updated = await Product.findByIdAndUpdate(params.id, body, { new: true });
//   return NextResponse.json(updated);
// }

// export async function DELETE(req, { params }) {
//   await connectDB();
//   await Product.findByIdAndDelete(params.id);
//   return NextResponse.json({ message: "Product deleted" });
// }
