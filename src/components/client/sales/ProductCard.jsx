import { Star } from "lucide-react";
// import { ProductCard as AdminProductCard } from "../../admin/manageProducts/AdminProductCard";

function ProductCard({ product, onClick }) {
  return (
    <div
      className="group bg-white/60 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name || "Product Image"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!product.instock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-lg px-4 py-2 bg-red-500 text-white rounded-full">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      <div className="p-4 bg-gradient-to-b from-indigo-50/50 to-white">
        <h3 className="text-lg font-semibold truncate text-gray-800">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 truncate mt-1">
          {product.description}
        </p>
      </div>
      <div className="p-4 pt-0 flex justify-between items-center bg-white">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium text-gray-700">4.5</span>
        </div>
        <span className="font-semibold text-indigo-600">
          ${(product.price || 123.45).toFixed(2)}
        </span>
      </div>
    </div>
  );
}
export default ProductCard;
