import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import LensIcon from '@material-ui/icons/Lens';

import { HuePicker } from 'react-color';

const styles = theme => ({
        
    root: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
    },
    expansionList: {
        paddingLeft: 4,
        paddingRight: 4,
        
    },
    halves: {
        width: '40%',
    },

    halfSlider: {
        width: '40%',
        paddingLeft: 16,
        paddingRight: 16,
        display: 'flex',
        flex: 1,
    },
    chip: {
        background: "silver",
        color: "black",
        margin: theme.spacing.unit,
    },

    hotchip: {
        background: "orangeRed",
        color: "white",
        margin: theme.spacing.unit,
    },

    stackedLightControl: {
        paddingLeft: 16,
        paddingRight: 16,
        flex:1,
    },
    buttonsAndSlider: {
        paddingTop: 0,
        paddingRight: 28,
        paddingLeft: 10,
    },
    nameAndSwitch: {
        display: "flex",
        paddingRight: 0,
        paddingLeft: 10,
        alignItems: "center",
    },
    deviceName: {
        flex: 1,
    },
    listItemLabel: {
        paddingBottom: 0,
    },
    paperLight: {
        display: "flex",
        alignItems: "center",
        paddingLeft: 16,
    },
    chipLine: {
        paddingTop:0,
        paddingLeft:8,
        paddingRight:8,
    },
    wide: {
        width: "100%",
    },
    indent: {
        paddingLeft: 40,
    },
    button: {
        minWidth: 24
    },
    revealIcon: {
        height: 24,
        width: 24,
        color: "FFE4B5",
    }
});

class LightSliderColor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            delaySet: false,
            prevcolor: {},
            color: {hue: 43.5, saturation:0.27, brightness: 1},
        };
    } 
    
    static getDerivedStateFromProps(nextProps, prevState) {

        var data=nextProps
        var changes={}
        
        if (data.hasOwnProperty('color')) {
            if (!prevState.delaySet) {
                changes.color=LightSliderColor.sb2sl(data.color)
            }
        }

        return changes
    }
    
    static sl2sb(color) {
        var SL = {h:color.h, s:color.s, l:color.l};
        var SB = {hue:color.h, saturation:0, brightness:0};
        var t = SL.s * (SL.l<0.5 ? SL.l : 1-SL.l);
        SB.brightness = SL.l+t;
        SB.saturation = SL.l>0 ? 2*t/SB.brightness : SB.saturation ;
        return SB
    }    
    
    static sb2sl(color) {
        var SB = {hue:color.hue, saturation:color.saturation, brightness:color.brightness};
        var SL = {h:color.hue, s:0, l:0};
        SL.l = (2 - SB.saturation) * SB.brightness / 2;
        SL.s = SL.l&&SL.l<1 ? SB.saturation*SB.brightness/(SL.l<0.5 ? SL.l*2 : 2-SL.l*2) : SL.s;
        return SL
    }
    
    handleColorSliderChange = (color, event) => {
        this.delaySliderUpdates()    // hue bulbs are slow on HSB
        this.setState({ color: color.hsl });
        this.props.sendAlexaCommand(this.props.name, this.props.endpointId, "ColorController", "SetColor", { "color": LightSliderColor.sl2sb(color.hsl) } )
    }

    handleColorChange = hsb => {
        this.delaySliderUpdates()   // hue bulbs are slow on HSB
        this.setState({ color: LightSliderColor.sb2sl(hsb) });
        this.props.sendAlexaCommand(this.props.name, this.props.endpointId, "ColorController", "SetColor", {"color":hsb} )
    }
    
    delaySliderUpdates = () => {
        this.setState({ delaySet: true},
            () =>  setTimeout(() => this.endSliderDelay(), 30000)
        )
    }
    
    endSliderDelay = () => {
        this.setState({ delaySet: false});
    }
    
    render() {

        const { classes } = this.props;
        const reveal = {hue: 43.5, saturation:0.27, brightness: 1};

        return (
            <ListItem>
                <ListItemIcon className={classes.indent}><ColorLensIcon /></ListItemIcon>
                <HuePicker
                    className={classes.wide}
                    color={ this.state.color }
                    onChangeComplete={ this.handleColorSliderChange }
                />
                <Button size="small" onClick={ () => this.handleColorChange(reveal)} color={ this.state.color==reveal ? "primary" : "default"} className={classes.button }>
                    <LensIcon className={classes.revealIcon} />
                </Button>
            </ListItem>
        );
    }
}

export default withStyles(styles)(LightSliderColor);

