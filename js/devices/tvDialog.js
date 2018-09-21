import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';

import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import HomeIcon from '@material-ui/icons/Home';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from  '@material-ui/core/Slide';


const styles = theme => ({


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
    slider: {
        paddingTop: 0,
        paddingRight: 28,
        paddingLeft: 10,
    },
    slidername: {
        display: "flex",
        paddingRight: 0,
        paddingLeft: 10,
        alignItems: "center",
    },    
    cover: {
        minWidth: 62,
        height: 62,
        width: 62,
        alignSelf: "flex-end",
        margin: 16,
    },
    chipLine: {
        width: "100%",
    },
    gridList: { 
        maxWidth: 320,
        margin: "0 auto !important",
        backgroundColor: "#eee",
    },
    gridButtonTile: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    remoteButton: {
        height: "100%",
    },
    tabTitle: {
        backgroundColor: theme.palette.primary[700],
        padding: 0,
        paddingTop: "env(safe-area-inset-top)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
    },
    dialogTitle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
        color: theme.palette.primary.contrastText,
    },
    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class TVDialog extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            tracked: ['surround','decoder','input','volume','powerState'],
            endpointId: '',
            surround: '',
            decoder: '',
            input: '',
            volume: 0,
            powerState: false,
            icon: '/react/images/tv.jpg?v2',
        };
    }    
    
    handlePowerChange = event => {
        this.setState({ powerState: event.target.checked, target: this.props.device.friendlyName});
        if (event.target.checked) {
            var ops={"op":"set", "path":"discovery/"+this.props.device.friendlyName+"/PowerController/powerState", "command":"TurnOn", "value":event.target.checked}
        } else {
            var ops={"op":"set", "path":"discovery/"+this.props.device.friendlyName+"/PowerController/powerState", "command":"TurnOff", "value":event.target.checked}
        }
        this.props.sendMessage(JSON.stringify(ops));
    }; 
    
    handlePreVolumeChange = event => {
        this.setState({ volume: event, target:this.props.name});
    }; 

    handleVolumeChange = event => {
        var ops={"op":"set", "path":"discovery/"+this.props.name+"/SpeakerController/volume", "command":"SetVolume", "value":event}
        this.props.sendMessage(JSON.stringify(ops));
    }; 

    handleMuteChange = event => {
        var ops={"op":"set", "path":"discovery/"+this.props.name+"/SpeakerController/muted", "command":"SetMute", "value":!this.state.muted}
        this.props.sendMessage(JSON.stringify(ops));
    }; 
    
    handleSurround = surroundmode => {
        var ops={"op":"set", "path":"discovery/"+this.props.name+"/SurroundController/surround", "command":"SetSurround", "value":surroundmode}
        this.props.sendMessage(JSON.stringify(ops));
    }; 

    
    render() {

        const { classes, theme, fullScreen } = this.props;

        return (
                <Dialog 
                    fullScreen={fullScreen}
                    fullWidth={true}
                    maxWidth={'sm'}
                    open={this.props.showdialog}
                    onClose={() => this.props.closeDialog()}
                    TransitionComponent={Transition}
                    className={this.props.classes.dialog}
                >
                    <DialogTitle className={classes.tabTitle}>
                        <Toolbar elevation={0}>
                            <Typography variant="title" color="inherit" className={classes.dialogTitle}>
                                TV
                            </Typography>
                        </Toolbar>
                    </DialogTitle>
                    <DialogContent>
                    <List>
                        <ListItem>
                            <ListItemText primary="Power"/>
                            <ListItemSecondaryAction>
                                <Switch color="primary" checked={this.props.deviceProperties.powerState=='ON'} onChange={this.handlePowerChange} />
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <Typography variant="subheading" noWrap>Input</Typography>
                        </ListItem>
                        <ListItem>
                            <div className={classes.chipLine}>
                            <Chip 
                                key = 'Apple TV'
                                label= 'Apple TV'
                                className={ (this.props.deviceProperties.input=='Apple TV') ? classes.hotchip : classes.chip }
                                onClick={ (e) => this.handleInput(e, 'Apple TV')}
                            />
                            <Chip 
                                key = 'Android TV'
                                label= 'Android TV'
                                className={ (this.props.deviceProperties.input=='Android TV') ? classes.hotchip : classes.chip }
                                onClick={ (e) => this.handleInput(e, 'Android TV')}
                            />
                            <Chip 
                                key = 'ChromeCast'
                                label= 'ChromeCast'
                                className={ (this.props.deviceProperties.input=='ChromeCast') ? classes.hotchip : classes.chip }
                                onClick={ (e) => this.handleInput(e, 'ChromeCast')}
                            />
                            <Chip 
                                key = 'Steam'
                                label= 'Steam'
                                className={ (this.props.deviceProperties.input=='Steam') ? classes.hotchip : classes.chip }
                                onClick={ (e) => this.handleInput(e, 'Steam')}
                            />
                            <Chip 
                                key = 'Wii'
                                label= 'Wii'
                                className={ (this.props.deviceProperties.input=='Wii') ? classes.hotchip : classes.chip }
                                onClick={ (e) => this.handleInput(e, 'Wii')}
                            />
                            </div>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <Typography variant="subheading" noWrap>Remote Control</Typography>
                        </ListItem>
                        <ListItem>
                        <GridList cellHeight={80} className={classes.gridList} cols={3}>
                        <GridListTile cols={1}>
                        </GridListTile>
                    <GridListTile cols={1} className={classes.gridButtonTile}>
                        <Button className={classes.remoteButton}>
                            <ExpandLessIcon />
                        </Button>

                    </GridListTile>
                    <GridListTile cols={1} className={classes.gridButtonTile}>
                    </GridListTile>

                    <GridListTile cols={1} className={classes.gridButtonTile}>
                        <Button className={classes.remoteButton}>
                            <ChevronLeftIcon />
                        </Button>
                    </GridListTile>
                    <GridListTile cols={1} className={classes.gridButtonTile}>
                        <Button className={classes.remoteButton}>
                            <FullscreenIcon />
                        </Button>
                    </GridListTile>
                    <GridListTile cols={1} className={classes.gridButtonTile}>
                        <Button className={classes.remoteButton}>
                            <ChevronRightIcon />
                        </Button>
                    </GridListTile>

                    <GridListTile cols={1} className={classes.gridButtonTile}>
                    </GridListTile>
                    <GridListTile cols={1} className={classes.gridButtonTile}>
                        <Button className={classes.remoteButton}>
                            <ExpandMoreIcon />
                        </Button>
                    </GridListTile>
                    <GridListTile cols={1} className={classes.gridButtonTile}>
                    </GridListTile>

                    <GridListTile cols={1} className={classes.gridButtonTile}>
                        <Button className={classes.remoteButton}>
                            <ArrowBackIcon />
                        </Button>
                    </GridListTile>
                    <GridListTile cols={1} className={classes.gridButtonTile}>
                    </GridListTile>
                    <GridListTile cols={1} className={classes.gridButtonTile}>
                        <Button className={classes.remoteButton}>
                            <HomeIcon />
                        </Button>
                    </GridListTile>


                    </GridList>
                    </ListItem>
                    </List>
                    </DialogContent>
                    <DialogActions className={classes.dialogActions} >
                        <Button  onClick={() => this.props.closeDialog() } color="primary" autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                    
                </Dialog>
        );
    }
}

TVDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    fullScreen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(withMobileDialog()(TVDialog));
