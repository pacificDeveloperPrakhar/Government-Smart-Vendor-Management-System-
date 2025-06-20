import { useEffect, useState } from "react";
import { AdminProductForm, AdminProductCard } from "../../components/index.js";
import axios from "axios";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/admin/all/products",
          { withCredentials: true }
        );
        setProducts(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError(
            "❌ You are not authorized to view this page. Please log in."
          );
        } else {
          setError("❌ Something went wrong. Please try again later.");
        }
      }
    };

    fetchProducts();
  }, []);

  // Add a new product
  const handleAddProduct = async (newProduct) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/admin/new/products",
        newProduct,
        { withCredentials: true }
      );
      setProducts([...products, response.data]);
    } catch (error) {
      setError("❌ Error adding product. Please try again.");
    }
  };

  // Delete a product
  const handleRemove = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:3000/admin/delete/products/${productId}`,
        { withCredentials: true }
      );
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      setError("❌ Error deleting product. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Manage Products
        </h2>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Add Product Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Add New Product
          </h3>
          <AdminProductForm onAddProduct={handleAddProduct} />
        </div>

        {/* Product List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <AdminProductCard
              key={product.id || index}
              product={product}
              onRemove={() => handleRemove(product.id)}
            />
          ))}
        </div>

        {/* No Products Message */}
        {products.length === 0 && !error && (
          <p className="text-gray-600 text-center mt-8">No products found.</p>
        )}
      </div>
    </div>
  );
}

export default ManageProducts;
