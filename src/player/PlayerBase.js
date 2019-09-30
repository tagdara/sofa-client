import React, { useContext } from 'react';
import { LayoutContext } from '../layout/NewLayoutProvider';
import { makeStyles } from '@material-ui/styles';

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import IconButton from '@material-ui/core/IconButton';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

import GridItem from "../GridItem"

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
    const { applyLayoutCard } = useContext(LayoutContext);
    const serverurl="https://"+window.location.hostname;
    
    function addDefaultSrc(ev){
        // allow unique logos per adapter
        ev.target.src = '/image/'+props.player.endpointId.split(':')[0]+'/logo'
    }
    
    function setGroupPlayer(thisplayer) {
        applyLayoutCard('PlayerGroup',{ 'player': thisplayer})
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
                            <ListItemText variant="body2" primary={props.player.friendlyName}  onClick={ () => {  props.setUserPlayer(props.endpointId)} }/>
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
                            <IconButton onClick={(e) => applyLayoutCard('PlayersLayout',{'player':props.player.endpointId})} >
                                <ViewModuleIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    }
                </ListItem>
            </GridItem>
        : null
    );
}
