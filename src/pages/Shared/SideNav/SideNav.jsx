import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaHome, FaBoxOpen, FaPlus, FaTrash, FaEdit, FaShoppingCart } from 'react-icons/fa';

const SideNav = () => {
    return (
        <nav className="w-64 bg-gray-800 text-white h-screen p-4">
            <ul className="space-y-4">
                <li>
                    <NavLink to="/" className="flex items-center p-2 hover:bg-gray-700 rounded" title="Home">
                        <FaHome className="mr-3" /> <span>Home</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/products" className="flex items-center p-2 hover:bg-gray-700 rounded" title="Products">
                        <FaBoxOpen className="mr-3" /> <span>Products</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/dashboard/orders" className="flex items-center p-2 hover:bg-gray-700 rounded" title="Orders">
                        <FaShoppingCart className="mr-3" /> <span>Orders</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/add-item" className="flex items-center p-2 hover:bg-gray-700 rounded" title="Add Item">
                        <FaPlus className="mr-3" /> <span>Add Item</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/delete-item" className="flex items-center p-2 hover:bg-gray-700 rounded" title="Delete Item">
                        <FaTrash className="mr-3" /> <span>Delete Item</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/update-item" className="flex items-center p-2 hover:bg-gray-700 rounded" title="Update Item">
                        <FaEdit className="mr-3" /> <span>Update Item</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default SideNav;