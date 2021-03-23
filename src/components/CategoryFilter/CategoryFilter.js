import React from 'react'

//Material-UI
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

import './CategoryFilter.css'

const CategoryFilter = ({title, options, handleToggle, checked}) => {
    return (
        <div className = "category_container">
            <h3>{title}</h3>
            {
                options.map((item, index) => {
                    const labelId = `checkbox-list-label-${index}`;
                    return (
                        <ListItem key={index} role={undefined} dense button onClick={() => handleToggle(index)}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(index) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} secondary={item} />
                        </ListItem>
                    )
                })
            }
        </div>
    )
}

export default CategoryFilter
