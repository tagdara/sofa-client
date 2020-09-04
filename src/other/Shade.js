import React from 'react';
import { makeStyles } from '@material-ui/styles';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RemoveIcon from '@material-ui/icons/Remove';
import TonalityIcon from '@material-ui/icons/Tonality';
import SofaListItem from '../SofaListItem';

const useStyles = makeStyles(theme => {
    return {      
        button: {
            backgroundColor: theme.palette.background.button,
            borderColor: "rgba(255,255,255, 0) !important",
            marginRight: 1,
            padding: "3px 8px"
        },
        buttonRight: {
            padding: "3px 8px",
            backgroundColor: theme.palette.background.button,
        },
        
        item: {
            minHeight: 54,
        }
    }
})

export default function Shade(props) {

    const classes = useStyles();

    function handlePress(modechoice) {
        props.directive(props.device.endpointId, 'ModeController', 'SetMode', { "mode": modechoice}, {}, 'Blinds.Position')
    }
    
    return ( 
        <SofaListItem   inList={props.inList} avatarBackground={false} avatarState={ 'off' } avatar={ props.icon ? props.icon : <TonalityIcon />}
                        primary={props.device.friendlyName}>

            <ButtonGroup className={classes.buttonGroup} size="small" variant="text"  >
                <Button className={classes.button} onClick={ () => handlePress('Position.Down') }><ExpandMoreIcon /></Button>
                <Button className={classes.button} onClick={ () => handlePress('Position.Stop') }><RemoveIcon /></Button>
                <Button className={classes.buttonRight} onClick={ () => handlePress('Position.Up') }><ExpandLessIcon /></Button>
            </ButtonGroup>
        </SofaListItem>
    );
}

Shade.defaultProps ={
    inList: false,
}

