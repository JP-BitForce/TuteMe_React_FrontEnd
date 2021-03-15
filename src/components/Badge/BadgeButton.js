import React from 'react'

import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';

const BadgeButton = ({content, icon, onClick}) => {
    return (
        <IconButton aria-label="show" color="primary" onClick = {onClick}>
            <Badge badgeContent={content} color="secondary">
                {icon}
            </Badge>
        </IconButton>
    )
}

export default BadgeButton
