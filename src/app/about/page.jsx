"use client";
import React, { useState, useRef, useEffect, useCallback, useMemo, useReducer } from "react";
import Image from "next/image";

// Reducer for managing favorites
const favoritesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return [...state, action.payload];
    case 'REMOVE_FAVORITE':
      return state.filter(id => id !== action.payload);
    case 'CLEAR_ALL':
      return [];
    default:
      return state;
  }
};

const TitleUpdater = () => {
  const [search, setSearch] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [sortBy, setSortBy] = useState("name"); // name, id
  const [theme, setTheme] = useState("dark");
  const [isLoading, setIsLoading] = useState(false);
  const [clickHistory, setClickHistory] = useState([]);
  
  // useReducer for managing favorites
  const [favorites, dispatchFavorites] = useReducer(favoritesReducer, []);
  
  // useRef hooks
  const clickCountRef = useRef(0);
  const searchInputRef = useRef(null);
  const lastSearchTimeRef = useRef(0);
  const observerRef = useRef(null);

  const cards = [
    { id: 1, name: "Mountain Landscape", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop", category: "nature" },
    { id: 2, name: "Ocean Sunset", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop", category: "nature" },
    { id: 3, name: "Forest Path", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop", category: "nature" },
    { id: 4, name: "City Skyline", image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop", category: "urban" },
    { id: 5, name: "Desert Dunes", image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop", category: "nature" },
    { id: 6, name: "Snowy Mountains", image: "https://d7aqjcds6mrq5.cloudfront.net/tylTravelGroup/2/983eac5a-23be-4b1f-af1c-791d6931f760_IMG_1.jpg", category: "nature" },
    { id: 7, name: "Tropical Beach", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop", category: "nature" },
    { id: 8, name: "Northern Lights", image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&h=300&fit=crop", category: "nature" },
    { id: 9, name: "Cherry Blossoms", image: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400&h=300&fit=crop", category: "nature" },
    { id: 10, name: "Autumn Forest", image: "https://images.unsplash.com/photo-1507041957456-9c397ce39c97?w=400&h=300&fit=crop", category: "nature" },
  ];

  // useEffect for document title update
  useEffect(() => {
    document.title = `Image Gallery - ${filteredCards.length} images found`;
    return () => {
      document.title = "Image Gallery";
    };
  }, [search]);

  // useEffect for keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setSelectedCard(null);
        setSearch("");
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  // useEffect for search history tracking
  useEffect(() => {
    if (search.trim()) {
      const now = Date.now();
      if (now - lastSearchTimeRef.current > 1000) { // Debounce 1 second
        setClickHistory(prev => [...prev.slice(-9), { term: search, timestamp: now }]);
        lastSearchTimeRef.current = now;
      }
    }
  }, [search]);

  // useCallback for optimized functions
  const handleClick = useCallback(() => {
    clickCountRef.current += 1;
    alert(`Click count: ${clickCountRef.current}`);
  }, []);

  const handleCardClick = useCallback((card) => {
    setSelectedCard(card);
    setClickHistory(prev => [...prev.slice(-9), { 
      term: `Clicked: ${card.name}`, 
      timestamp: Date.now() 
    }]);
  }, []);

  const toggleFavorite = useCallback((cardId) => {
    if (favorites.includes(cardId)) {
      dispatchFavorites({ type: 'REMOVE_FAVORITE', payload: cardId });
    } else {
      dispatchFavorites({ type: 'ADD_FAVORITE', payload: cardId });
    }
  }, [favorites]);

  const clearAllFavorites = useCallback(() => {
    dispatchFavorites({ type: 'CLEAR_ALL' });
  }, []);

  const simulateLoading = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  // useMemo for expensive computations
  const filteredAndSortedCards = useMemo(() => {
    let filtered = cards.filter((card) =>
      card.name.toLowerCase().includes(search.toLowerCase())
    );
    
    return filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return a.id - b.id;
    });
  }, [search, sortBy]);

  const favoriteCards = useMemo(() => {
    return cards.filter(card => favorites.includes(card.id));
  }, [favorites]);

  const stats = useMemo(() => ({
    total: cards.length,
    filtered: filteredAndSortedCards.length,
    favorites: favorites.length,
    categories: [...new Set(cards.map(card => card.category))].length
  }), [filteredAndSortedCards.length, favorites.length]);

  const filteredCards = filteredAndSortedCards;

  const themeClasses = theme === "dark" 
    ? "bg-gradient-to-br from-purple-900 via-black to-black text-white"
    : "bg-gradient-to-br from-blue-100 via-white to-purple-100 text-gray-900";

  return (
    <div className={`flex flex-col items-center min-h-screen ${themeClasses} p-10 transition-all duration-300`}>
      {/* Header Controls */}
      <div className="w-full max-w-6xl mb-8">
        <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Enhanced Image Gallery</h1>
          
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            {theme === "dark" ? "☀️" : "🌙"} Toggle Theme
          </button>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-opacity-20 bg-white backdrop-blur-sm">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-sm opacity-75">Total Images</div>
          </div>
          <div className="p-4 rounded-lg bg-opacity-20 bg-white backdrop-blur-sm">
            <div className="text-2xl font-bold">{stats.filtered}</div>
            <div className="text-sm opacity-75">Filtered Results</div>
          </div>
          <div className="p-4 rounded-lg bg-opacity-20 bg-white backdrop-blur-sm">
            <div className="text-2xl font-bold">{stats.favorites}</div>
            <div className="text-sm opacity-75">Favorites</div>
          </div>
          <div className="p-4 rounded-lg bg-opacity-20 bg-white backdrop-blur-sm">
            <div className="text-2xl font-bold">{stats.categories}</div>
            <div className="text-sm opacity-75">Categories</div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="flex flex-wrap gap-4 justify-center items-center mb-6">
          <button 
            onClick={handleClick}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Click Counter ({clickCountRef.current})
          </button>
          
          <button 
            onClick={simulateLoading}
            disabled={isLoading}
            className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:opacity-50 transition-colors"
          >
            {isLoading ? "Loading..." : "Simulate Loading"}
          </button>

          <button 
            onClick={clearAllFavorites}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Clear Favorites
          </button>

          {/* View Mode Toggle */}
          <select 
            value={viewMode} 
            onChange={(e) => setViewMode(e.target.value)}
            className="px-4 py-2 rounded-md bg-gray-700 text-white"
          >
            <option value="grid">Grid View</option>
            <option value="list">List View</option>
          </select>

          {/* Sort Options */}
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-md bg-gray-700 text-white"
          >
            <option value="name">Sort by Name</option>
            <option value="id">Sort by ID</option>
          </select>
        </div>

        {/* Search Box */}
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search images... (Ctrl + / to focus, Esc to clear)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md h-14 mb-6 px-4 rounded-md bg-amber-50 text-black mx-auto block"
        />
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg text-black">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Loading images...</p>
          </div>
        </div>
      )}

      {/* Images */}
      <div className="w-full max-w-7xl">
        {filteredCards.length > 0 ? (
          <div className={viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
            : "flex flex-col gap-4"
          }>
            {filteredCards.map((card) => (
              <div 
                className={`text-center cursor-pointer transform transition-all duration-200 hover:scale-105 ${
                  viewMode === "list" ? "flex items-center gap-4 p-4 rounded-lg bg-opacity-10 bg-white" : "p-4"
                }`} 
                key={card.id}
                onClick={() => handleCardClick(card)}
              >
                <div className={viewMode === "list" ? "flex-shrink-0" : ""}>
                  <Image
                    src={card.image}
                    alt={card.name}
                    width={viewMode === "list" ? 100 : 400}
                    height={viewMode === "list" ? 75 : 300}
                    className="rounded-lg shadow-lg"
                  />
                </div>
                <div className={viewMode === "list" ? "flex-1 text-left" : "mt-2"}>
                  <h2 className="text-lg font-semibold">{card.name}</h2>
                  <p className="text-sm opacity-75 capitalize">Category: {card.category}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(card.id);
                    }}
                    className={`mt-2 px-3 py-1 rounded-md text-sm transition-colors ${
                      favorites.includes(card.id) 
                        ? "bg-red-600 text-white" 
                        : "bg-gray-600 text-white hover:bg-gray-700"
                    }`}
                  >
                    {favorites.includes(card.id) ? "❤️ Favorited" : "🤍 Add to Favorites"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center">No images found...</p>
        )}
      </div>

      {/* Favorites Section */}
      {favoriteCards.length > 0 && (
        <div className="w-full max-w-7xl mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Your Favorites ❤️</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {favoriteCards.map((card) => (
              <div key={card.id} className="text-center">
                <Image
                  src={card.image}
                  alt={card.name}
                  width={150}
                  height={112}
                  className="rounded-lg shadow-lg mx-auto"
                />
                <p className="text-sm mt-2">{card.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Activity */}
      {clickHistory.length > 0 && (
        <div className="w-full max-w-2xl mt-12">
          <h3 className="text-xl font-bold mb-4 text-center">Recent Activity</h3>
          <div className="bg-opacity-10 bg-white rounded-lg p-4">
            {clickHistory.slice(-5).reverse().map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-600 last:border-b-0">
                <span className="text-sm">{item.term}</span>
                <span className="text-xs opacity-75">
                  {new Date(item.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal for Selected Card */}
      {selectedCard && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedCard(null)}
        >
          <div 
            className="bg-white p-8 rounded-lg max-w-2xl max-h-screen overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-black">{selectedCard.name}</h2>
              <button 
                onClick={() => setSelectedCard(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <Image
              src={selectedCard.image}
              alt={selectedCard.name}
              width={600}
              height={450}
              className="rounded-lg shadow-lg w-full"
            />
            <div className="mt-4 text-black">
              <p><strong>Category:</strong> {selectedCard.category}</p>
              <p><strong>ID:</strong> {selectedCard.id}</p>
              <button
                onClick={() => toggleFavorite(selectedCard.id)}
                className={`mt-4 px-4 py-2 rounded-md transition-colors ${
                  favorites.includes(selectedCard.id) 
                    ? "bg-red-600 text-white" 
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {favorites.includes(selectedCard.id) ? "Remove from Favorites" : "Add to Favorites"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TitleUpdater;