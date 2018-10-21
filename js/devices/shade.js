
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
import TonalityIcon from '@material-ui/icons/Tonality';
import RemoveIcon from '@material-ui/icons/Remove';

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
});

class Shade extends React.Component {


    handleClickOpen = () => {
        this.setState({ open: true });
    };  
    
    handlePress = event => {
        this.props.sendAlexaCommand(event, '', 'ButtonController', 'Press')
    }   
    
    render() {

        const { classes } = this.props;

        return (
            <ListItem className={classes.listItem}>
                <Avatar><TonalityIcon /></Avatar>
                <ListItemText primary={this.props.name}/>
                    <IconButton className={classes.button} onClick={ () => this.handlePress(this.props.down) }>
                        <ExpandMoreIcon />
                    </IconButton>
                    <IconButton className={classes.button} onClick={ () => this.handlePress(this.props.stop) }>
                        <RemoveIcon />
                    </IconButton>
                    <IconButton className={classes.button} onClick={ () => this.handlePress(this.props.up) }>
                        <ExpandLessIcon />
                    </IconButton>
            </ListItem>
        );
    }
}

Shade.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Shade);

