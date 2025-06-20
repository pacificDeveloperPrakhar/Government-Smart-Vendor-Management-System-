import { useState } from "react";
import { Star, ShoppingCart } from "lucide-react";
import  PurchaseForm  from "./PurchaseForm.jsx";

function ProductModal({ product, isOpen, onClose }) {
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);

  if (!product || !isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-2xl w-full p-6 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {!showPurchaseForm ? (
          <>
            <div className="mb-4">
              <h2 className="text-2xl font-bold">{product.name}</h2>
            </div>
            <div className="grid gap-4 py-4">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <img
                  src={
                    product.image ||
                    "https://images.unsplash.com/photo-1612178537253-bccd437b730e?w=800"
                  }
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < 4
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">(127 reviews)</span>
                  </div>
                  <span
                    className={`px-3 py-1 text-sm rounded ${
                      product.instock
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.instock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
                <p className="text-gray-600">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">
                    ${(product.price || 123.45).toFixed(2)}
                  </span>
                  <div className="flex gap-2">
                    <button
                      className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                    <button
                      className={`px-4 py-2 rounded text-white ${
                        product.instock
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-gray-400"
                      }`}
                      disabled={!product.instock}
                      onClick={() => setShowPurchaseForm(true)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2 inline" />
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <h2 className="text-2xl font-bold">Complete Your Purchase</h2>
            </div>
            <PurchaseForm
              product={product}
              onClose={() => {
                setShowPurchaseForm(false);
                onClose();
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default ProductModal;
