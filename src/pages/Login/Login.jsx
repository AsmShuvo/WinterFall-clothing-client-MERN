import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';

const Login = () => {
    const navigate = useNavigate();
    const { signIn } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        email: '',
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

        // Basic validation
        if (!formData.email || !formData.password) {
            setError('Both fields are required.');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError('Invalid email format.');
            return;
        }


        // Handle login logic here
        console.log(formData.email, formData.password);
        signIn(formData.email, formData.password)
            .then(res => {
                const user = res.user;
                console.log("Signed in user: ", user);
                setError(null);
                alert('Login Successful');
                navigate("/");
            })
            .catch(err => {
                console.log("Error while loging in");
                alert("Login Failed. Check your email/password again");
            })
    };

    const handleGoogleLogin = () => {
        alert('Google Login Clicked');
        // Implement Google Login logic here
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
                {error && (
                    <div className="text-red-500 text-sm mb-4">{error}</div>
                )}
                <form onSubmit={handleSubmit}>
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
                        <p>Don't have an account?
                            <Link to={"/register"}>
                                <span className='btn btn-link'>register here</span>
                            </Link>
                        </p>

                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded font-bold hover:bg-blue-600 transition duration-200"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-6 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">or</span>
                </div>
                <button
                    onClick={handleGoogleLogin}
                    className="mt-4 w-full flex items-center justify-center bg-red-500 text-white py-3 rounded font-bold hover:bg-red-600 transition duration-200"
                >
                    <svg
                        className="w-5 h-5 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        fill="none"
                    >
                        <path
                            fill="#EA4335"
                            d="M24 9.5c3.19 0 6.04 1.17 8.29 3.09l6.17-6.17C34.02 3.57 29.32 1.5 24 1.5 14.61 1.5 6.84 7.62 3.53 16.1l7.7 6.02C12.8 15.14 18.02 9.5 24 9.5z"
                        />
                        <path
                            fill="#34A853"
                            d="M46.45 24.64c0-1.52-.13-3-.37-4.43H24v8.38h12.67c-.55 2.91-2.27 5.39-4.86 7.05l7.5 5.87c4.4-4.07 6.98-10.06 6.98-16.87z"
                        />
                        <path
                            fill="#4A90E2"
                            d="M10.53 28.12a9.27 9.27 0 01-.47-1.72l-7.7-6.02A23.99 23.99 0 001 24c0 3.9.89 7.58 2.46 10.88l7.57-6.76c-.27-.8-.48-1.64-.5-2.52z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M24 46.5c5.1 0 9.84-1.73 13.52-4.7l-7.5-5.87c-1.88 1.22-4.17 1.9-6.64 1.9-5.99 0-11.2-5.64-12.12-12.6l-7.57 6.76c3.31 8.48 11.08 14.6 19.27 14.6z"
                        />
                    </svg>
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default Login;
