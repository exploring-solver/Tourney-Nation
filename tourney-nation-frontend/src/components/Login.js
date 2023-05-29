import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import Navbar from './Navbar';

const Login = ({loggedIn,updateLogin}) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        credential: '',
        password: '',
    });
    // handles to check if user logged in or not
    const { credential, password } = formData;
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    //handles submission
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://tourney-nation-backend.onrender.com/api/auth/login', formData);
            localStorage.setItem('authtoken', res.data.authtoken);
            updateLogin(true); // Update isLoggedIn state to true
            navigate('/');
            console.log("User logged in successfully")
            e.target.reset();
            
        } catch (error) {
            alert('Invalid Credentials'); 
            console.error(error);
        }
    };

    // useEffect(() => {
    //     console.log('isLoggedIn:', isLoggedIn);
    // }, [isLoggedIn]);
    
    return (
        <div className="bg-gray-800 py-28">
            <div className="w-[50%] m-auto flex flex-col gap-3">
                <h1 className="text-2xl font-mono font-bold mb-2 text-indigo-600">Login to Tourney-Nation</h1>
                <form onSubmit={onSubmit}>
                    <div className="flex justify-between w-[400px]">
                        <div className="flex flex-col gap-6 justify-center">
                            <label className="text-indigo-400 font-semibold" htmlFor='credential'>Email or Username:</label>
                            <label className="text-indigo-400 font-semibold" htmlFor='password'>Password:</label>
                        </div>
                        <div className="flex flex-col gap-8">
                            <input
                                type='text'
                                name='credential' className="mx-9 border-2 border-transparent text-sm w-52 bg-gray-600 focus:border-indigo-500 outline-none rounded-sm text-white px-2 py-1"
                                value={credential}
                                onChange={onChange}
                                required
                            />
                            <input
                                type='password'
                                name='password' className="mx-9 border-2 border-transparent text-sm w-52 bg-gray-600 focus:border-indigo-500 outline-none rounded-sm text-white px-2 py-1"
                                value={password}
                                onChange={onChange}
                                minLength='6'
                                required
                            />
                        </div>
                    </div>
                    <input type='submit' className="text-white font-semibold text-lg px-10 py-2  rounded-sm bg-indigo-900 hover:bg-indigo-800 my-4 hover:cursor-pointer" value='Login' />
                </form>
                <p className="text-zinc-400">Don't have an account? <Link className="text-indigo-400 text-xl hover:underline mx-2" to="/signup">Sign up</Link></p>
            </div>
        </div>
    );
};

export default Login;
