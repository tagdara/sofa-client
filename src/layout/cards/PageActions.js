import React from 'react';
import { makeStyles } from '@mui/styles';
import { devicesByFriendlyName, endpointIdsByFriendlyName } from 'store/deviceHelpers';
import { directive } from 'store/directive';
import LabelIcon from '@mui/icons-material/Label';

import ListItem from '@mui/material/ListItem';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';

const useStyles = makeStyles(theme => {
    return {       
        chip: {
            flexGrow: 1,
            width: "100%",
            margin: "0 0 8px 0",
            height: 48,
            borderRadius: 4,
            justifyContent: "start",
            backgroundColor: theme.palette.layer.card,
            '&:hover': {
                borderColor: theme.palette.primary.dark,
            }            
        },
        listItem: {
            display: "flex",
            flexWrap: "wrap",
            padding: 4,
        },
        avatar: {
            color: theme.palette.layer.card,
            backgroundColor: "rgba(0,0,0,0)",
            margin: "4px 16px !important",
        }
    }
});

export default function PageActions(props) {
    
    const allActions = endpointIdsByFriendlyName(props.actions)
    const devices = devicesByFriendlyName(props.actions)
    const classes = useStyles();

    function runAutomation(item) {
        directive(item, 'SceneController', 'Activate')
        return true
    }

    return (
        <ListItem className={classes.listItem} >
        { allActions.map( item => 
            <Chip
                className={classes.chip}
                key={ item }
                avatar={<Avatar  className={classes.avatar}> <LabelIcon /></Avatar>}
                label={ devices[item].friendlyName }
                clickable
                onClick={ () => runAutomation(item) }
              />        
        )}
        </ListItem>
    );
}
