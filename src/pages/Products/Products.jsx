import React, { useEffect, useState } from 'react';
import Item from '../Item/Item';

const Products = () => {
    const server_url = import.meta.env.VITE_SERVER_URL;
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortOrder, setSortOrder] = useState('none');
    const [selectedSize, setSelectedSize] = useState('All');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${server_url}/products`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        let updatedProducts = [...products];

        // Filter by category
        if (selectedCategory !== 'All') {
            updatedProducts = updatedProducts.filter(
                (item) => item.category === selectedCategory
            );
        }

        // Sort by price
        if (sortOrder === 'lowToHigh') {
            updatedProducts.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'highToLow') {
            updatedProducts.sort((a, b) => b.price - a.price);
        }

        // Filter by size
        if (selectedSize !== 'All') {
            updatedProducts = updatedProducts.filter(
                (item) => item.size === selectedSize
            );
        }

        setFilteredProducts(updatedProducts);
    }, [selectedCategory, sortOrder, selectedSize, products]);

    return (
        <div className="flex px-16 py-8 bg-gray-100 min-h-screen">
            {/* Left Sidebar */}
            <div className="w-1/4 p-4 bg-white shadow-lg rounded-lg">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Categories</h2>
                <button
                    className={`block w-full mb-2 p-2 rounded ${selectedCategory === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                        }`}
                    onClick={() => setSelectedCategory('All')}
                >
                    All
                </button>
                <button
                    className={`block w-full mb-2 p-2 rounded ${selectedCategory === 'Male' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                        }`}
                    onClick={() => setSelectedCategory('Male')}
                >
                    Men's Collection
                </button>
                <button
                    className={`block w-full mb-2 p-2 rounded ${selectedCategory === 'Female' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                        }`}
                    onClick={() => setSelectedCategory('Female')}
                >
                    Women's Collection
                </button>
                <button
                    className={`block w-full mb-2 p-2 rounded ${selectedCategory === 'Kids' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                        }`}
                    onClick={() => setSelectedCategory('Kids')}
                >
                    Kids' Collection
                </button>

                <h2 className="text-xl font-bold mt-6 mb-4 text-gray-800">Sort by Price</h2>
                <button
                    className={`block w-full mb-2 p-2 rounded ${sortOrder === 'lowToHigh' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                        }`}
                    onClick={() => setSortOrder('lowToHigh')}
                >
                    Low to High
                </button>
                <button
                    className={`block w-full mb-2 p-2 rounded ${sortOrder === 'highToLow' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                        }`}
                    onClick={() => setSortOrder('highToLow')}
                >
                    High to Low
                </button>

                <h2 className="text-xl font-bold mt-6 mb-4 text-gray-800">Filter by Size</h2>
                <button
                    className={`block w-full mb-2 p-2 rounded ${selectedSize === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                        }`}
                    onClick={() => setSelectedSize('All')}
                >
                    All Sizes
                </button>
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <button
                        key={size}
                        className={`block w-full mb-2 p-2 rounded ${selectedSize === size ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                            }`}
                        onClick={() => setSelectedSize(size)}
                    >
                        {size}
                    </button>
                ))}
            </div>

            {/* Main Content */}
            <div className="w-3/4 p-4">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Products</h2>
                <div className="grid grid-cols-3 gap-6">
                    {filteredProducts.map((item) => (
                        <Item item={item} key={item.id_no} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;