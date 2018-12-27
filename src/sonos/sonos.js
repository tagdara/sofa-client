import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
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


export default function Sonos(props) {
    
    const classes = useStyles();
    const [showDialog, setShowDialog] = useState(false);

    function closeDialog() {
        setShowDialog(false)
    }
    
    function addDefaultSrc(ev){
        ev.target.src = '/image/sonos/logo'
    }
    
    function setGroupPlayer(thisplayer) {
        props.setPlayer(thisplayer)
        props.setLayoutCard('PlayerGroup')
    }
 
    return (
        props.name===props.deviceProperties.input || props.deviceProperties.input==''? 
            <GridItem wide={props.wide}>
                { props.small ? null :
                    <React.Fragment>
                        <List className={classes.list} >
                        <ListItem className={classes.topListItem}> 
                            <ListItemText variant="body2" primary={props.name}  onClick={ () => {  props.setPlayer(props.name)} }/>
                        </ListItem>
                        {props.deviceProperties.linked.map(link =>
                            <ListItem className={classes.topListItem} key={ link+"link" }>
                                <ListItemText variant="body2" primary={link} />
                            </ListItem>)
                        }
                        </List>
                        <Chip label={ 'Group' } className={ classes.cornerChip } onClick={ () => setGroupPlayer(props.name)} />
                    </React.Fragment>
                }
                <ListItem className={classes.bottomListItem} onClick={ () => props.setPlayer(props.name)} >
                    <Avatar onError={addDefaultSrc} src={props.deviceProperties.art} />
                    { props.deviceProperties.title!='' ?
                        <ListItemText primary={ props.small ? props.name : props.deviceProperties.title } 
                                        secondary={props.small ? props.deviceProperties.title+" - "+props.deviceProperties.artist : props.deviceProperties.artist }/>
                        :
                        <ListItemText primary={ props.small ? props.name : 'No music selected.'} secondary={ props.small ? 'No music selected.' : null } />
                    }
                    { !props.small ? null : 
                        <ListItemSecondaryAction>
                            <IconButton onClick={(e) => props.setLayoutCard('PlayersLayout',{'player':props.name})} >
                                <ViewModuleIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    }
                </ListItem>
            </GridItem>
        : null
    );
}
