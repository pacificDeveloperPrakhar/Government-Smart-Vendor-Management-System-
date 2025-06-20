import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";
function PurchaseForm({ product, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      quantity: 1,
      notes: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const payload = {
        product: product.name,
        totalPrice: (product.price || 0) * data.quantity,
        ...data,
      };

      const response = await axios.post(
        "http://localhost:3000/toolsell/tools-sell-purchase-notification",
        payload,
        { withCredentials: true }
      );
      // console.log("Order submitted successfully:", response.data);
      toast.success("Order placed successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          placeholder="John Doe"
          {...register("fullName", {
            required: "Full Name is required",
            minLength: 2,
          })}
          className={`w-full mt-1 p-2 border rounded ${
            errors.fullName ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.fullName && (
          <p className="text-sm text-red-500">{errors.fullName.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="john@example.com"
            {...register("email", {
              required: "Email is required",
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
            className={`w-full mt-1 p-2 border rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="text"
            placeholder="+1 (555) 000-0000"
            {...register("phone", {
              required: "Phone number is required",
              minLength: 10,
            })}
            className={`w-full mt-1 p-2 border rounded ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Delivery Address
        </label>
        <textarea
          placeholder="Enter your complete delivery address"
          {...register("address", {
            required: "Address is required",
            minLength: 10,
          })}
          className={`w-full mt-1 p-2 border rounded ${
            errors.address ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.address && (
          <p className="text-sm text-red-500">{errors.address.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Quantity
        </label>
        <input
          type="number"
          min={1}
          max={10}
          {...register("quantity", {
            required: "Quantity is required",
            min: 1,
            max: 10,
          })}
          className={`w-full mt-1 p-2 border rounded ${
            errors.quantity ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.quantity && (
          <p className="text-sm text-red-500">{errors.quantity.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Additional Notes (Optional)
        </label>
        <textarea
          placeholder="Any special instructions for your order?"
          {...register("notes")}
          className="w-full mt-1 p-2 border rounded border-gray-300"
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`px-4 py-2 rounded text-white ${
            isSubmitting ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </form>
  );
}

export default PurchaseForm;
