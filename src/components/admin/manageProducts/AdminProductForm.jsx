import { useState } from "react";
import axios from "axios";

function ProductForm({ onAddProduct }) {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    instock: false,
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // Optional: Show the uploaded file's name or preview
    if (file) {
      setNewProduct({
        ...newProduct,
        image: URL.createObjectURL(file), // Temporary local preview
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = newProduct.image;

    if (selectedFile) {
      // Prepare the file data for upload
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        // Upload the image to the backend using axios
        const response = await axios.post(
          "http://localhost:3000/admin/new/products",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        imageUrl = response.data.url; // Assuming backend returns { url: "image URL" }
      } catch (error) {
        console.error("Image upload failed:", error);
        return;
      }
    }

    // Send the product data to the parent component
    onAddProduct({ ...newProduct, image: imageUrl });

    // Reset the form fields
    setNewProduct({
      name: "",
      description: "",
      price: "",
      image: "",
      instock: false,
    });
    setSelectedFile(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-sm"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleInputChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="text"
          name="description"
          placeholder="Product Description"
          value={newProduct.description}
          onChange={handleInputChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="text"
          name="price"
          placeholder="Product Price"
          value={newProduct.price}
          onChange={handleInputChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="flex flex-col space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Product Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none"
          />
          <input
            type="text"
            name="image"
            placeholder="Or provide an image URL"
            value={newProduct.image}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="instock"
              checked={newProduct.instock}
              onChange={handleInputChange}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span>In Stock</span>
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="w-full md:w-auto bg-black text-white py-2 px-4 rounded hover:bg-primary-dark transition"
      >
        Add Product
      </button>
    </form>
  );
}

export default ProductForm;
