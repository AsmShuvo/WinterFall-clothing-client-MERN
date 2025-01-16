import React from 'react';

const Banner = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                    filter: 'blur(5px)',
                }}
            ></div>

            {/* Text Section */}
            <div className="relative z-10 text-center p-6 md:p-12 bg-gray-300 bg-opacity-70 rounded-lg shadow-lg">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-950 mb-4">
                    Welcome to Winterfall
                </h1>
                <p className="text-lg md:text-xl font-mono text-gray-600">
                    Your ultimate destination for winter fashion — Men, Women, and Children
                </p>
            </div>
        </div>
    );
};

export default Banner;