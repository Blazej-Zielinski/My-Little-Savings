import React, {useState} from "react";
import Navigation from "../components/Navigation";
import Header from "../components/Header";
import Category from "../components/Category";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {green, orange, purple, blue, red} from '@material-ui/core/colors';
import {
    Paper,
    TextField,
    Divider,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText,
    List,
    Select,
    MenuItem, ListItemAvatar, Avatar
} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faShoppingCart,
    faSmileBeam,
    faPlane,
    faFileInvoiceDollar,
    faTshirt
} from "@fortawesome/free-solid-svg-icons";


const useStyles = makeStyles((theme) => ({
    categoriesView: {
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
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "10em",
    },
    addButton: {
        background: "#009BE5",
        color: "#ffffff",
        '&:hover': {
            backgroundColor: "#008AD4",
        }
    },
    list: {
        padding: theme.spacing(3)
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
}));

const categories = [
    {
        title: "Shopping",
        icon: faShoppingCart,
        color: orange[500],
        key: 1
    },
    {
        title: "Entertainment",
        icon: faSmileBeam,
        color: blue[500],
        key: 2
    },
    {
        title: "Travel",
        icon: faPlane,
        color: green[500],
        key: 3
    },
    {
        title: "Bills",
        icon: faFileInvoiceDollar,
        color: purple[500],
        key: 4
    },
    {
        title: "Clothes",
        icon: faTshirt,
        color: red[500],
        key: 5
    },
]

const CategoriesView = () => {
    const classes = useStyles();
    const [date, setDate] = useState('2014-08');
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState([]);

    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDateChange = (date) => {
        setDate(date.value);
    };

    return (
        <div id="CategoriesViewContainer" className={classes.categoriesView}>
            <Header title="Categories"/>
            <Navigation selected={1}/>
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
                        Add Category
                    </Button>
                </div>
                <Divider/>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add Category</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Choose a category you want to create
                        </DialogContentText>
                        <Select
                            labelId="select"
                            id="categorySelect"
                            value={selectedCategory}
                            onChange={handleChange}
                            style={{width: "100%"}}
                            classes={{root: classes.select}}

                        >
                            {categories.map((category, index) => (
                                <MenuItem key={index} value={category}>
                                    <ListItemAvatar>
                                        <Avatar classes={{root: classes.avatar}} style={{background: category.color}}>
                                            <FontAwesomeIcon icon={category.icon} style={{color: "#ffffff"}}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    {category.title}
                                </MenuItem>
                            ))}
                        </Select>
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
                <List classes={{root: classes.list}}>
                    {categories.map((category, index) => <Category key={index} data={category}/>)}
                </List>
            </Paper>
        </div>
    )
}

export default CategoriesView