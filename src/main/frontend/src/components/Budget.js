import {React, useEffect, useState} from "react";
import {ListItem, ListItemAvatar, ListItemText, Avatar, LinearProgress} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import makeStyles from "@material-ui/core/styles/makeStyles";
import withStyles from "@material-ui/core/styles/withStyles";


const useStyles = makeStyles((theme) => ({
    listItem: {
        borderRadius: "1em",
        transition: "transform 0.3s",
        '&:hover': {
            transform: "scale(1.02)"
        }
    },
    avatar: {
        width: "2em",
        height: "2em",
        fontSize: "1.5em"
    },
    budgetValueAlign: {
        textAlign: "right"
    },
    budgetValue: {
        fontSize: "1.3em",
        color: "#039BE5",
        fontWeight: "bold"
    },
    budgetTitle:{
      fontSize: "1.3em",
    },
}));

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 10,
        borderRadius: 5,
        width:"100%",
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#1a90ff',
    },
}))(LinearProgress);

const Budget = (props) => {
    const classes = useStyles();
    const [progress,setProgress] = useState(0);

    useEffect(() =>{
        const progress = props.data.progress
        setProgress(progress)
    },[]);

    return (
        <ListItem button classes={{root: classes.listItem}}>
            <ListItemAvatar>
                <Avatar classes={{root: classes.avatar}} style={{background: props.data.color}}>
                    <FontAwesomeIcon icon={props.data.icon} style={{color: "#ffffff"}}/>
                </Avatar>
            </ListItemAvatar>
            <div style={{width:"80%"}}>
                <ListItemText primary={props.data.title}  classes={{primary: classes.budgetTitle}}/>
                <BorderLinearProgress variant="determinate" value={progress}/>
            </div>
            <ListItemText primary={"500.00 zł"} secondary={"Left 400.00 zł"}
                          classes={{root: classes.budgetValueAlign, primary: classes.budgetValue}}/>
        </ListItem>
    )
}

export default Budget