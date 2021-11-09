import React from 'react';

import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

import ClearIcon from '@mui/icons-material/Clear';

import GridItem from 'components/GridItem'


export default function AdapterStatus(props) { 

    return (
        <GridItem wide={true} >
            <ListItem>
                <TextField
                    fullWidth={true}
                    multiline={true}
                    label={props.name}
                    value={props.status}
                />                
                <ListItemSecondaryAction>
                    <IconButton onClick={ () => props.clear() } >
                        <ClearIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
       </GridItem>
    );
}

