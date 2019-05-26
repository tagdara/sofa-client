import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import { makeStyles } from '@material-ui/styles';
import GridItem from '../GridItem';

const useStyles = makeStyles({

    listItem: {
        width: '100%',
        minHeight: 48,
        padding: "12px 0",
    }
});

export default function NoPlayer(props) {
    
    const classes = useStyles();
    return (
            <GridItem wide={props.wide} >
                <ListItem onClick={ () => props.setLayoutCard('PlayersLayout',{})}>
                    <Avatar ><QueueMusicIcon /></Avatar>
                    <ListItemText primary={"Waiting for player data"} />
                </ListItem>
            </GridItem>
    );

}
