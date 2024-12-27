import React, { useEffect, useState } from 'react';
import Item from '../Item/Item';

const Products = () => {
    const server_ur = import.meta.env.VITE_SERVER_URL;
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortOrder, setSortOrder] = useState('none');
    const [selectedSize, setSelectedSize] = useState('All');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${server_ur}/products`); // Fetch data from public folder
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

        setFilteredProducts(updatedProducts);
    }, [selectedCategory, sortOrder, selectedSize, products]);

    return (
        <div className="flex px-16 py-4">
            {/* Left Sidebar */}
            <div className="w-1/4 p-4">
                <h2 className="text-lg font-bold mb-4">Categories</h2>
                <button
                    className={`block w-full mb-2 p-2 ${selectedCategory === 'All' ? 'bg-gray-200' : ''
                        }`}
                    onClick={() => setSelectedCategory('All')}
                >
                    All
                </button>
                <button
                    className={`block w-full mb-2 p-2 ${selectedCategory === 'Male' ? 'bg-gray-200' : ''
                        }`}
                    onClick={() => setSelectedCategory('Male')}
                >
                    Men's Collection
                </button>
                <button
                    className={`block w-full mb-2 p-2 ${selectedCategory === 'Female' ? 'bg-gray-200' : ''
                        }`}
                    onClick={() => setSelectedCategory('Female')}
                >
                    Women's Collection
                </button>
                <button
                    className={`block w-full mb-2 p-2 ${selectedCategory === 'Kids' ? 'bg-gray-200' : ''
                        }`}
                    onClick={() => setSelectedCategory('Kids')}
                >
                    Kids' Collection
                </button>

                <h2 className="text-lg font-bold mt-6 mb-4">Sort by Price</h2>
                <button
                    className={`block w-full mb-2 p-2 ${sortOrder === 'lowToHigh' ? 'bg-gray-200' : ''
                        }`}
                    onClick={() => setSortOrder('lowToHigh')}
                >
                    Low to High
                </button>
                <button
                    className={`block w-full mb-2 p-2 ${sortOrder === 'highToLow' ? 'bg-gray-200' : ''
                        }`}
                    onClick={() => setSortOrder('highToLow')}
                >
                    High to Low
                </button>

                <h2 className="text-lg font-bold mt-6 mb-4">Filter by Size</h2>
                <button
                    className={`block w-full mb-2 p-2 ${selectedSize === 'All' ? 'bg-gray-200' : ''
                        }`}
                    onClick={() => setSelectedSize('All')}
                >
                    All Sizes
                </button>
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <button
                        key={size}
                        className={`block w-full mb-2 p-2 ${selectedSize === size ? 'bg-gray-200' : ''
                            }`}
                        onClick={() => setSelectedSize(size)}
                    >
                        {size}
                    </button>
                ))}
            </div>

            {/* Main Content */}
            <div className="w-3/4 p-4">
                <h2 className="text-lg font-bold mb-4">Products</h2>
                <div className="grid grid-cols-3 gap-4">
                    {filteredProducts.map((item) => (
                        <Item item={item} key={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;
