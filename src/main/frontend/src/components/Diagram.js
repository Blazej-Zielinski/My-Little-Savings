import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(() =>({
    diagramContainer:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "30%",
        color: "#C2C2C2"
    },
    diagram:{
        position: "relative",
        width: "15em",
        height: "15em",
        clipPath: "circle(50% at 50% 50%)",
        overflow: "hidden",
    },
    diagramTitle:{
        fontSize: "1.7em",
        marginBottom: "0.5em",
    },
    piece:{
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    components: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        lineHeight: "3em",
        width: "100%",
        marginTop: "1em",
        color: "#000000"
    },
    comp:{
        display: "flex",
        alignItems: "center",
    },
    compSpan:{
        fontSize: "1em",
        fontWeight: "bold",
        marginLeft: "0.5em"
    }
}));

const Diagram = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.diagramContainer}>
            <h2 className={classes.diagramTitle}>{props.data.title}</h2>
            <div className={classes.diagram}>
                {props.data.components.map((component,key) =>
                    <div className={classes.piece} key={key} style={{backgroundColor: component.color,clipPath: component.clipPath}}/>
                )}
            </div>
            <div className={classes.components}>
                {props.data.components.map((component,key) =>
                    <div className={classes.comp} id="comp-1">
                        <Avatar variant={"rounded"} style={{background: component.color}}>
                            <FontAwesomeIcon icon={component.icon}/>
                        </Avatar>
                        <span className={classes.compSpan}>{component.title}</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Diagram