import React from "react";
import {ListItem,ListItemAvatar,ListItemText,Avatar} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
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
        width: "2em",
        height: "2em",
        fontSize: "1.5em"
    },
    categoryCost: {
        textAlign: "right",
        fontSize: "1.3em",
        color: "#FB0A43",
        fontWeight: "bold"
    }
}));

const Category = (props) => {
    const classes = useStyles();

    return(
        <ListItem button classes={{root: classes.lismtItem}}>
            <ListItemAvatar>
                <Avatar classes={{root: classes.avatar}} style={{background: props.data.color}}>
                    <FontAwesomeIcon icon={props.iconImg} style={{color: "#ffffff"}}/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={props.data.typeName} secondary="Records: 6" />
            <ListItemText primary={"-567.50 zł"} classes={{primary: classes.categoryCost}}/>
        </ListItem>
    )
}

export default Category