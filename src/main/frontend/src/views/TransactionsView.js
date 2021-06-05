import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
    Avatar,
    Button, CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    List,
    Paper,
    TextField
} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus,} from "@fortawesome/free-solid-svg-icons";
import Transaction from "../components/Transaction";
import {Link, Redirect, useParams} from 'react-router-dom';
import axios from "axios";
import {getTransactions, postTransaction, unauthorizedMessage} from "../assets/properties";
import iconPicker from "../assets/iconPicker";

const useStyles = makeStyles((theme) => ({
    cardHeader: {
        display: "flex",
        height: "5em",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 2em",
    },
    headerTitle: {
        display: "flex",
        alignItems: "center",
        fontSize: "2em",
        fontWeight: "bold"
    },
    card: {
        minHeight: "30vh",
        width: "80%",
        margin: "20vh auto 2em auto",
        borderRadius: "1em",
    },
    avatarHeader: {
        width: "2em",
        height: "2em",
        fontSize: "0.9em",
        marginRight: "1em"
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
    link: {
        color: "inherit",
        display: "flex",
        textDecoration: "none"
    }
}));

const transactions = [
    {
        title: "Boots",
        day: "01",
        date: "Saturday, November 2021",
        key: 1
    },
    {
        title: "Jeans",
        day: "12",
        date: "Saturday, November 2021",
        key: 2
    },
    {
        title: "Jacket",
        day: "13",
        date: "Saturday, November 2021",
        key: 3
    },
    {
        title: "T-shirt",
        day: "22",
        date: "Saturday, November 2021",
        key: 4
    },
    {
        title: "Hat",
        day: "30",
        date: "Saturday, November 2021",
        key: 5
    },
]

function comparator(a, b) {
    return (a.date > b.date) ? 1 : (a.date === b.date) ? ((a.date > b.date) ? 1 : -1) : -1
}

const TransactionView = (props) => {
    const classes = useStyles();
    const {id} = useParams();
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState({});
    const [transactionsList, setTransactionsList] = useState({
        isLoaded: false,
        data: []
    });
    const [transaction, setTransaction] = useState({
        name: "",
        value: "",
        date: ""
    });
    const jwtConfig = {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        }
    };
    const setLogged = props.setLogged;

    useEffect(() => {
        axios.get(getTransactions + id, jwtConfig)
            .then(resp => {
                const {transactions, ...categoryInfo} = resp.data;
                setCategory(categoryInfo);
                setTransactionsList({isLoaded: true, data: transactions.sort(comparator)});
            })
            .catch(() => {
                setLogged(() => ({
                    redirect: true,
                    message: unauthorizedMessage
                }));
            });
    }, [])

    const handleAddTransaction = () => {
        axios.post(postTransaction + id, transaction, jwtConfig)
            .then(resp => {
                setTransactionsList(prev => ({isLoaded: true, data: [...prev.data, resp.data].sort(comparator)}));
            });

        setOpen(false);
        setTransaction({
            name: "",
            value: "",
            date: ""
        });
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTransaction({
            name: "",
            value: "",
            date: ""
        });
        console.log(transactionsList.data)
    };

    const handleChangeName = (e) => {
        let tempTransaction = {...transaction};
        switch (e.target.id) {
            case "TransactionName":
                tempTransaction.name = e.target.value;
                break;
            case "TransactionValue":
                tempTransaction.value = e.target.value;
                break;
            case "TransactionDay":
                tempTransaction.date = e.target.value;
                if (tempTransaction.date > 31)
                    tempTransaction.date = 31;
                else if (tempTransaction.date < 0)
                    tempTransaction.date = 0;
                break;
        }
        setTransaction(tempTransaction);
    }


    return (
        <div>
            <Paper elevation={5} classes={{root: classes.card}}>
                <div className={classes.cardHeader}>
                    <Link to="/categories" className={classes.link}>
                        <div className={classes.headerTitle}>
                            <Avatar classes={{root: classes.avatarHeader}} style={{background: category.color}}>
                                <FontAwesomeIcon icon={iconPicker(category.icon)} style={{color: "#ffffff"}}/>
                            </Avatar>
                            {category.typeName}
                        </div>
                    </Link>
                    <Button
                        variant="contained"
                        classes={{root: classes.addButton}}
                        color="primary"
                        startIcon={<FontAwesomeIcon icon={faPlus}/>}
                        onClick={handleClickOpen}
                    >
                        Add Transaction
                    </Button>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Add Transaction</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Create a transaction. Set transaction name and value.
                            </DialogContentText>
                            <TextField id="TransactionName" className="TextInput" label="Name" variant="outlined"
                                       classes={{root: classes.dialogInputs}} onChange={handleChangeName}
                                       value={transaction.name} type="text"/>
                            <TextField id="TransactionValue" className="TextInput" label="Value" variant="outlined"
                                       classes={{root: classes.dialogInputs}} onChange={handleChangeName}
                                       value={transaction.value} type="number"/>
                            <TextField id="TransactionDay" className="TextInput" label="Day of month"
                                       variant="outlined"
                                       classes={{root: classes.dialogInputs}} onChange={handleChangeName}
                                       value={transaction.date} type="number"/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleAddTransaction} color="primary">
                                Confirm
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <Divider/>
                <List classes={{root: classes.list}}>
                    {
                        !transactionsList.isLoaded ?
                            <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                                <CircularProgress size={100} thickness={5}/>
                            </div>
                            :
                            transactionsList.data.length === 0 ?
                                <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                                    No Data
                                </div>
                                :
                                transactionsList.data.map((transaction, index) => <Transaction key={index}
                                                                                               data={transaction}/>)
                    }
                </List>
            </Paper>
        </div>
    )
}

export default TransactionView