import React, {useState} from 'react'

//Material-UI
import List from '@material-ui/core/List';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'; 
import { makeStyles } from '@material-ui/core/styles';

import Dashboard from '@material-ui/icons/Dashboard';
import Grain from '@material-ui/icons/Grain';
import CastForEducation from '@material-ui/icons/CastForEducation';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import Person from '@material-ui/icons/Person';
import Description from '@material-ui/icons/Description';
import RateReview from '@material-ui/icons/RateReview';
import Today from '@material-ui/icons/Today';
import Payment from '@material-ui/icons/Payment';
import ExitToApp from '@material-ui/icons/ExitToApp';

import avatar from '../../assets/images/shared/minimal_avatar.jpg'
import './SideBar.css'
import routes from '../../route/routes'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 400,
    },
    avatar: {
        width: "30%",
    },
    info: {
        display: "flex",
        flexDirection: "column",
        textAlign: "left"
    },
    primary: {
        fontSize: "1rem",
    },
    secondary: {
        color: "#555",
        fontFamily : "Be Vietnam",
        fontSize: "0.8rem",
    },
    categoty_head: {
        fontWeight: "550",
        marginLeft: "10%",
        color: "#555"
    },
    nav_item: {
        color: "#5D6D7E",
        fontFamily : "Be Vietnam",
    },
    nav_item_block: {
        display: "flex",
        flexDirection: "row",
        marginLeft: "5%",
        width: "95%",
    },
    nav_item_text :{
        marginLeft: "8%",
        fontSize: "1rem",
    },
    nav_item_active: {
        borderRight: `3px solid #21618C`,
        backgroundColor: "#EBF5FB",
        color: "#21618C"
    },
    nested: {
        paddingLeft: theme.spacing(7),
        fontSize: "0.9rem",
    },
    expand_icon : {
        marginLeft: "35%"
    },
    nav_subItem_text: {
        fontSize: "0.7rem",
        color: "#5D6D7E",
        fontWeight: "550"
    }
}));

const SideBarAlt = ({itemOnClick, active}) => {
    const styles = useStyles()
    const [open, setOpen] = useState("")
    const userRole = "USER_STUDENT"
    const icons = {
        HOME : <Dashboard/>,
        COURSES : <Grain/>,
        ONE_STEP : <CastForEducation/>,
        TRUSTED_TUTORS : <SupervisorAccount/>,
        MY_PROFILE : <Person/>,
        BLOG : <Description/>,
        MY_CHATS : <RateReview/>,
        CALENDAR : <Today/>,
        PAYMENTS : <Payment/>,
        SIGN_OUT : <ExitToApp/>
    }

    const handleSetOpen = (id) => {
        if (open === id) {
            setOpen("")
            return
        }
        setOpen(id)
    }

    const handleOnClick = (id) => {
        itemOnClick(id)
    }

    const renderNavItem = (label, id) => {
        return (
            <ListItem 
                button 
                className = {[styles.nav_item, active === id && styles.nav_item_active]}
                onClick={() => handleOnClick(id)}
            >
                <div className = {styles.nav_item_block}>
                    {icons[id]}
                    <span className = "nav_item_text">{label}</span>
                </div>
            </ListItem>
        )
    }

    const renderWithSubItems = (name, subItems, id) => {
        return (
            <div>
                <ListItem 
                    button 
                    className = {[styles.nav_item, active === id && styles.nav_item_active]} 
                    onClick={() => {handleSetOpen(id)}}
                >
                    <div className = {styles.nav_item_block}>
                        {icons[id]}
                        <span className = "nav_item_text">{name}</span>
                        <div className = {styles.expand_icon}>
                            { open === id ? <ExpandLess color="primary"/> : <ExpandMore color="primary"/> }
                        </div>
                    </div>
                </ListItem>
                <Collapse in={open === id} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {
                            subItems.map(item => {
                                const {name, id} = item
                                return (
                                    <ListItem 
                                        button 
                                        onClick={() => handleOnClick(id)}
                                        className={[ styles.nested]} 
                                    >
                                        <span className = {["dot", active === id && "dot_active"].join(" ")}/>
                                        <span className = {styles.nav_subItem_text}>{name}</span>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Collapse>
            </div>
        )
    }

    return (
        <div className = {styles.root}>
            <div className = "profile_card">
                <div className = {styles.avatar}>
                    <Avatar src = {avatar}/>
                </div>
                <div className = {styles.info}>
                    <span className = {styles.primary}>Allan Nickman</span>
                    <span className = {styles.secondary}>admin</span>
                </div>
            </div>
            <div className = "navigations_root">
                {
                    routes.sidebarNav.map(item => {
                        const {caption, navs} = item
                        return (
                            <div className = "navigation_category_content">
                                <Typography variant="caption" className = {styles.categoty_head}>{caption}</Typography>
                                <List className = {styles.navList_root}>
                                    {
                                        navs
                                        .filter(({acceptUserRole}) => acceptUserRole === userRole)
                                        .map((item) => {
                                            const {name, children, id} = item
                                            return (
                                                children.length > 0 ?
                                                renderWithSubItems(name, children, id)
                                                :
                                                renderNavItem(name, id)
                                            )
                                        })
                                    }
                                </List>
                            </div>
                        )
                    })
                }
                { renderNavItem("SIGN-OUT", "SIGN_OUT") }
            </div>
        </div>
    )
}

export default SideBarAlt