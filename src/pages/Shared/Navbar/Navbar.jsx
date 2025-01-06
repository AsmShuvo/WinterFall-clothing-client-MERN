import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../provider/AuthProvider';
import { FaCartShopping } from 'react-icons/fa6';
import { MdAdminPanelSettings } from 'react-icons/md';
import { FaRegUserCircle } from 'react-icons/fa';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    console.log("User in navbar: ", user?.email);
    const handleLogout = () => {
        logOut()
            .then(() => {
                alert("Logout Succesfully");
            })
            .catch(err => {
                console.log("Error logout: ", err);
            })
    }
    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li> <NavLink to={"/"} >Home</NavLink> </li>
                            <li> <NavLink to={"/products"} >Products</NavLink> </li>
                            <li> <NavLink to={"/about"} >AboutUs</NavLink> </li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-3xl font-bold">WinterFall</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li> <NavLink to={"/"} >Home</NavLink> </li>
                        <li> <NavLink to={"/products"} >Products</NavLink> </li>
                        <li> <NavLink to={"/about"} >AboutUs</NavLink> </li>
                    </ul>
                </div>

                <div className="navbar-end gap-8"><span className='font-mono bg-gray-100 px-2 rounded-full items-center justify-center flex gap-1 text-gray-600'><FaRegUserCircle />{user?.email}</span>
                    {
                        user?.email == "admin@gmail.com" ?
                            <div className='flex items-center justify-center gap-1 py-1 px-4 bg-gray-800 rounded-full'>
                                <span className='font-bold font-mono text-white'>Admin Panel</span>
                                <MdAdminPanelSettings className='text-3xl text-gray-500' /></div>
                            :
                            <div>
                                <Link to={"/cart"}>
                                    <FaCartShopping className='text-green-800 text-2xl' />
                                </Link>
                            </div>
                    }

                    {
                        user ?
                            <><button onClick={handleLogout} className='btn text-white bg-red-700 btn-sm'>Logout</button> </> :
                            <><Link to={"/login"} className="btn btn-sm">Login</Link></>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;