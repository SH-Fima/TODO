import React, { useEffect, useState } from 'react';
import { useLoginMutation } from '../redux/api';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [login, { data, isLoading, isSuccess }] = useLoginMutation();
    const { handleAuth } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
        alert("Please enter correct username and password!");
        return; 
          }
        try {
            await login({ username, password });
            handleAuth(data);
            navigate("/");
        } catch (error) {
            console.log(error);
        } finally {
            setUsername("");
            setPassword("");
        }
    };

    useEffect(() => {
        if (isSuccess) {
            handleAuth(data);
            navigate("/");
        }
    }, [isSuccess]);

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
              {/* Left */}
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div>
                        <img
                            src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
                            className="w-32 mx-auto"
                            alt="Logo"
                        />
                    </div>

                    <div className="mt-12 flex flex-col items-center">
                     
                        <h1 className="text-3xl xl:text-4xl font-extrabold text-blue-600 mb-8">
                            My Todo App
                        </h1>

                    
                        <div className="w-full flex-1 mt-8">
                            <div className="mx-auto max-w-xs">
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="text"
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
                                    placeholder="Username"
                                />
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    placeholder="Password"
                                />
                                <button
                                    onClick={handleSubmit}
                                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Loading..." : "Sign In"}
                                </button>

                                <p className="mt-6 text-xs text-gray-600 text-center">
                                    I agree to abide by templatana's{" "}
                                    <a href="#" className="border-b border-gray-500 border-dotted">
                                        Terms of Service
                                    </a>{" "}
                                    and its{" "}
                                    <a href="#" className="border-b border-gray-500 border-dotted">
                                        Privacy Policy
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right */}
                <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                    <div
                        className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{
                            backgroundImage:
                                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default Login;
