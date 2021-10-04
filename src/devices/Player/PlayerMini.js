import React from 'react';
import { makeStyles } from '@material-ui/styles';

import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import ListItemText from '@material-ui/core/ListItemText';

import GridItem from "components/GridItem"

const useStyles = makeStyles({

    list: {
        width: "100%",
        minHeight: 72,
    },
    topListItem: {
        minHeight: 8,
        padding: "0 24px",
    },
    bottomListItem: {
        minHeight: 72,
    },
    cornerChip: {
        position: "absolute",
        top: 16,
        right: 16,
    }
});


export default function PlayerBase(props) {
    
    const classes = useStyles();
    const serverurl="https://"+window.location.hostname;
    
    function addDefaultSrc(ev){
        // allow unique logos per adapter
        ev.target.src = '/image/'+props.player.endpointId.split(':')[0]+'/logo'
    }

    return (
        <GridItem wide={props.wide} nopad={true}>
            <ListItem className={classes.bottomListItem} onClick={ () => props.setMini(false)} >
                <ListItemAvatar>
                    <Avatar onError={addDefaultSrc} src={serverurl+props.player.MusicController.art.value} />
                </ListItemAvatar>
                { props.player.MusicController.title.value!=='' ?
                    <ListItemText primary={ props.player.MusicController.title.value+" - "+props.player.MusicController.artist.value } 
                                    secondary={props.player.friendlyName}/>
                    :
                    <ListItemText primary={ props.small ? props.player.friendlyName : 'No music selected.'} secondary={ props.small ? 'No music selected.' : null } />
                }
            </ListItem>
        </GridItem>
    );
}
