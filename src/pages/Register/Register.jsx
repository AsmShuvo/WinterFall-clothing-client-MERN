import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';

const Register = () => {
    const { createUser } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        bankAccount: '',
        password: '',
    });

    const [error, setError] = useState(null);

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
        if (!formData.name || !formData.email || !formData.bankAccount || !formData.password) {
            setError('All fields are required.');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError('Invalid email format.');
            return;
        }

        setError(null);
        alert('Registration Successful');
        // Handle form submission logic here

        console.log(formData);
        createUser(formData.email, formData.password)
            .then(res => {
                const loggedUser = res.user;
                console.log("Logged-in user: ", loggedUser);
            })
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register</h2>
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
