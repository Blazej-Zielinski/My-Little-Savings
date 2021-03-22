import React from "react";
import {ListItem,ListItemAvatar,ListItemText} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    listItem:{
        borderRadius: "1em",
        transition: "transform 0.3s",
        '&:hover': {
            transform: "scale(1.02)"
        }
    },
    avatar:{
        fontSize: "2.5em",
        fontWeight: 600
    },
    categoryCost: {
        textAlign: "right",
        fontSize: "1.3em",
        color: "#FB0A43",
        fontWeight: "bold"
    },
    titleText: {
        fontWeight: 600
    }
}));

const Transaction = (props) => {
    const classes = useStyles();

    return(
        <ListItem button classes={{root: classes.listItem}}>
            <ListItemAvatar classes={{root: classes.avatar}}>
                {props.data.day}
            </ListItemAvatar>
            <ListItemText primary={props.data.title} secondary={props.data.date} classes={{primary: classes.titleText}} />
            <ListItemText primary={"-67.50 zł"} classes={{primary: classes.categoryCost}}/>
        </ListItem>
    )
}

export default Transaction