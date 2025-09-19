"use client";
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useReducer,
} from "react";
import Image from "next/image";

// Reducer for favorites
const favoritesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FAVORITE":
      return [...state, action.payload];
    case "REMOVE_FAVORITE":
      return state.filter((id) => id !== action.payload);
    case "CLEAR_ALL":
      return [];
    default:
      return state;
  }
};

const TitleUpdater = () => {
  const [search, setSearch] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("name");
  const [theme, setTheme] = useState("dark");
  const [isLoading, setIsLoading] = useState(false);
  const [clickHistory, setClickHistory] = useState([]);
  const [clickCount, setClickCount] = useState(0);

  const [favorites, dispatchFavorites] = useReducer(favoritesReducer, []);

  const searchInputRef = useRef(null);
  const lastSearchTimeRef = useRef(0);

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

  // 🔹 Persist theme in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // 🔹 Update document title
  useEffect(() => {
    document.title = `Image Gallery - ${filteredCards.length} images found`;
    return () => (document.title = "Image Gallery");
  }, [search]);

  // 🔹 Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === "/") searchInputRef.current?.focus();
      if (e.key === "Escape") {
        setSelectedCard(null);
        setSearch("");
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  // 🔹 Track search history with debounce
  useEffect(() => {
    if (search.trim()) {
      const now = Date.now();
      if (now - lastSearchTimeRef.current > 1000) {
        setClickHistory((prev) => [
          ...prev.slice(-9),
          { term: search, timestamp: now },
        ]);
        lastSearchTimeRef.current = now;
      }
    }
  }, [search]);

  // 🔹 Handlers
  const handleClick = useCallback(() => setClickCount((c) => c + 1), []);

  const handleCardClick = useCallback((card) => {
    setSelectedCard(card);
    setClickHistory((prev) => [
      ...prev.slice(-9),
      { term: `Clicked: ${card.name}`, timestamp: Date.now() },
    ]);
  }, []);

  const toggleFavorite = useCallback(
    (cardId) => {
      dispatchFavorites({
        type: favorites.includes(cardId) ? "REMOVE_FAVORITE" : "ADD_FAVORITE",
        payload: cardId,
      });
    },
    [favorites]
  );

  const simulateLoading = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  // 🔹 useMemo optimizations
  const filteredCards = useMemo(() => {
    return cards
      .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => (sortBy === "name" ? a.name.localeCompare(b.name) : a.id - b.id));
  }, [search, sortBy]);

  const favoriteCards = useMemo(
    () => cards.filter((c) => favorites.includes(c.id)),
    [favorites]
  );

  const stats = useMemo(
    () => ({
      total: cards.length,
      filtered: filteredCards.length,
      favorites: favorites.length,
      categories: new Set(cards.map((c) => c.category)).size,
    }),
    [filteredCards, favorites]
  );

  const themeClasses =
    theme === "light"
      ? "bg-gradient-to-br from-blue-100 via-white to-purple-100 text-gray-900"
      : "bg-gradient-to-br from-purple-900 via-black to-black text-white";

  return (
    <div className={`flex flex-col items-center min-h-screen ${themeClasses} p-10 transition-all`}>
      {/* Header */}
      <div className="w-full max-w-6xl mb-8">
        <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Enhanced Image Gallery</h1>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {Object.entries(stats).map(([k, v]) => (
            <div key={k} className="p-4 rounded-lg bg-opacity-20 bg-white backdrop-blur-sm text-black">
              <div className="text-2xl font-bold">{v}</div>
              <div className="text-sm opacity-75 capitalize">{k}</div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 justify-center items-center mb-6">
          <button
            onClick={handleClick}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Click Counter ({clickCount})
          </button>
          <button
            onClick={simulateLoading}
            disabled={isLoading}
            className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:opacity-50"
          >
            {isLoading ? "Loading..." : "Simulate Loading"}
          </button>
          <button
            onClick={() => dispatchFavorites({ type: "CLEAR_ALL" })}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Clear Favorites
          </button>

          {/* View Mode */}
          <select value={viewMode} onChange={(e) => setViewMode(e.target.value)} className="px-4 py-2 rounded-md bg-gray-700 text-white">
            <option value="grid">Grid View</option>
            <option value="list">List View</option>
          </select>

          {/* Sort */}
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2 rounded-md bg-gray-700 text-white">
            <option value="name">Sort by Name</option>
            <option value="id">Sort by ID</option>
          </select>
        </div>

        {/* Search */}
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search images... (Ctrl + / to focus, Esc to clear)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md h-14 mb-6 px-4 rounded-md bg-amber-50 text-black mx-auto block"
        />
      </div>

      {/* Loading */}
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
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "flex flex-col gap-4"
            }
          >
            {filteredCards.map((card) => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card)}
                className={`cursor-pointer transition transform hover:scale-105 ${
                  viewMode === "list" ? "flex items-center gap-4 p-4 bg-opacity-10 bg-white rounded-lg" : "p-4"
                }`}
              >
                <Image
                  src={card.image}
                  alt={card.name}
                  width={viewMode === "list" ? 100 : 400}
                  height={viewMode === "list" ? 75 : 300}
                  className="rounded-lg shadow-lg"
                />
                <div className={viewMode === "list" ? "flex-1 text-left" : "mt-2 text-center"}>
                  <h2 className="text-lg font-semibold">{card.name}</h2>
                  <p className="text-sm opacity-75 capitalize">Category: {card.category}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(card.id);
                    }}
                    className={`mt-2 px-3 py-1 rounded-md text-sm ${
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

      {/* Favorites */}
      {favoriteCards.length > 0 && (
        <div className="w-full max-w-7xl mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Your Favorites ❤️</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {favoriteCards.map((card) => (
              <div key={card.id} className="text-center">
                <Image src={card.image} alt={card.name} width={150} height={112} className="rounded-lg shadow-lg mx-auto" />
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
            {clickHistory.slice(-5).reverse().map((item, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-gray-600 last:border-b-0">
                <span className="text-sm">{item.term}</span>
                <span className="text-xs opacity-75">{new Date(item.timestamp).toLocaleTimeString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setSelectedCard(null)}>
          <div className="bg-white p-8 rounded-lg max-w-2xl max-h-screen overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-black">{selectedCard.name}</h2>
              <button onClick={() => setSelectedCard(null)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
            </div>
            <Image src={selectedCard.image} alt={selectedCard.name} width={600} height={450} className="rounded-lg shadow-lg w-full" />
            <div className="mt-4 text-black">
              <p><strong>Category:</strong> {selectedCard.category}</p>
              <p><strong>ID:</strong> {selectedCard.id}</p>
              <button
                onClick={() => toggleFavorite(selectedCard.id)}
                className={`mt-4 px-4 py-2 rounded-md ${
                  favorites.includes(selectedCard.id) ? "bg-red-600 text-white" : "bg-blue-600 text-white hover:bg-blue-700"
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
