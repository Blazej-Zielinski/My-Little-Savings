import React from "react";
import {ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import {Delete} from "@material-ui/icons";
import axios from "axios";
import {confirmDeleteMessage, deleteTransactionURL} from "../assets/properties";

const useStyles = makeStyles((theme) => ({
    listItem: {
        borderRadius: "1em",
        transition: "transform 0.3s",
        '&:hover': {
            transform: "scale(1.02)"
        }
    },
    avatar: {
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
    return (
        <ListItem classes={{root: classes.listItem}}>
            <ListItemAvatar classes={{root: classes.avatar}}>
                {props.data.day}
            </ListItemAvatar>
            <ListItemText primary={props.data.name} secondary={props.data.date} classes={{primary: classes.titleText}}/>
            <ListItemText primary={"-" + props.data.value + "zł"} classes={{primary: classes.categoryCost}}/>
            <IconButton color="secondary" component="span" style={{marginLeft: 5}} onClick={() => {props.handleDeleteTransaction(props.data.id)}}>
                <Delete/>
            </IconButton>

            {/*<Button variant="contained" color="secondary" startIcon={<Delete />} style={{marginLeft: 20}}>*/}
            {/*    Delete*/}
            {/*</Button>*/}
        </ListItem>
    )
}

export default Transaction