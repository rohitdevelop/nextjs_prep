import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file"); // image from frontend

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "products" }, (error, result) => {
          if (error) reject(error);
          resolve(result);
        })
        .end(buffer);
    });

    return NextResponse.json({ url: uploadResult.secure_url });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
