import React from "react";
import {TextField, Button} from "@material-ui/core";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faWallet} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom';
import "../css/views/LoginAndRegistrationView.css"
import PasswordField from "../components/PasswordField";


const LoginView = () => {
    return (
        <div id="LoginViewContainer">
            <h1 className="Title"><FontAwesomeIcon icon={faWallet} id="WalletIcon"/>My Little Savings</h1>
            <form className="LoginForm" autoComplete="off">
                <p className="WelcomeText">Welcome back</p>
                <h2>Log into your account</h2>
                <TextField id="EmailInput" className="TextInput" label="Email" variant="outlined"/>
                <PasswordField placeholder="Password" labelWidth={70} />
                <Button className="LoginButton" variant="contained" color="primary">
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