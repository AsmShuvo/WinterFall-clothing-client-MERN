import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({ item }) => {
    const { name, size, price, image, category, _id } = item;
    return (
        <Link to={`/products/${_id}`} className="block transform transition-transform hover:scale-105">
            <div className="m-4">
                <div className="card card-compact bg-white shadow-lg rounded-lg overflow-hidden w-64">
                    <figure className="relative">
                        <img
                            className="w-full h-52 m-4 rounded-md object-cover"
                            src={image}
                            alt={name}
                        />
                        <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">{category}</span>
                    </figure>
                    <div className="card-body p-4">
                        <h2 className="card-title text-lg font-bold text-gray-800">{name}</h2>
                        <p className="text-sm text-gray-700">
                            <span className="font-semibold">Available Sizes:</span> {size?.map((s, index) => (
                                <span key={index} className="ml-1 text-gray-500">{s}</span>
                            ))}
                        </p>
                        <p className="font-bold text-lg text-blue-600 mt-2">${price}</p>
                        <div className="card-actions mt-4">
                            <button className="btn btn-accent text-white btn-sm w-full">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Item;