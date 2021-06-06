import React, {useEffect, useState} from "react";
import Category from "../components/Category";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Link} from 'react-router-dom';
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
    List,
    ListItemAvatar,
    MenuItem,
    Paper,
    Select,
    TextField
} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {
    authTokenName,
    getCategoriesURL,
    getCategoryTypesURL,
    postCategory,
    unauthorizedMessage
} from "../assets/properties";
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


const CategoriesView = (props) => {
    const classes = useStyles();
    const [date, setDate] = useState('2021-04');
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [categoriesTypes, setCategoriesTypes] = useState([]);
    const [categories, setCategories] = useState({
        isLoaded: false,
        data: []
    });
    const jwtConfig = {
        headers: {
            Authorization: "Bearer " + localStorage.getItem(authTokenName)
        }
    };
    const setLogged = props.setLogged;

    useEffect(() => {
        axios.get(getCategoriesURL, jwtConfig)
            .then(resp => {
                setCategories({isLoaded: true, data: resp.data});
            })
            .catch(() => {
                setLogged(() => ({
                    redirect: true,
                    message: unauthorizedMessage
                }));
            });

        axios.get(getCategoryTypesURL, jwtConfig)
            .then(resp => {
                console.log(resp.data)
                setCategoriesTypes(resp.data);
            })
    }, [])

    const handleAddCategory = () => {
        if (selectedCategory.length !== 0) {
            axios.post(postCategory, {
                ...selectedCategory,
                date: date
            }, jwtConfig)
                .then(resp => {
                    setCategories((prev) => ({isLoaded: true, data: [...prev.data, resp.data]}));
                });

            setOpen(false);
            setSelectedCategory([]);
        } else {
            alert("No category was selected");
        }
    }

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
                        !categories.isLoaded ?
                            <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                                <CircularProgress size={100} thickness={5}/>
                            </div>
                            :
                            categories.data.length === 0 ?
                                <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                                    No Data
                                </div>
                                :
                                categories.data.map((category) =>
                                    <Link to={"/transactions/" + category.id}
                                          className={classes.link}
                                          key={category.id}>
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