
import React, { Component } from "react";
import Switch from '@material-ui/core/Switch';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Icon from '@material-ui/core/Icon';
import LightbulbOutlineIcon from '@material-ui/icons/LightbulbOutline';
import Avatar from '@material-ui/core/Avatar';
import LightDialog from './lightDialog';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import deepOrange from '@material-ui/core/colors/deepOrange';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import IconButton from '@material-ui/core/IconButton';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import RemoveIcon from '@material-ui/icons/Remove';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
    card: {
        display: 'flex',
        maxWidth: '480px',
        margin: 1,
        boxSizing: "border-box",
        justifyContent: "space-between",
        padding: "8 16 8 24",
        alignItems: "center",
    },        
    root: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
    },

    deviceName: {
        flex: 1,
    },
    listItemLabel: {
        paddingBottom: 0,
    },
    label: {
        paddingLeft: 16,
        flexGrow: 2,
    },
    listItem: {
        padding: "8 0",
        width: '100%',
    },
    waterIcon: {
        backgroundColor: "#6666FF",
    }
});

class Sprinkler extends React.Component {

    handlePress = event => {
        var ops={"op":"set", "path":"discovery/"+event+"/ButtonController/pressState", "command":"Press", "value":true}
        this.props.sender(JSON.stringify(ops));
    }   
    
    render() {

        const { classes } = this.props;

        return (
            <ListItem className={classes.listItem}>
                <Avatar className={classes.waterIcon}><InvertColorsIcon /></Avatar>
                <ListItemText primary={this.props.name}/>
                    <IconButton className={classes.button} onClick={ () => this.handlePress(this.props.on) }>
                        <CheckIcon />
                    </IconButton>
                    <IconButton className={classes.button} onClick={ () => this.handlePress(this.props.off) }>
                        <CloseIcon />
                    </IconButton>
            </ListItem>
        );
    }
}

Sprinkler.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sprinkler);

