import React from 'react';
import { makeStyles } from '@mui/styles';

import List from '@mui/material/List';

import LightSliderBrightness from "devices/Light/LightSliderBrightness";
import LightSliderTemperature from "devices/Light/LightSliderTemperature";
import LightSliderColor from "devices/Light/LightSliderColor";
import LightSliderOnLevel from "devices/Light/LightSliderOnLevel";
import LightRemoveButton from "devices/Light/LightRemoveButton";

const useStyles = makeStyles(theme => {
    return {        
        controlPad: {
            paddingBottom: 8,
        },
        controlList: {
            paddingTop: 0,
            width: "100%",
        }
    }
});

const LightProperties = props => {

    const classes = useStyles();
    const expanded = props.showAll || props.brightControl || props.tempControl || props.colorControl
    
    if (!expanded) { return null }

    return (
        <List className={ classes.controlList }>
            <LightSliderBrightness endpointId={ props.endpointId } deviceState={ props.deviceState } directive={props.directive} hide={ !props.brightControl && !props.showAll } placeHolder={true} />
            <LightSliderTemperature endpointId={ props.endpointId } deviceState={ props.deviceState } directive={props.directive} hide={ !props.tempControl && !props.showAll } placeHolder={true} />
            <LightSliderColor endpointId={ props.endpointId } deviceState={ props.deviceState } directive={props.directive} hide={ !props.colorControl && !props.showAll } placeHolder={true} />
            <LightSliderOnLevel endpointId={ props.endpointId } deviceState={ props.deviceState } directive={props.directive} hide={ !props.onLevelControl && !props.showAll } />
            <LightRemoveButton endpointId={ props.endpointId } remove={ props.remove } />
            <div className={classes.controlPad} />
        </List>
    )
}

export default LightProperties;
