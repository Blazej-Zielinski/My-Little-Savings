import React, {useState} from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import {
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    List,
    Paper,
    TextField
} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Divider} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faPlane,
    faPlus,
    faShoppingCart,
    faSmileBeam,
} from "@fortawesome/free-solid-svg-icons";
import {blue, green, orange} from "@material-ui/core/colors";
import Budget from "../components/Budget";

const useStyles = makeStyles((theme) => ({
    budgetsView: {
        width: "calc(100% - 240px)",
        minHeight: "100vh",
        float: "right",
        backgroundColor: "#EAEFF1",
    },
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
        margin: "4em auto 2em auto",
        borderRadius: "1em",
    },
    list: {
        padding: theme.spacing(3)
    },
    addButton: {
        background: "#009BE5",
        color: "#ffffff",
        '&:hover': {
            backgroundColor: "#008AD4",
        }
    },
    dialogInputs:{
        width: "100%"
    }
}));

const budgets = [
    {
        title: "Shopping",
        icon: faShoppingCart,
        color: orange[500],
        progress: 50,
        key: 1
    },
    {
        title: "Entertainment",
        icon: faSmileBeam,
        color: blue[500],
        progress: 70,
        key: 2
    },
    {
        title: "Travel",
        icon: faPlane,
        color: green[500],
        progress: 100,
        key: 3
    },
]

const BudgetsView = () => {
    const classes = useStyles();
    const [date, setDate] = useState('2014-08');
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDateChange = (date) => {
        setDate(date.value);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div id="#BudgetViewContainer" className={classes.budgetsView}>
            <Header title="Budgets"/>
            <Navigation selected={2}/>
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
                    <Button
                        variant="contained"
                        classes={{root: classes.addButton}}
                        color="primary"
                        startIcon={<FontAwesomeIcon icon={faPlus}/>}
                        onClick={handleClickOpen}
                    >
                        Add Budget
                    </Button>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Add Budget</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Create a budget. Set budget name and goal.
                            </DialogContentText>
                            <TextField id="BudgetName" className="TextInput" label="Name" variant="outlined" classes={{root: classes.dialogInputs}}/>
                            <TextField id="BudgetGoal" className="TextInput" label="Value" variant="outlined" classes={{root: classes.dialogInputs}}/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleClose} color="primary">
                                Confirm
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <Divider/>
                <List classes={{root: classes.list}}>
                    {budgets.map((category, index) => <Budget key={index} data={category}/>)}
                </List>
            </Paper>
        </div>
    )
}

export default BudgetsView