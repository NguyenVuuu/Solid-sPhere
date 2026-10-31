import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getFavoritesByUser, removeFavorite, countFavoritesByUser } from "../../apis/favoriteApi";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductCard from "../../components/product/ProductCard";

const Favorites = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoriteCount, setFavoriteCount] = useState(0);

  const getCurrentUserId = () => {
    try {
      const savedUser = localStorage.getItem("user");
      if (!savedUser) return null;
      const parsed = JSON.parse(savedUser);
      return parsed?.customerID ?? parsed?.id ?? parsed?.customerId ?? null;
    } catch {
      return null;
    }
  };

  const userId = getCurrentUserId();

  useEffect(() => {
    if (userId) {
      fetchFavorites();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const [data, count] = await Promise.all([
        getFavoritesByUser(userId),
        countFavoritesByUser(userId)
      ]);
      setFavorites(data || []);
      setFavoriteCount(count || 0);
    } catch {
      toast.error("Cannot load favorites");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (productId) => {
    try {
      await removeFavorite(userId, productId);
      setFavorites(favorites.filter((fav) => fav.productId !== productId));
      toast.success("Removed from favorites");
    } catch {
      toast.error("Cannot remove");
    }
  };

  if (!userId) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <FaHeart className="text-6xl text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Please login</h2>
          <p className="text-gray-500 mb-6">You need to login to view favorites</p>
          <button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Login now
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const convertFavoriteToProduct = (favorite) => ({
    productID: favorite.productId,
    productName: favorite.productName,
    price: favorite.productPrice,
    image: favorite.productImageUrl,
    inStock: true,
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="bg-gradient-to-r from-black via-gray-900 to-purple-950 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <FaHeart className="text-white text-3xl" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Favorite Products</h1>
              <p className="text-purple-300 text-lg">{favoriteCount} products saved</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600"></div>
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-32">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaHeart className="text-6xl text-gray-300" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-3">No favorite products yet</h3>
            <p className="text-gray-600 mb-8 text-lg">Start adding products to your favorites</p>
            <button
              onClick={() => navigate("/products")}
              className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              Explore Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {favorites.map((favorite) => (
              <div key={favorite.id} className="relative group">
                <button
                  onClick={() => handleRemoveFavorite(favorite.productId)}
                  className="absolute top-2 right-2 z-20 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-50 transition-all"
                  title="Remove from favorites"
                >
                  <FaHeart className="text-red-500 text-sm" />
                </button>
                <ProductCard product={convertFavoriteToProduct(favorite)} />
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Favorites;