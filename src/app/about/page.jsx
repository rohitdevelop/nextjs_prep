"use client";

import React, { useState,useRef } from "react";
import Image from "next/image";

const TitleUpdater = () => {
  const [search, setSearch] = useState("");
 let ref = useRef(0);

  function handleClick() {
 ref.current = ref.current + 1;
 alert("click is "+ ref.current)
  }
  let cards = [
    { id: 1, name: "Mountain Landscape", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop" },
    { id: 2, name: "Ocean Sunset", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop" },
    { id: 3, name: "Forest Path", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop" },
    { id: 4, name: "City Skyline", image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop" },
    { id: 5, name: "Desert Dunes", image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop" },
    { id: 6, name: "Snowy Mountains", image: "https://d7aqjcds6mrq5.cloudfront.net/tylTravelGroup/2/983eac5a-23be-4b1f-af1c-791d6931f760_IMG_1.jpg" },
    { id: 7, name: "Tropical Beach", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop" },
    { id: 8, name: "Northern Lights", image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&h=300&fit=crop" },
    { id: 9, name: "Cherry Blossoms", image: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400&h=300&fit=crop" },
    { id: 10, name: "Autumn Forest", image: "https://images.unsplash.com/photo-1507041957456-9c397ce39c97?w=400&h=300&fit=crop" },
  ];

  // Filter cards based on search text
  const filteredCards = cards.filter((card) =>
    card.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-purple-900 via-black to-black text-white p-10">
       <button onClick={handleClick}>
      Click me!
    </button>
      <h1 className="text-3xl font-bold mb-6">Search Images</h1>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search images..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-80 h-14 mb-10 px-4 rounded-md bg-amber-50 text-black"
      />

      {/* Images */}
      <div className="flex gap-6 flex-wrap justify-center">
        {filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <div className="m-4 text-center" key={card.id}>
              <h2 className="mb-2 text-lg font-semibold">{card.name}</h2>
              <Image
                src={card.image}
                alt={card.name}
                width={400}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </div>
          ))
        ) : (
          <p className="text-gray-400">No images found...</p>
        )}
      </div>
    </div>
  );
};

export default TitleUpdater;
