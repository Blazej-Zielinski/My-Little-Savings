import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import "../css/components/Header.css";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    header: {
        background: "#009BE5",
        height: "20vh",
    },
    paper: {
        background: "#009BE5",
        color: "#ffffff",
        height: "100%",
        width: "100%",
        padding: theme.spacing(3),
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        boxSizing: "border-box"
    },
    avatar: {
        display: "inline-block",
        width: theme.spacing(6),
        height: theme.spacing(6)
    }
}));

const Header = (props) => {
    const classes = useStyles();

    return (
        <header className={classes.header}>
            <Paper classes={{root: classes.paper}} elevation={5}>
                <div>
                    <h1>{props.title}</h1>
                </div>
                <div className="InnerDiv">
                    <div className="UserDiv">
                        <span>Mark</span>
                        <Avatar src="/Avatar.jpg" sizes="big" classes={{root: classes.avatar}}/>
                    </div>
                    <p>Your wallet: 2547.55zł</p>
                </div>
            </Paper>
        </header>
    )
}

export default Header;
