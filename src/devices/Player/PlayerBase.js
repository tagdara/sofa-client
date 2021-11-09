import React from 'react';
import { selectPage } from 'store/layoutHelpers'
import { makeStyles } from '@mui/styles';

import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';

import IconButton from '@mui/material/IconButton';
import ViewModuleIcon from '@mui/icons-material/ViewModule';

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
    
    console.log('player',props.player)
    const classes = useStyles();
    const serverurl="https://"+window.location.hostname;
    
    function addDefaultSrc(ev){
        // allow unique logos per adapter
        ev.target.src = '/image/'+props.player.endpointId.split(':')[0]+'/logo'
    }
    
    function setGroupPlayer(thisplayer) {
        selectPage('PlayerGroup',{ 'player': thisplayer})
    }
    
    function getPlayerByEndpointId(endpointId) {
        for (var i = 0; i < props.devices.length; i++) {
            if (props.devices[i].endpointId===endpointId) {
                return props.devices[i].friendlyName
            }
        }
        return ''
    }
 
    return (
        props.player && (props.player.friendlyName===props.player.InputController.input.value || props.player.InputController.input.value==='') ? 
            <GridItem wide={props.wide}>
                { props.small ? null :
                    <React.Fragment>
                        <List className={classes.list} >
                        <ListItem className={classes.topListItem}> 
                            <ListItemText variant="body2" primary={props.player.friendlyName}  onClick={ () => {  props.setUserPlayer(props.player.endpointId)} }/>
                        </ListItem>
                        {props.player.MusicController.linked.value.map(link =>
                            <ListItem className={classes.topListItem} key={ link+"link" }>
                                <ListItemText variant="body2" primary={getPlayerByEndpointId(link)} />
                            </ListItem>)
                        }
                        </List>
                        <Chip label={ 'Group' } className={ classes.cornerChip } onClick={ () => setGroupPlayer(props.player.endpointId)} />
                    </React.Fragment>
                }
                <ListItem className={classes.bottomListItem} onClick={ () => props.setUserPlayer(props.player.endpointId)} >
                    <ListItemAvatar>
                        <Avatar onError={addDefaultSrc} src={serverurl+props.player.MusicController.art.value} />
                    </ListItemAvatar>
                    { props.player.MusicController.title.value!=='' ?
                        <ListItemText primary={ props.small ? props.player.friendlyName : props.player.MusicController.title.value } 
                                        secondary={props.small ? props.player.MusicController.title.value+" - "+props.player.MusicController.artist.value : props.player.MusicController.artist.value }/>
                        :
                        <ListItemText primary={ props.small ? props.player.friendlyName : 'No music selected.'} secondary={ props.small ? 'No music selected.' : null } />
                    }
                    { !props.small ? null : 
                        <ListItemSecondaryAction>
                            <IconButton onClick={(e) => selectPage('PlayersLayout',{'player':props.player.endpointId})} >
                                <ViewModuleIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    }
                </ListItem>
            </GridItem>
        : null
    );
}