import makeStyles from "@material-ui/core/styles/makeStyles";
import React, {useEffect, useState} from "react";
import Navigation from "../components/Navigation";
import Header from "../components/Header";
import {Redirect, Route} from "react-router-dom";
import CategoriesView from "./CategoriesView";
import TransactionView from "./TransactionsView";
import BudgetsView from "./BudgetsView";
import SummaryView from "./SummaryView";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    container: {
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
    }
}))

const WithContainer = (props) => {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [selectedNavItem, setSelectedNavItem] = useState(0);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const [logged, setLogged] = useState({
        redirect: false,
        message: ""
    });

    useEffect(() => {
        switch (props.match.path) {
            case "/categories":
                setSelectedNavItem(1);
                break;
            case "/budgets":
                setSelectedNavItem(2);
                break;
            case "/summary":
                setSelectedNavItem(3);
                break;
            default:
                setSelectedNavItem(1);
        }
    })

    return (
        logged.redirect ?
            <Redirect to={{pathname: "/login", message: logged.message}}/>
            :
            <div className={classes.container}>
                <Navigation data={{
                    selected: selectedNavItem,
                    mobileOpen: mobileOpen,
                    handleDrawerToggle: handleDrawerToggle,
                    setLogged: setLogged
                }}/>
                <Header title="Categories" handleDrower={handleDrawerToggle}/>
                <Route
                    exact
                    path="/categories"
                    render={props => <CategoriesView {...props} setLogged={setLogged}/>}
                />
                <Route
                    exact
                    path="/transactions/:id"
                    render={props => <TransactionView {...props} setLogged={setLogged}/>}/>
                <Route
                    exact
                    path="/budgets"
                    render={props => <BudgetsView {...props} setLogged={setLogged}/>}/>
                <Route
                    exact
                    path="/summary"
                    render={props => <SummaryView {...props} setLogged={setLogged}/>}/>
            </div>
    )
}

export default WithContainer;