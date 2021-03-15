import React  from 'react'


//Material-UI
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';

import json from '../../json/Sidebar.json'
import './SideBar.css'

const SideBar = ({itemOnClick, subItemOnClick, active, subItemActive}) => {

    const handleOnClick = (label) => {
        itemOnClick(label,!active[label])
    }

    const handleSubItemOnClick = (label) => {
        subItemOnClick(label,!subItemActive[label])
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
                            <div className = "logo_div"/>
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
                <Divider />
                </List>
            </div>
        </div>
    )
}

export default SideBar
