function ProductCard({ product, onToggleStock, onRemove }) {
  return (
    <div className="flex flex-col h-full border rounded-lg shadow-sm">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4 flex-grow">
        <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <p className="text-gray-800 font-semibold mt-2">
          Price: ${product.price}
        </p>
        <div className="mt-4">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              product.instock
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {product.instock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <button
            onClick={() => onToggleStock(product)}
            className={`flex-1 py-2 px-4 text-sm font-medium text-white rounded ${
              product.instock
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {product.instock ? "Mark Out of Stock" : "Mark In Stock"}
          </button>
          <button
            onClick={() => onRemove(product)}
            className="py-2 px-4 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
