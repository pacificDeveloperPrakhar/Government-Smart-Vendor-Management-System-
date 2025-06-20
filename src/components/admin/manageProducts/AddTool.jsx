import React, { useState } from "react";
import { products as initialProducts } from "../../../temp/productData";

function AddTool({ onAddProduct }) {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    image: "",
    instock: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const addProduct = (e) => {
    e.preventDefault();
    onAddProduct(newProduct);
    setNewProduct({ name: "", description: "", image: "", instock: false });
  };

  return (
    <form onSubmit={addProduct} className="mb-6">
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={newProduct.name}
        onChange={handleInputChange}
        required
        className="border p-2 rounded mr-2"
      />
      <input
        type="text"
        name="description"
        placeholder="Product Description"
        value={newProduct.description}
        onChange={handleInputChange}
        required
        className="border p-2 rounded mr-2"
      />
      <input
        type="text"
        name="image"
        placeholder="Product Image"
        value={newProduct.image}
        onChange={handleInputChange}
        required
        className="border p-2 rounded mr-2"
      />
      <label className="mr-2">
        In Stock:
        <input
          type="checkbox"
          name="instock"
          checked={newProduct.instock}
          onChange={handleInputChange}
          className="ml-1"
        />
      </label>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Product
      </button>
    </form>
  );
}

export default AddTool;
