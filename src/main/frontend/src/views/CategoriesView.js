import React, {useState, useEffect} from "react";
import Navigation from "../components/Navigation";
import Header from "../components/Header";
import Category from "../components/Category";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {green, orange, purple, blue, red} from '@material-ui/core/colors';
import {Link} from 'react-router-dom';
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
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {getCategoriesURL, postCategory, jwtConfig, jwt, heroku} from "../assets/properties";
import iconPicker from "../assets/iconPicker";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    categoriesView: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        minHeight: "100vh",
        float: "right",
        backgroundColor: "#EAEFF1",
        paddingTop: theme.spacing(3),
        [theme.breakpoints.down('xs')]: {
            width: `100%`,
            marginLeft: 0,
        },
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
        margin: "20vh auto 2em auto",
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
    link: {
        color: "inherit",
        display: "flex",
        textDecoration: "none"
    },
}));

const categoriesDummyData = [
    {
        id: 1,
        typeName: "Shopping",
        color: orange[500],
        icon: "faShoppingCart"
    },
    {
        id: 2,
        typeName: "Travel",
        color: green[500],
        icon: "faPlane",
    },
    {
        id: 3,
        typeName: "Entertainment",
        color: blue[500],
        icon: "faSmileBeam",
    },
    {
        id: 4,
        typeName: "Bills",
        color: purple[500],
        icon: "faFileInvoiceDollar",
    },
    {
        id: 5,
        typeName: "Clothes",
        color: red[500],
        icon: "faTshirt",
    },
]


// axios.interceptors.request.use(
//     config => {
//         config.headers.authorization = `Bearer ${jwt}`
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// )

const CategoriesView = () => {
    const classes = useStyles();
    const [date, setDate] = useState('2021-04');
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [categories,setCategories] = useState([]);

    useEffect(() =>{
        axios.get(getCategoriesURL,jwtConfig).then(resp => {
            setCategories(resp.data);
        });
    },[])

    const handleAddCategory = () => {
        axios.post(postCategory,{
            ...selectedCategory,
            date: date
        }).then(resp => {
            setCategories((prev) => [...prev,resp.data]);
        });

        setOpen(false);
        setSelectedCategory([]);
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedCategory([]);
    };

    const handleDateChange = (date) => {
        setDate(date.value);
    };

    return (
        <div id="CategoriesViewContainer" className={classes.categoriesView}>
            <Header title="Categories" handleDrower={handleDrawerToggle}/>
            <Navigation data={{selected: 1, mobileOpen: mobileOpen, handleDrawerToggle: handleDrawerToggle}}/>
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
                            {categoriesDummyData.map((category, index) => (
                                <MenuItem key={index} value={category}>
                                    <ListItemAvatar>
                                        <Avatar classes={{root: classes.avatar}} style={{background: category.color}}>
                                            <FontAwesomeIcon icon={iconPicker(category.icon)} style={{color: "#ffffff"}}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    {category.typeName}
                                </MenuItem>
                            ))}
                        </Select>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleAddCategory} color="primary">
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
                <List classes={{root: classes.list}}>
                    {
                        categories.map((category) =>
                            <Link to={"/transactions/" + category.id} className={classes.link} key={category.id}>
                                <Category data={category} iconImg={iconPicker(category.icon)}/>
                            </Link>
                        )
                    }
                </List>
            </Paper>
        </div>
    )
}

export default CategoriesView