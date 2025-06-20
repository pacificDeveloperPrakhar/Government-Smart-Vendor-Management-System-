import React, { useState } from "react";
import axios from "axios";
import { Input } from "../../input/input.jsx";
import { Label } from "../../label/label.jsx";
import { base_route, profile_signup, profile_login } from "../../../info.jsx";
import { cn } from "../../../utils/clsx_util";
import { FcGoogle } from "react-icons/fc";
import { profileSchema } from "../../../utils/profileSchema.jsx";  
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction, addUserAction } from "../../../slices/userSlice.jsx";
import { useLocation } from "react-router-dom";
export default function Profile({ role }) {
  const dispatch = useDispatch();
  const [isLogin, setLogin] = useState(true);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  console.log(errors); // Logging errors for debugging

  const onSubmit = (e) => {
    e.preventDefault();

    let errors = {};

    // Validate first name and last name
    if (!isLogin&&!formData.first_name.trim()) {
      errors.first_name = "First name is required";
    }
    if (!isLogin&&!formData.last_name.trim()) {
      errors.last_name = "Last name is required";
    }
   if(!isLogin&&formData.first_name&&formData.last_name)
   {
    formData.fullName=formData.first_name+" "+formData.last_name;
   }
    // Validate email
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    // Validate phone number (only if signing up)
    if (!isLogin && !formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!isLogin&&(!/^[\+0-9]{10,15}$/.test(formData.phone))) {
      errors.phone = "Invalid phone number format";
    }

    // Validate password
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    // Validate confirm password (only if signing up)
    if (!isLogin) {
      if (!formData.confirmPassword.trim()) {
        errors.confirmPassword = "Confirm password is required";
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
    }

    // If errors exist, set them and prevent submission
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // Clear errors if validation passes
    setErrors({});

    // Proceed with form submission
    if (!isLogin) {
      dispatch(addUserAction(formData));
    } else {
      dispatch(loginUserAction(formData));
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black my-3">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center">
        {`Welcome ${isLogin ? "Back " : ""}to Vendorly`}
      </h2>

      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300 text-center">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <span className="text-blue-700 cursor-pointer font-medium" onClick={() => setLogin(!isLogin)}>
          {isLogin ? "Sign up" : "Log in"}
        </span>
      </p>

      <form className="my-8" onSubmit={onSubmit}>
      {!isLogin&&<div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="first_name">First Name</Label>
            <Input
              id="first_name"
              placeholder="prakhar"
              type="text"
              value={formData.first_name}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
            />
            {errors.first_name && <p className="text-red-500">{errors.first_name}</p>}
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              id="last_name"
              placeholder="vishwakarma"
              type="text"
              value={formData.last_name}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
            />
            {errors.last_name && <p className="text-red-500">{errors.last_name}</p>}
          </LabelInputContainer>
        </div>}

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Enter Your Adhar</Label>
          <Input
            id="email"
            placeholder="prakhar123@gmail.com"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </LabelInputContainer>

        {!isLogin && (
          <LabelInputContainer className="mb-4">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder="+1234567890"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            {errors.phone && <p className="text-red-500">{errors.phone}</p>}
          </LabelInputContainer>
        )}

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </LabelInputContainer>

        {!isLogin && (
          <LabelInputContainer className="mb-8">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              placeholder="••••••••"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
          </LabelInputContainer>
        )}

<button
          className="bg-gradient-to-br relative group/btn from-blue-950 dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          {isLogin ? "Log in" : "Sign up"} &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />


      </form>
    </div>
  );
}

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex flex-col space-y-2 w-full", className)}>
    {children}
  </div>
);
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};