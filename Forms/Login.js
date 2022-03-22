// import { useState, React } from "react";
// import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import ReactDOM from "react-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Cookies from "js-cookie";
// import Axios from "axios";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
import "./Forms.css";
import configData from "../../Configs/config.json";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    // React States
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // User Login info
    const database = [
        {
            username: "user1",
            password: "pass1"
        },
        {
            username: "user2",
            password: "pass2"
        }
    ];

    const errors = {
        errorUsername: "Invalid Username. Please Try Again",
        errorPassword: "Invalid Password. Please Try Again"
    };

    let history = useHistory();

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();

        var { errorUsername, errorPassword } = document.forms[0];

        // User login info
        // const data = { username: username, password: password };
        const data = database.find((user) => user.username === uname.value);

        // Compare user info
        if (data) {
            if (data.password !== errorPassword.value) {
            // Invalid password
                setErrorMessages({ name: "errorPassword", message: errors.errorPassword });
            } 
            else {
                setIsSubmitted(true);
            }
        } 
        else {
            // Username not found
            setErrorMessages({ name: "errorUsername", message: errors.errorUsername });
        }
        
        Axios.defaults.withCredentials = true;
        Axios.post(configData.SERVER_URL + "users/login", data)
            .then((cred) => {
                console.log("Logged into firebase", cred.user);
                history.push("/");
                window.location.reload();
            })
            .catch((error) => {
                console.log("There's an error with the username or password");
                // Error
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });
    };

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
        <div className="error">{errorMessages.message}</div>
        );
        
    return (
        <div className="form-container">
            <div className="login-card">
                <form className="form" noValidate>
                    <p className="form-heading">Welcome Back!</p>
                    <input
                        className="form-input"
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />

                    <div className="pass-cont">
                        <input
                            className="form-input"
                            type={isShowPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <div className="icon-container" onClick={() => setIsShowPassword(!isShowPassword)}>
                            {isShowPassword ? <FaEye /> : <FaEyeSlash />}
                        </div>
                    </div>
                    <button className="form-input-btn" onClick={handleSubmit} type="button">
                        Log in
                    </button>
                    {/* <p className="form-input-login">
                        Can't Login? Get Help{" "}
                        <Link className="login-link" to="/register">
                            here.
                        </Link>
                    </p> */}
                </form>
            </div>
        </div>
    );
};

export default Login;
