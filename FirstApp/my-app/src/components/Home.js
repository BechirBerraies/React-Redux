import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const users = useSelector(state => state.user.users);
    const navigate = useNavigate();



    const logout = () => {
        axios.post('http://localhost:8000/api/user/logout',{},{withCredentials:true})
            .then(serverResponse => {
                console.log(serverResponse);
                navigate('/');
            })
            .catch(error => console.log(error),
            console.log("Tell me why tell me why ")
            
        );
    };

    return (
        <>
            <h1>Welcome you logged in successfully or registered whatever</h1>


            {users.length > 0 && (
                <div>
                    <h2>Registered Users:</h2>
                    <ul>
                        {users.map((user, index) => (
                            <li key={index}>{user.Name}</li>
                        ))}
                    </ul>
                </div>
            )}
                <div>
                    <button onClick={logout}>Logout</button>
                </div>
        </>
    );
};

export default Home;
