import React, {useEffect, useState} from "react";
import {Button, TextField} from "@material-ui/core";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faWallet} from '@fortawesome/free-solid-svg-icons'
import {Link, Redirect} from 'react-router-dom';
import "../css/views/LoginAndRegistrationView.css"
import PasswordField from "../components/PasswordField";
import axios from "axios";
import {authTokenName, loginUserUrl} from "../assets/properties";


const LoginView = (props) => {
    const [formData, setFormData] = useState({
        email: "adam@",
        password: "adam123!"
    })
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        if (props.location.message) {
            setTimeout(() => {
                alert(props.location.message);
            }, 100)
        }
    }, [])

    function handleClick() {
        axios.post(loginUserUrl, formData)
            .then(resp => {
                localStorage.setItem(authTokenName, resp.data);
                setLogged(true);
            })
            .catch(() => {
                alert("Wrong email or password");
            })

        setFormData({
            email: "",
            password: ""
        });
    }

    function handleChange(event) {
        setFormData(prev => ({...prev, [event.target.name]: event.target.value}));
    }

    return (logged ? <Redirect to="/categories"/> :
            <div id="LoginViewContainer">
                <h1 className="Title"><FontAwesomeIcon icon={faWallet} id="WalletIcon"/>My Little Savings</h1>
                <form className="LoginForm" autoComplete="off">
                    <p className="WelcomeText">Welcome back</p>
                    <h2>Log into your account</h2>
                    <TextField id="EmailInput" name="email" className="TextInput" label="Email" variant="outlined"
                               value={formData.email} onChange={handleChange}/>
                    <PasswordField name="password" placeholder="Password" labelWidth={70} value={formData.password}
                                   onChange={handleChange}/>
                    <Button className="LoginButton" variant="contained" color="primary" onClick={handleClick}>
                        Login
                    </Button>
                    <p className="BottomFormText">Not registered yet?
                        <Link to="/registration" className="Link">
                            Register!
                        </Link>
                    </p>
                </form>
            </div>
    )
}

export default LoginView;