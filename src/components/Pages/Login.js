import React, {useEffect} from 'react';
import '../../App.css';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { GetUserByGoogle, AddUser } from '../API';

function Login() {
    
    if(localStorage.getItem("User")){
        
        window.location.href = "http://localhost:3000/Profile";  
    }
    const clientId = '288590292459-jjc2hb7hi17d8mpk330q9s1kv3jaoc8i.apps.googleusercontent.com';

    useEffect(() => {
       const initClient = () => {
            gapi.auth2.init({
             clientId: clientId
           });
        };
        gapi.load('client:auth2', initClient);
    });
  
    let googleId = 0;
    const onSuccess = (res) => {
        //console.log('success:', res);
        googleId = res.googleId;
        CheckIfExcists(false)
    };
    const onSuccessRegister = (res) => {
        //console.log('success:', res);
        googleId = res.googleId;
        CheckIfExcists(true)
    };
    const onFailure = (err) => {
        console.log('failed:', err);
    };

    function CheckIfExcists(Status){
        let ExistingUser = GetUserByGoogle(googleId);
        if(Status){
            ExistingUser.then(value => {
                window.alert("There is already a user with this google account....");
                googleId = 0;
            })
            .catch(function (error) {
              //error handle
            });
        }else{
            ExistingUser.then(value => {
                window.alert("Welcome back "+ value.data.username);
                document.getElementById('regBtn').disabled = true;
    
                localStorage.setItem("User", value.data.username);
                window.location.href = "http://localhost:3000/Profile";
            })
            .catch(function (error) {
                window.alert("These are no accounts linked to this google account...\nRegister if you want to login");
            });
        }
        
    }

    function CreateNewUser(){
        
        let Uname = document.getElementById('username').value;
        let GooId = googleId;

        if(Uname != null && GooId !== 0){
            AddUser(Uname, GooId);
            localStorage.setItem("User", Uname);
            window.location.href = "http://localhost:3000/Profile";  
        }
    }

    return (
    <>
        <div className="card w-25 text-center mt-5 mx-auto">
            <div className="card-body m-2">
                <h5 className="card-title">Already Have A Account?</h5>
                <GoogleLogin
                    className='mt-2'
                    clientId={clientId}
                    buttonText="Login with google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={false}
                />

                <h5 className="card-title mt-4">Register New User</h5>
                <input type='text' className='form-control w-50 mx-auto' placeholder='Username' id='username'/>
                <GoogleLogin
                    className='mt-3'
                    clientId={clientId}
                    buttonText="Register with google"
                    onSuccess={onSuccessRegister}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={false}
                />
                <br/>
                <button onClick={CreateNewUser} className='bnt-figure btn-figure-reverseNav mt-3' id='regBtn'>Create Account</button>
            </div>
        </div>
        
    </>
  );
}

export default Login;