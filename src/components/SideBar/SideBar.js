import React, {useState}  from 'react'

//Material-UI
import List from '@material-ui/core/List';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

import routes from '../../route/sideBarRoutes'
import './SideBar.css'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
    },
    nested: {
      paddingLeft: theme.spacing(5),
    },
    listItem: {
        color: "white",
        fontSize:'1.1em',
        fontFamily: [
            'Gill Sans',
            'Gill Sans MT',
            'Calibri',
            'Trebuchet MS',
            'sans-serif'
        ].join(','),
    },
    subItems: {
        color: "white",
        fontSize:'0.9em',
        fontFamily: [
            'Gill Sans',
            'Gill Sans MT',
            'Calibri',
            'Trebuchet MS',
            'sans-serif'
        ].join(','),
    },
    active: {
        backgroundColor: "#555"
    },
}));

const SideBar = ({itemOnClick, active}) => {
    const classes = useStyles()
    const [open, setOpen] = useState("")

    const handleSetOpen = (id) => {
        console.log(open, id)
        if (open === id) {
            setOpen("")
            return
        }
        setOpen(id)
    }

    const handleOnClick = (id) => {
        itemOnClick(id)
    }

    const navItem = (label, id) => {
        return (
            <ListItem button key={label} onClick={() => handleOnClick(id)} className = {active === id && classes.active}>
                <ListItemText classes={{primary:classes.listItem}} primary={label} />
            </ListItem>
        )
    }

    const navsubItem = (label, subItems, id) => {
        return (
            <div>
                <ListItem button key={label} onClick={() => {handleSetOpen(id)}}>
                    <ListItemText classes={{primary:classes.listItem}} primary={label}/>
                    { open === id ? <ExpandLess color="secondary"/> : <ExpandMore color="secondary"/> }
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
                                        className={
                                            [ classes.nested, active === id && classes.active]
                                        } 
                                    >
                                        <ListItemText 
                                            classes={{primary:classes.subItems}} 
                                            primary={name} 
                                        />
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Collapse>
            </div>
        )
    }

    const renderNavigations = () => {
        const userRole = "USER_STUDENT"
        return (
            <List className={classes.root}>
                {
                    routes.filter(({acceptUserRole}) => acceptUserRole === userRole).map((item)=> {
                        const {name, children, id} = item
                        return (
                            children.length > 0 ? 
                            navsubItem(name, children, id)
                            :
                            navItem(name, id)
                        )
                    })
                }
            </List>
        )
    }

    return (
        <div className = "sidebar_root">
            { renderNavigations() }
        </div>
    )
}

export default SideBar
