import React from 'react';

import Lottie from "lottie-react";
import { Link } from "react-router";
import err from '../../public/blue.json';

const NotFoundError = () => {
    return (
        <div>
              <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <Lottie animationData={err} loop={true}></Lottie>
        <h1 className="text-3xl font-bold">Page Not Found</h1>
        <p className="text-center w-11/12 mx-auto">
          Sorry,the page you are looking for doesn't exist or has been moved
        </p>
        <Link to="/" className="btn tom-btn">
          Back to Home
        </Link>
      </div>
    </div>
        </div>
    );
};

export default NotFoundError;