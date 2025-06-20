import React from 'react';
import { createPortal } from 'react-dom';
import { Outlet, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function MaskedRoutes() {
  const available = useSelector(state => state?.user?.verification_details?.isVerified);

  return (
    <>
      <Outlet />
      {!available && createPortal(<MaskedFeature />, document.body)}
    </>
  );
}

function MaskedFeature() {
  return (
    <div className="absolute h-full w-full inset-0 backdrop-blur-lg flex justify-center items-center">
      <div 
        className="bg-white p-8 rounded-lg shadow-2xl text-center cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => { window.location.href = "/registration/human_resource"; }}
      >
        <h1 className="text-xl font-semibold text-gray-800 mb-4">
          Login to access the feature
        </h1>
        <Link
          to="/registration/human_resource"
          className="inline-block bg-blue-950 text-white px-6 py-2 rounded-md hover:bg-black transition-colors"
        >
          Go to Registration
        </Link>
      </div>
    </div>
  );
}