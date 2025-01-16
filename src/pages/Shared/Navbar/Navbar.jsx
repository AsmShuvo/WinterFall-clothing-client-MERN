import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../provider/AuthProvider';
import { FaCartShopping } from 'react-icons/fa6';
import { MdAdminPanelSettings } from 'react-icons/md';
import { FaBorderStyle, FaRegUserCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    console.log("User in navbar: ", user?.email);

    const handleLogout = () => {
        logOut()
            .then(() => {
                Swal.fire("Logged out successfully.");
            })
            .catch(err => {
                console.log("Error logout: ", err);
            });
    };

    return (
        <div className="bg-gray-900 shadow-md">
            <div className="navbar container mx-auto flex justify-between items-center py-4 px-6">
                <div className="navbar-start flex items-center">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-gray-800 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><NavLink to={"/"} className="hover:text-blue-400 text-white">Home</NavLink></li>
                            <li><NavLink to={"/products"} className="hover:text-blue-400 text-white">Products</NavLink></li>
                            <li><NavLink to={"/about"} className="hover:text-blue-400 text-white">About Us</NavLink></li>
                        </ul>
                    </div>
                    <Link to="/" className="text-3xl font-bold text-blue-400">WinterFall</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 space-x-4">
                        <li><NavLink to={"/"} className="hover:text-blue-400 text-white">Home</NavLink></li>
                        <li><NavLink to={"/products"} className="hover:text-blue-400 text-white">Products</NavLink></li>
                        <li><NavLink to={"/about"} className="hover:text-blue-400 text-white">About Us</NavLink></li>
                    </ul>
                </div>
                <div className="navbar-end flex items-center gap-4">
                    <span className='font-mono bg-gray-800 px-2 py-1 rounded-full flex items-center gap-1 text-white'>
                        <FaRegUserCircle />{user?.email}
                    </span>
                    {user?.email === "admin@gmail.com" ? (
                        <Link to="/dashboard" className='flex items-center gap-1 py-1 px-4 bg-blue-600 rounded-full'>
                            <span className='font-bold text-white'>Admin</span>
                            <MdAdminPanelSettings className='text-3xl text-gray-200' />
                        </Link>
                    ) : user?.email === "bank@gmail.com" ? (
                        <Link to={"/bank"} className='flex gap-1 items-center font-bold text-green-400 bg-gray-800 rounded-md px-2 py-1'>
                            <FaBorderStyle /> Orders
                        </Link>
                    ) : (
                        <Link to={"/cart"}>
                            <FaCartShopping className='text-green-400 text-2xl' />
                        </Link>
                    )}
                    {user ? (
                        <button onClick={handleLogout} className='btn text-white border-none outline-none  bg-red-600 btn-sm'>Logout</button>
                    ) : (
                        <Link to={"/login"} className="btn btn-sm bg-blue-500 text-white">Login</Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;