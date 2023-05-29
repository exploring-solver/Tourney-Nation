import React, { useState } from "react";
import { Link ,useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://tourney-nation-backend.onrender.com/api/auth/signup", {
                name,
                username,
                email,
                password,
            });
            console.log(response.data);
            // redirect to login page
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.data) {
             console.log(error.response.data);
            } else {
                console.log(error);
            }
        }
    }; 

    return (
        <div className="bg-gray-800 py-28">
            <div className="w-[50%] m-auto flex flex-col gap-3">
                <h1 className="text-2xl font-mono font-bold mb-2 text-indigo-600">Signup for Tourney-Nation</h1>
                <p className="text-zinc-400 font-mono text-sm">Get started easily by signing up to manage your tournaments and events </p>
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between w-[300px]">
                        <div className="flex flex-col gap-6 justify-center">
                            <label className="text-indigo-400 font-semibold">Name </label>
                            <label className="text-indigo-400 font-semibold">Username </label>
                            <label className="text-indigo-400 font-semibold">Email </label>
                            <label className="text-indigo-400 font-semibold ">Password</label>
                        </div>
                        <div className="flex flex-col gap-4">
                            <input type="text" className="mx-9 border-2 border-transparent text-sm w-52 bg-gray-600 focus:border-indigo-500 outline-none rounded-sm text-white px-2 py-1" value={name} onChange={(e) => setName(e.target.value)} required />
                            <input type="text" className="mx-9 border-2 border-transparent text-sm w-52 bg-gray-600 focus:border-indigo-500 outline-none rounded-sm text-white px-2 py-1" value={username} onChange={(e) => setUsername(e.target.value)} required />
                            <input type="email" className="mx-9 border-2 border-transparent text-sm w-52 bg-gray-600 focus:border-indigo-500 outline-none rounded-sm text-white px-2 py-1" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <input type="password" className="mx-9 border-2 border-transparent bg-gray-600 text-white px-2 py-1 focus:border-indigo-500 outline-none rounded-sm" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                    </div>
                    <button type="submit" className="text-white font-semibold text-lg px-10 py-2  rounded-sm bg-indigo-900 hover:bg-indigo-800 my-4">Signup</button>
                </form>
                <p className="text-zinc-400">
                    Already have an account? <Link className="text-indigo-400 text-xl hover:underline mx-2" to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;

