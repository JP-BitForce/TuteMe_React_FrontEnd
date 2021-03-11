import React, {useState} from 'react'


//Material-UI
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';

import json from '../../json/Sidebar.json'

import './SideBar.css'

const SideBar = () => {
    const [active, setItemActive] = useState({
        HOME: true,
        COURSES: false,
        ONE_STEP: false,
        TRUSTED_TUTORS: false,
        MY_CHATS: false,
        MY_PROFILE: false
    })

    const [subItemActive, setSubItemActive] = useState({
        MY_COURSES: false,
        ONLINE_COURSES: false,
        VIEW_QAs: false,
        NEW: false
    })

    const handleSetActive = (name, value) => {
        setItemActive({
            HOME: false,
            COURSES: false,
            ONE_STEP: false,
            TRUSTED_TUTORS: false,
            MY_CHATS: false,
            MY_PROFILE: false,
            [name]: value
        })
    }

    const handleSubItemSetActive = (name, value) => {
        setSubItemActive({
            MY_COURSES: false,
            ONLINE_COURSES: false,
            VIEW_QAs: false,
            NEW: false,
            [name]: value
        })
    }

    const handleOnClick = (label) => {
        handleSetActive(label,!active[label])
    }

    const handleSubItemOnClick = (label) => {
        handleSubItemSetActive(label,!subItemActive[label])
    }

    const renderListItem = (label, id) => {
        return (
            <div button onClick = {() => handleOnClick(id)} className = { active[id] ? "list_item_div active" : "list_item_div"}>
               <span>{label}</span>
            </div>
        )
    }

    const renderListWithSubItem = (label, open, subItems, id) => {
        return (
            <>
                <div button onClick = {() => handleOnClick(id)} className = { active[id] ? "list_item_div active" : "list_item_div"}>
                    <span>{label}</span>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </div>

                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div">
                        {
                            subItems.map(item => {
                                const {label, id} = item
                                return (
                                    <div 
                                        button 
                                        onClick = {() => handleSubItemOnClick(id)} 
                                        className = { subItemActive[id] ? "list_sub_item_div sub_item_active" : "list_sub_item_div"}
                                    >
                                        <span>{label}</span>
                                    </div>
                                )
                            })
                        }
                    </List>
                </Collapse>
            </>
        )
    }

    return (
        <div className = "sidebar_root">
            <div className = "sidebar">
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Nested List Items
                        </ListSubheader>
                    }
                >
                 <Divider />
                {
                    json.nav.map(item => {
                        const {label, subNav, id} = item
                        return (
                        item.subNav.length > 0 ? 
                            renderListWithSubItem(label, active[id], subNav, id) 
                            : 
                            renderListItem(label, id)
                        ) 
                    })
                }
                </List>
            </div>
        </div>
    )
}

export default SideBar
