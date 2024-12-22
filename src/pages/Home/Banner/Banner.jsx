import React from 'react';

const Banner = () => {
    return (
        <div className="banner-container flex flex-col md:flex-row items-center bg-white shadow-lg p-6 md:p-12">
            {/* Text Section */}
            <div className="banner-text flex-grow text-center md:text-left md:pr-6">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                    Welcome to Winterfall
                </h1>
                <p className="text-lg md:text-xl text-gray-600">
                    Your ultimate destination for winter fashion — Men, Women, and Children
                </p>
            </div>
            {/* Image Section */}
            <div className="mt-6 md:mt-0">
                <img
                    src="../../../../public/images/banner-wintefall.png"
                    alt="Winterfall Banner"
                    className="banner-image max-w-full h-auto rounded-lg"
                />
            </div>
        </div>
    );
};

export default Banner;
