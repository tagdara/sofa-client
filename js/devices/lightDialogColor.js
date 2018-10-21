import React, { Component } from "react";
import Switch from '@material-ui/core/Switch';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import LightbulbOutlineIcon from '@material-ui/icons/LightbulbOutline';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import { HuePicker } from 'react-color';
import Paper from '@material-ui/core/Paper';

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
    }
});

class LightDialogColor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            color: "no",
        };
    } 
    
    static getDerivedStateFromProps(nextProps, prevState) {

        var data=nextProps
        var changes={}
        
        if (data.hasOwnProperty('color')) {
            changes.color=data.color
        }

        return changes
    }
    
    sb2sl(color) {
        var SB = {hue:color.hue, saturation:color.saturation, brightness:color.brightness};
        var SL = {h:color.hue, s:0, l:0};
        SL.l = (2 - SB.saturation) * SB.brightness / 2;
        SL.s = SL.l&&SL.l<1 ? SB.saturation*SB.brightness/(SL.l<0.5 ? SL.l*2 : 2-SL.l*2) : SL.s;
        return SL
    }
        
    sl2sb(color) {
        var SL = {h:color.h, s:color.s, l:color.l};
        var SB = {hue:color.h, saturation:0, brightness:0};
        var t = SL.s * (SL.l<0.5 ? SL.l : 1-SL.l);
        SB.brightness = SL.l+t;
        SB.saturation = SL.l>0 ? 2*t/SB.brightness : SB.saturation ;
        return SB
    }
    
    handleColorSliderChange = color => {
        var hsb=this.sl2sb(color.hsl)
        this.setState({ color: hsb });
        this.props.sendAlexaCommand(this.props.name, this.props.endpointId, "ColorController", "SetColor", hsb)
    }

    handleColorChange = hsb => {
        this.setState({ color: hsb });
        this.props.sendAlexaCommand(this.props.name, this.props.endpointId, "ColorController", "SetColor", hsb)
    }

    render() {

        const { classes } = this.props;

        return (
                <List>
                    <ListItem className={classes.listItemLabel}>
                        <ListItemText primary="Color" />
                    </ListItem>
                    <ListItem>
                        <HuePicker
                            color={ this.sb2sl(this.state.color) }
                            onChangeComplete={ this.handleColorSliderChange }
                        />
                    </ListItem>
                    <ListItem className={classes.chipLine}>
                        <Paper elevation={0}>
                            <Chip 
                                key = 'reveal'
                                label= "reveal" 
                                className={ classes.chip }
                                onClick={ () => this.handleColorChange({hue: 43.5, saturation:0.27, brightness: 1}) }
                            />
                        </Paper>
                    </ListItem>
                </List>
        );
    }
}

LightDialogColor.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LightDialogColor);

