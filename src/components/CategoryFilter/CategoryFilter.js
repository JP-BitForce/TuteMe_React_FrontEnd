import React from 'react'

//Material-UI
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';

import './CategoryFilter.css'

const useStyles = makeStyles((theme) => ({
    ListItem: {
        display: "flex",
        flexDirection: "row",
        textAlign: "left",
        alignItems: "center",
    }
}));

const CategoryFilter = ({title, options, handleToggle, checked, handleLoadMore, total}) => {
    const classes = useStyles();
    return (
        <div className = "category_container" key = {title}>
            <h3>{title}</h3>
            {
                options.map((item, index) => {
                    const labelId = `checkbox-list-label-${index}`;
                    return (
                        <div key={index} onClick={() => handleToggle(title, index)} className = {classes.ListItem}>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(index) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                    color = "primary"
                                />
                            <ListItemText id={labelId} secondary={item} />
                        </div>
                    )
                })
            }
            {
                total > 5 && (
                    <div className = "load_more" onClick = {() => handleLoadMore(title)}>
                        {
                            total === options.length ? <p>Show Less</p> : <p>Show More</p>
                        }
                    </div>
                )
            }
        </div>
    )
}

export default CategoryFilter
