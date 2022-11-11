import React from 'react';
import '../../App.css';
import Cards from '../Cards';
import { useNavigate } from "react-router-dom";
import {useEffect } from 'react';

function Profile() {
    let navigate = useNavigate();
    const username = localStorage.getItem("User");

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const PageUser = urlParams.get('user');

    // if(!username){
    //     window.location.href = "http://localhost:3000/Login";  
    // }

    //If logged in and searches own profile, go to profile
    useEffect(() => {
        if (username === PageUser){
           return navigate("/Profile");
        }
    });
    //if not logged in and not searching for user, go to home
    useEffect(() => {
        if (!username && !PageUser){
           return navigate("/");
        }
    });

    function Logout(){
        localStorage.removeItem("User");
        window.location.href = "http://localhost:3000/Login";
    }
    
    return (
        <>
        {/* No URL, Logged in */}
        {!PageUser && username &&
    
            <div className='m-2'>
                <div className='text-center'>
                    <h1 className=''>Welcome {username}</h1>
                    <button className='btn btn-danger' onClick={Logout}>Log Out</button>
                </div>
            </div>
        }
        {/* Not logged in, URL */}
        {PageUser &&
        
            <div className='m-2'>
                <div className='text-center mt-3'>
                    <h1 className=''>{PageUser}'s Collection</h1>
                </div>
            </div>
        }

        <hr/>

        <Cards/>
        </>
    );
}

export default Profile;