// Updated PostJob => VendorPortalUpload.jsx
import React, { useState } from 'react';
import { Input } from "../input/input.jsx";
import { Label } from "../label/label.jsx";
import { cn } from "../../utils/clsx_util";
import { FaFileUpload } from 'react-icons/fa';
import axios from 'axios';

const VendorPortalUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [responseImageUrl, setResponseImageUrl] = useState(null);
  const [jsonResult, setJsonResult] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
    setResponseImageUrl(null);
    setJsonResult(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await axios.post("https://6b1f-35-197-71-199.ngrok-free.app/upload", formData, {
        responseType: 'blob',
      });

      //const json = JSON.parse(response.headers['x-detection-results']);
      //setJsonResult(json);

      const imgURL = URL.createObjectURL(response.data);
      setResponseImageUrl(imgURL);
    } catch (err) {
      console.log(err)
      setError("Failed to upload and get result");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-black rounded-xl p-6 shadow-lg my-6">
      <h2 className="text-center text-xl font-bold text-neutral-800 dark:text-neutral-200">Vendor Upload Portal</h2>

      <div className="mt-6">
        <Label htmlFor="image"><FaFileUpload className="inline mr-2" />Upload Product/Cart Image</Label>
        <Input type="file" name="image" id="image" onChange={handleImageChange} />
      </div>

      <button
        onClick={handleUpload}
        className="mt-4 bg-gradient-to-br from-blue-950 to-neutral-600 text-white rounded-md px-6 py-2 font-medium hover:opacity-90"
      >
        Submit for Detection
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {responseImageUrl && (
        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-2 text-neutral-700 dark:text-neutral-300">Detected Image:</h3>
          <img src={responseImageUrl} alt="Detection Result" className="w-full rounded" />
        </div>
      )}

      {jsonResult && (
        <div className="mt-4">
          <h3 className="font-semibold text-lg mb-2 text-neutral-700 dark:text-neutral-300">Detection JSON:</h3>
          <pre className="bg-neutral-100 dark:bg-neutral-800 text-sm p-4 rounded overflow-x-auto">
            {JSON.stringify(jsonResult, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default VendorPortalUpload;
