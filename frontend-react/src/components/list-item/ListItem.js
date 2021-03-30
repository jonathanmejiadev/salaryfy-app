import React from 'react'
import { IconButton, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import DeleteIcon from '@material-ui/icons/Delete';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';

const ListItem = () => {
    return (
        <ListItem >
            <ListItemIcon>
                <ImportantDevicesIcon />
            </ListItemIcon>
            <ListItemText primary={'Job: '} />
            <ListItemText primary={'Earnings: '} />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                    <AddShoppingCartIcon color="primary" />
                </IconButton>
                <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>

        </ListItem>
    )
}

export default ListItem;
