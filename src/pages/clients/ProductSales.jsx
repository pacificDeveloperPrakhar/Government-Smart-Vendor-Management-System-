import { useState } from "react";
import { products } from "../../temp/productData";
import { Search } from "lucide-react";
import { ProductCard, ProductModal } from "../../components/index.js";

function ProductSales() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [showOutOfStock, setShowOutOfStock] = useState(true);

  const filteredProducts = products
    .filter((product) => {
      if (!showOutOfStock && !product.instock) return false;
      return (
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "instock")
        return (b.instock ? 1 : 0) - (a.instock ? 1 : 0);
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-2">
          Precision Measurement Tools
        </h1>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Browse our collection of high-quality vernier calipers and measurement
          instruments
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Search products..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-[180px] border border-gray-300 rounded-md py-2 px-3"
            >
              <option value="name">Name</option>
              <option value="instock">Availability</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            onClick={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

export default ProductSales;
