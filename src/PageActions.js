import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { DataContext } from './DataContext/DataProvider';
import LabelIcon from '@material-ui/icons/Label';

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
            backgroundColor: "rgba(0,0,0,0)",
            margin: "4px 16px !important",
        }
    }
});

export default function PageActions(props) {
    
    const { cardReady, devices, directive, getEndpointIdsByFriendlyName, unregisterDevices } = useContext(DataContext);

    const classes = useStyles();
    //const allActions = deviceStatesByFriendlyName(props.actions)
    const [allActions, setAllActions]=useState(undefined)

    useEffect(() => {
        setAllActions(getEndpointIdsByFriendlyName(props.actions, 'Actions-'+props.name))
        return function cleanup() {
            unregisterDevices('Actions-'+props.name);
        };
    // eslint-disable-next-line 
    }, [ ] )

    function runAutomation(item) {
        directive(item, 'SceneController', 'Activate')
        return true
    }

    return (
        cardReady('Actions-'+props.name) &&
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
