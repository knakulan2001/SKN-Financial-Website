import { useState, React } from "react";
// import { Link, useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import Axios from "axios";
import "./Forms.css";
import configData from "../Configs/config";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    // React States
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);

    // let history = useHistory();

    const handleSubmit = () => {
        const data = { username: username, password: password };

        Axios.defaults.withCredentials = true;
        Axios.post(configData.SERVER_URL + "users/login", data)
            .then((response) => {
                console.log("Logged in SQL DB.");
                localStorage.setItem("loggedUserid", Cookies.get("loggedUserid"));
            })
            .then((cred) => {
                console.log("Logged in firebase.", cred.user);
                // history.push("/forms-page");
                // window.location.reload();
            })
            .catch((error) => {
                toast.error("Invalid Username or Password", {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    closeButton: true,
                    // progress: 0,
                });
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

    // const [value, setValue] = useState('');
    // const handleSelect = (e) => {
    //     console.log(e);
    //     setValue(e)
    // };
    var div = document.getElementsByClassName('dropdown-content');

    for(var  i =0;i<div.length;i++){
        for(var  j =0;j<div[i].children.length;j++){
            div[i].children[j].addEventListener('click',function(){
                this.parentNode.previousElementSibling.innerHTML = this.innerHTML;
            })
        }   
    }

    return (
        <div className="form-container">
            <div className="login-card">
                <form className="form" noValidate>
                    <p className="form-heading">Sign In</p>
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

                    <div className="StoreName">
                        <DropdownButton
                            alignCenter
                            title = "Store Name"
                            id = "store-name-dropdown-menu"
                            // onSelect={handleSelect}
                        >
                            <Dropdown.Item event="store-1">store-1</Dropdown.Item>
                            <Dropdown.Item event="store-2">store-2</Dropdown.Item>
                            <Dropdown.Item event="store-3">store-3</Dropdown.Item>
                            <Dropdown.Item event="store-4">store-4</Dropdown.Item>
                        </DropdownButton>
                        {/* <h4>{value}</h4> */}
                    </div>

                    <button className="form-input-btn" onClick={handleSubmit} type="button">
                        Log in
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
