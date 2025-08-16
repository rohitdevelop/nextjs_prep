"use client"

import React from 'react';
import Link from "next/link";
function Navbar() {
  return (
    <div className="w-full h-16 bg-gray-800 text-white flex items-center justify-between px-4">
      <div className="text-xl font-bold">MyLogo</div>

      <ul className="flex gap-6">
        <Link href={"/"}> <li className="hover:text-gray-400 cursor-pointer">Home</li> </Link>
        <Link  href={"/about"}><li className="hover:text-gray-400 cursor-pointer">About</li> </Link>
        <Link href={"/contact"}> <li className="hover:text-gray-400 cursor-pointer">Contact</li> </Link>
        <Link href={"/product"}> <li className="hover:text-gray-400 cursor-pointer">Product</li> </Link>
      </ul>
    </div>
  );
}

export default Navbar;
