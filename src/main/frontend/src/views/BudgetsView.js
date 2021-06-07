import React, {useEffect, useState} from "react";
import {
    Avatar,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    List, ListItemAvatar, MenuItem,
    Paper, Select,
    TextField
} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlane, faPlus, faShoppingCart, faSmileBeam,} from "@fortawesome/free-solid-svg-icons";
import {blue, green, orange} from "@material-ui/core/colors";
import Budget from "../components/Budget";
import axios from "axios";
import {getBudgetsURL, getCategoryTypesURL, unauthorizedMessage} from "../assets/properties";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import iconPicker from "../assets/iconPicker";

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
    dialogInputs: {
        width: "100%"
    },
    select: {
        display: "flex",
        alignItems: "center",
    },
    avatar: {
        width: "2em",
        height: "2em",
        fontSize: "1em",
    },
    dialog: {
        width: "30%"
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

const BudgetsView = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [budgetsList, setBudgetsList] = useState({
        isLoaded: false,
        data: []
    })
    const [selectedBudget, setSelectedBudget] = useState([])
    const [categoriesTypes, setCategoriesTypes] = useState([]);
    const [date, setDate] = useState(() => {
        const now = new Date();
        const month = (now.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2})
        return now.getFullYear() + "-" + month;
    });
    const jwtConfig = {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        }
    };
    const setLogged = props.setLogged;

    useEffect(() => {
        setBudgetsList({
            isLoaded: false,
            data: []
        })

        axios.get(getBudgetsURL + date, jwtConfig)
            .then(resp => {
                let budgets = resp.data.map(budget => ({
                    ...budget,
                    value: budget.value.toFixed(2)
                }))

                setBudgetsList({
                    isLoaded: true,
                    data: [...budgets]
                })
            })
            .catch(() => {
                setLogged(() => ({
                    redirect: true,
                    message: unauthorizedMessage
                }));
            });
    }, [date])

    useEffect(() => {
        axios.get(getCategoryTypesURL, jwtConfig)
            .then(resp => {
                setCategoriesTypes(resp.data);
            })
    }, [])

    const handleClose = () => {
        setOpen(false);
        setSelectedBudget([])
    };


    return (
        <div>
            <Paper elevation={5} classes={{root: classes.card}}>
                <div className={classes.cardHeader}>
                    <TextField
                        id="date"
                        type="month"
                        value={date}
                        onChange={event => setDate(event.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button
                        variant="contained"
                        classes={{root: classes.addButton}}
                        color="primary"
                        startIcon={<FontAwesomeIcon icon={faPlus}/>}
                        onClick={() => setOpen(true)}
                    >
                        Add Budget
                    </Button>
                    <Dialog open={open} onClose={handleClose} classes={{paper: classes.dialog}}>
                        <DialogTitle id="form-dialog-title">Add Budget</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Create a budget. Set budget name and goal.
                            </DialogContentText>
                            <Select
                                labelId="select"
                                id="categorySelect"
                                value={selectedBudget}
                                onChange={event => {
                                    setSelectedBudget(event.target.value)
                                }}
                                style={{width: "100%"}}
                                classes={{root: classes.select}}
                            >
                                {
                                    categoriesTypes.map((category, index) => (
                                        <MenuItem key={index} value={category}>
                                            <ListItemAvatar>
                                                <Avatar classes={{root: classes.avatar}}
                                                        style={{background: category.color}}>
                                                    <FontAwesomeIcon icon={iconPicker(category.icon)}
                                                                     style={{color: "#ffffff"}}/>
                                                </Avatar>
                                            </ListItemAvatar>
                                            {category.name}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                            <TextField id="BudgetGoal" className="TextInput" label="Value" variant="outlined"
                                       classes={{root: classes.dialogInputs}}/>
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
                    {
                        !budgetsList.isLoaded ?
                            <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                                <CircularProgress size={100} thickness={5}/>
                            </div>
                            :
                            budgetsList.data.length === 0 ?
                                <div style={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center"
                                }}>
                                    <SentimentDissatisfiedIcon style={{fontSize: 100}}/>
                                    <div>No Data</div>
                                </div>
                                :
                                budgetsList.data.map((budget, index) =>
                                    <Budget
                                        key={index}
                                        data={budget}
                                        // handleDeleteTransaction={handleDeleteTransaction}
                                    />)
                    }
                </List>
            </Paper>
        </div>
    )
}

export default BudgetsView