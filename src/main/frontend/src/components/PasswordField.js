import React from "react";
import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import "../css/components/PasswordField.css";

const PasswordField = (props) => {
    const [values, setValues] = useState({
        password: '',
        showPassword: false,
    });
    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return(
        <FormControl id="PasswordInput" className="PasswordInput" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">{props.placeholder}</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {values.showPassword ? <FontAwesomeIcon style={{fontSize: "0.9em"}} icon={faEye}/> :
                                <FontAwesomeIcon style={{fontSize: "0.9em"}} icon={faEyeSlash}/>}
                        </IconButton>
                    </InputAdornment>
                }
                labelWidth={props.labelWidth}
            />
        </FormControl>
    )
}

export default PasswordField;