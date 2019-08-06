import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withLayout } from '../layout/NewLayoutProvider';
import { withUser } from '../user/UserProvider';

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
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


function Sonos(props) {
    
    const classes = useStyles();

    function addDefaultSrc(ev){
        ev.target.src = '/image/sonos/logo'
    }
    
    function setGroupPlayer(thisplayer) {
        props.applyLayoutCard('PlayerGroup',{ 'player': thisplayer})
    }
    
    function getPlayerByEndpointId(endpointId) {
        for (var i = 0; i < props.devices.length; i++) {
            if (props.devices[i].endpointId==endpointId) {
                return props.devices[i].friendlyName
            }
        }
        return ''
    }
 
    return (
        props.player.endpointId===props.deviceProperties.input || props.deviceProperties.input==''? 
            <GridItem wide={props.wide}>
                { props.small ? null :
                    <React.Fragment>
                        <List className={classes.list} >
                        <ListItem className={classes.topListItem}> 
                            <ListItemText variant="body2" primary={props.name}  onClick={ () => {  props.changePlayer(props.endpointId)} }/>
                        </ListItem>
                        {props.deviceProperties.linked.map(link =>
                            <ListItem className={classes.topListItem} key={ link+"link" }>
                                <ListItemText variant="body2" primary={getPlayerByEndpointId(link)} />
                            </ListItem>)
                        }
                        </List>
                        <Chip label={ 'Group' } className={ classes.cornerChip } onClick={ () => setGroupPlayer(props.player.endpointId)} />
                    </React.Fragment>
                }
                <ListItem className={classes.bottomListItem} onClick={ () => props.changePlayer(props.player.endpointId)} >
                    <ListItemAvatar>
                        <Avatar onError={addDefaultSrc} src={props.deviceProperties.art} />
                    </ListItemAvatar>
                    { props.deviceProperties.title!='' ?
                        <ListItemText primary={ props.small ? props.name : props.deviceProperties.title } 
                                        secondary={props.small ? props.deviceProperties.title+" - "+props.deviceProperties.artist : props.deviceProperties.artist }/>
                        :
                        <ListItemText primary={ props.small ? props.name : 'No music selected.'} secondary={ props.small ? 'No music selected.' : null } />
                    }
                    { !props.small ? null : 
                        <ListItemSecondaryAction>
                            <IconButton onClick={(e) => props.applyLayoutCard('PlayersLayout',{'player':props.player.endpointId})} >
                                <ViewModuleIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    }
                </ListItem>
            </GridItem>
        : null
    );
}

export default withUser(withLayout(Sonos));