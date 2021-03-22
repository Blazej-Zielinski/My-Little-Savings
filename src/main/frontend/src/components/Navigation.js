import React from "react";
import {Drawer, List, ListItem, ListItemIcon, ListItemText, Divider} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWallet, faPiggyBank, faFileAlt, faUser, faTv, faCog, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import "../css/components/Navigation.css";
import makeStyles from "@material-ui/core/styles/makeStyles";

const dataForList = [
    {
        text: "Transactions",
        icon: <div className="IconBox"><FontAwesomeIcon icon={faWallet}/></div>,
        index: 1
    },
    {
        text: "Budgets",
        icon: <div className="IconBox"><FontAwesomeIcon icon={faPiggyBank}/></div>,
        index: 2
    },
    {
        text: "Summary",
        icon: <div className="IconBox"><FontAwesomeIcon icon={faFileAlt}/></div>,
        index: 3
    },
    {
        text: "My profile",
        icon: <div className="IconBox"><FontAwesomeIcon icon={faUser}/></div>,
        index: 4
    },
    {
        text: "Theme",
        icon: <div className="IconBox"><FontAwesomeIcon icon={faTv}/></div>,
        index: 5
    },
    {
        text: "Settings",
        icon: <div className="IconBox"><FontAwesomeIcon icon={faCog}/></div>,
        index: 6
    },
    {
        text: "Log out",
        icon: <div className="IconBox"><FontAwesomeIcon icon={faSignOutAlt}/></div>,
    }
]

const useStyles = makeStyles((theme) =>({
    paper: {
        background: "#18202C",
        color: "#BBB7B7",
        width: 240
    }
}));

const Navigation = (props) => {
    //ToDo it might be helpful when doing responsive design
    // const [isOpen, setIsOpen] = useState(true);
    // const toggleDrawer = () => (event) => {
    //     if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    //         return;
    //     }
    //     setIsOpen(!isOpen);
    // };

    const styles = useStyles();

    return (
        <nav className="Navigation">
            <Drawer
                variant="permanent"
                classes={{paper: styles.paper}}>
                <div className="NavigationTitle">
                    <h1>My Little Savings</h1>
                </div>
                <Divider className="LightDivider"/>
                <h2>Finances</h2>
                <List>
                    {dataForList.slice(0,3).map((item)=>(
                        <ListItem button key={item.text} id={props.selected === item.index ? "selected" : ""} className="NavItem">
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </ListItem>
                    ))}
                </List>
                <Divider className="LightDivider"/>
                <h2>About me</h2>
                <List>
                    {dataForList.slice(3,6).map((item)=>(
                        <ListItem button key={item.text} id={props.selected === item.index ? "selected" : ""} className="NavItem">
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </ListItem>
                    ))}
                </List>
                <Divider className="LightDivider"/>
                <List>
                    {dataForList.slice(6,7).map((item)=>(
                        <ListItem button key={item.text} id={props.selected === item.index ? "selected" : ""} className="NavItem">
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </nav>
    )
}

export default Navigation;