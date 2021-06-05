import React, {useState} from "react";
import {Divider, Paper, TextField} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faGift,
    faLongArrowAltDown,
    faLongArrowAltUp,
    faMoneyBillWave,
    faPlane,
    faShoppingCart,
    faSmileBeam
} from "@fortawesome/free-solid-svg-icons";
import Diagram from "../components/Diagram";

const useStyles = makeStyles((theme) => ({
    cardHeader: {
        display: "flex",
        height: "5em",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 2em",
    },
    card: {
        minHeight: "30vh",
        width: "80%",
        margin: "20vh auto 2em auto",
        borderRadius: "1em",
    },
    flex: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        padding: theme.spacing(3),
        color: "#C2C2C2"
    },
    diagrams: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-start",
        marginTop: "4em",
        minHeight: "60vh",
    },
    balance: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontSize: "1.2em",
    },
    plus: {
        color: "#E51C23",
        fontWeight: "bold"
    },
    minus: {
        color: "#039BE5",
        fontWeight: "bold"
    }
}));

const diagramsData = [
    {
        title: "Earnings",
        components: [
            {
                title: "Salary",
                icon: faMoneyBillWave,
                color: "#F84848",
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            },
            {
                title: "Gifts",
                icon: faGift,
                color: "#0D6E0C",
                clipPath: "polygon(62% 0, 100% 0, 100% 34%, 50% 50%)",
            }
        ]
    },
    {
        title: "Spendings",
        components: [
            {
                title: "Entertainment",
                icon: faSmileBeam,
                color: "#4B4BEF",
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            },
            {
                title: "Shopping",
                icon: faShoppingCart,
                color: "#ff9800",
                clipPath: " polygon(50% 0, 100% 0, 100% 90%, 50% 50%)",
            },
            {
                title: "Travel",
                icon: faPlane,
                color: "#4caf50",
                clipPath: " polygon(0 30%, 0 0, 50% 0, 50% 50%)",
            }
        ]
    }
]


const SummaryView = (props) => {
    const classes = useStyles();
    const [date, setDate] = useState('2014-08');
    const setLogged = props.setLogged;

    const handleDateChange = (date) => {
        setDate(date.value);
    };

    return (
        <div>
            <Paper elevation={5} classes={{root: classes.card}}>
                <div className={classes.cardHeader}>
                    <TextField
                        id="date"
                        type="month"
                        value={date}
                        onChange={handleDateChange}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <Divider/>
                <div className={classes.flex}>
                    <div className={classes.balance}>
                        <h2>Inflow</h2>
                        <div className={classes.plus}>
                            <span>+3000.00zł</span>
                            <FontAwesomeIcon icon={faLongArrowAltUp}/>
                        </div>
                    </div>
                    <div className={classes.balance}>
                        <h2>Outflow</h2>
                        <div className={classes.minus}>
                            <span>-2569.00zł</span>
                            <FontAwesomeIcon icon={faLongArrowAltDown}/>
                        </div>
                    </div>
                    <div className={classes.balance}>
                        <h2>Balance</h2>
                        <div className={classes.plus}>
                            <span>+431.00zł</span>
                            <FontAwesomeIcon icon={faLongArrowAltUp}/>
                        </div>
                    </div>
                </div>
                <div className={classes.diagrams}>
                    <Diagram data={diagramsData[0]}/>
                    <Diagram data={diagramsData[1]}/>
                </div>
            </Paper>
        </div>
    )
}

export default SummaryView