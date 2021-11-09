import React from 'react';
import { makeStyles } from '@mui/styles';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RemoveIcon from '@mui/icons-material/Remove';
import TonalityIcon from '@mui/icons-material/Tonality';
import ItemBase from 'components/ItemBase';
import CardLine from 'components/CardLine'
import CardLineText from 'components/CardLineText'
import CardLineIcon from 'components/CardLineIcon'

import { directive } from 'store/directive'
import { deviceByEndpointId } from 'store/deviceHelpers'

const useStyles = makeStyles(theme => {
    return {    
        button: {        
            backgroundColor: theme.palette.background.button+" !important",
            borderColor: "rgba(255,255,255, 0) !important",
            marginRight: 1,
            padding: "3px 8px"
        },
        buttonRoot: {
            backgroundColor: theme.palette.action.disabled,
        }
    }
})

const Shade = props => {

    const classes = useStyles();
    const device = deviceByEndpointId(props.endpointId)   

    function handlePress(modechoice) {
        directive(props.endpointId, 'Blinds.Position', 'SetMode', { "mode": modechoice}, {})
    }
    
    return ( 
        <ItemBase itemType={props.itemType}>
            <CardLine inList={props.itemType === "listItem"}>
                <CardLineIcon on={false}>
                    <TonalityIcon />
                </CardLineIcon>
                <CardLineText primary={ device.friendlyName } />
                <ButtonGroup className={classes.buttonGroup} size="small" variant="text" >
                    <Button className={classes.button} onClick={ () => handlePress('Position.Down') }><ExpandMoreIcon /></Button>
                    <Button className={classes.button} onClick={ () => handlePress('Position.Stop') }><RemoveIcon /></Button>
                    <Button className={classes.button} onClick={ () => handlePress('Position.Up') }><ExpandLessIcon /></Button>
                </ButtonGroup>
            </CardLine>
        </ItemBase>
    );
}

export default Shade;

Shade.defaultProps ={
    inList: false,
}

