import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { DataContext } from './DataContext/DataProvider';
import ListIcon from '@material-ui/icons/List';

import ListItem from '@material-ui/core/ListItem';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

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
            backgroundColor: theme.palette.layer.card,
        }
    }
});

export default function PageActions(props) {
    
    const { directive, deviceStatesByFriendlyName } = useContext(DataContext);

    const classes = useStyles();
    const allActions = deviceStatesByFriendlyName(props.actions)

    function runAutomation(name) {
        directive(name, 'SceneController', 'Activate')
        return true
    }

    return (
        <ListItem className={classes.listItem} >
        { allActions.map( item => 
            <Chip
                className={classes.chip}
                key={ item.endpointId }
                avatar={<Avatar  className={classes.avatar}> <ListIcon /></Avatar>}
                label={ item.friendlyName }
                clickable
                onClick={ () => runAutomation(item.endpointId) }
              />        
        )}
        </ListItem>
    );
}
