import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';
import { CiUser } from 'react-icons/ci';

const Register = () => {
    const { createUser } = useContext(AuthContext);
    const server_url = import.meta.env.VITE_SERVER_URL;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        bankAccount: '',
        password: '',
    });

    const [error, setError] = useState(null);
    const [userDetails, setUserDetails] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation example
        if (!formData.email || !formData.password) {
            setError('email or password fields are required.');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError('Invalid email format.');
            return;
        }

        setError(null);
        // Handle form submission logic here

        console.log(formData);
        createUser(formData.email, formData.password)
            .then(res => {
                const loggedUser = res.user;
                console.log("Logged-in user: ", loggedUser);
                Swal.fire({
                    title: 'Registration Successful!',
                    text: 'You have been successfully registered.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                // Show user details on top of the form
                setUserDetails({
                    name: formData.name,
                    email: formData.email,
                    bankAccount: formData.bankAccount
                });

                // Save the user details on the server
                axios.post(`${server_url}/users`, {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    account: formData.bankAccount,
                });
                navigate("/");

            })
            .catch(err => {
                setError("Registration failed. Please try again");
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register</h2>

                {/* Display User Details After Registration */}
                {userDetails && (
                    <div className="mb-4 p-4 bg-green-100 border border-green-200 rounded-lg">
                        <h3 className="text-lg flex gap-1 items-center font-semibold text-green-700"><CiUser /> User Information</h3>
                        <p><strong>Name:</strong> {userDetails.name}</p>
                        <p><strong>Email:</strong> {userDetails.email}</p>
                        <p><strong>Bank Account No:</strong> {userDetails.bankAccount}</p>
                    </div>
                )}

                {error && (
                    <div className="text-red-500 text-sm mb-4">{error}</div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="bankAccount"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Bank Account No.
                        </label>
                        <input
                            type="text"
                            id="bankAccount"
                            name="bankAccount"
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={formData.bankAccount}
                            onChange={handleInputChange}
                            placeholder="Enter your bank account number"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter your password"
                        />
                    </div>
                    <div>
                        <p>Already have an account?
                            <Link to={"/login"}>
                                <span className='btn btn-link'>login here</span>
                            </Link>
                        </p>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded font-bold hover:bg-blue-600 transition duration-200"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
