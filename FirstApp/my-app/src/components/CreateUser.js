import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateUser.css'; // Optional: Create this CSS file for styling
import { useDispatch } from 'react-redux'; // Import useDispatch hook
import { createUser } from '../actions/userActions';

const CreateUser = () => {
    const [user, setUser] = useState({ Name: "", Age: "", email: "", password: "", confirmPassword: "" });
    const [loguser, logsetuser] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const dispatch = useDispatch();



    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };
    const handleChange2 =   (e) => {
        const { name, value } = e.target;
        logsetuser({
           ...loguser,
            [name]: value,
        });
    };
    

    const register = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/user/register', user, { withCredentials: true })
            .then(serverResponse => {
                console.log(serverResponse);
                dispatch(createUser(user));
                navigate('/home');
            })
            .catch(error => console.log(error),
            console.log("Tell me why tell me why ")
            
        );
    };

    const login = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/user/login', loguser, { withCredentials: true })
           .then(serverResponse => {
                console.log(serverResponse);
                dispatch(createUser(user));
                navigate('/home');
            })
           .catch(error => console.log(error),
            console.log("Tell me why tell me why ")
            
        );
    };

    return (
        <div className="container">
            <h2>Register</h2>
            <form onSubmit={register}>
                <div className="form-group">
                    <label htmlFor="Name">Name:</label>
                    <input
                        type="text"
                        id="Name"
                        name="Name"
                        value={user.Name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="Age">Age:</label>
                    <input
                        type="number"
                        id="Age"
                        name="Age"
                        value={user.Age}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={user.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <button type="submit">Register</button>
                </div>
            </form>

            <form onSubmit={login}>

            <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={handleChange2}
                        value={loguser.email}
                        required
                    />
                </div>

            <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange2}
                        value={loguser.password}
                        required
                    />
                </div>
                <div className="form-group">
                    <button type="submit">Login</button>
                </div>
                </form>
        </div>
    );
};

export default CreateUser;