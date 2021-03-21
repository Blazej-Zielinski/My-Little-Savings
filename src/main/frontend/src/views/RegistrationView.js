import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWallet} from "@fortawesome/free-solid-svg-icons";
import {Button, Link, TextField} from "@material-ui/core";
import PasswordField from "../components/PasswordField";
import React from "react";
import "../css/views/LoginAndRegistrationView.css"

const RegistrationView = () => {
    return(
        <div id="RegistrationViewContainer">
            <h1 className="Title"><FontAwesomeIcon icon={faWallet} id="WalletIcon"/>My Little Savings</h1>
            <form className="RegistrationForm" autoComplete="off">
                <p className="WelcomeText">Nice to see you</p>
                <h2>Create an account</h2>
                <TextField id="UsernameInput" className="TextInput" label="Username" variant="outlined"/>
                <TextField id="EmailInput" className="TextInput" label="Email" variant="outlined"/>
                <PasswordField placeholder="Password" labelWidth={70}/>
                <PasswordField placeholder="Repeat Password" labelWidth={130}/>
                <Button className="LoginButton" variant="contained" color="primary">
                    Register
                </Button>
                <p className="BottomFormText">Already have an account?
                    <Link href="login" onClick="preventDefault">
                        Login here!
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default RegistrationView;