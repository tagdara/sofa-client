import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
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
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import HomeIcon from '@material-ui/icons/Home';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const styles = theme => ({

    card: {
        display: 'flex',
        maxWidth: '480px',
        margin: 8,
        boxSizing: "borderbox",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cardname: {
        display: "flex",
        flexDirection: "column",
        paddingBottom: 8,
    },
    content: {
        minWidth: 0,
        paddingBottom: 16,
    },
    metadata: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
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
    paperLight: {
        display: "flex",
        alignItems: "center",
        paddingLeft: 16,
    },
    stackedVolumeControl: {
        paddingLeft: 16,
        paddingRight: 16,
        flex:1,
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
    dialog: {
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
        maxWidth: '480px',
        minWidth: '320px',
        boxSizing: "border-box",
    },
    cover: {
        minWidth: 62,
        height: 62,
        width: 62,
        alignSelf: "flex-end",
        margin: 16,
    },
    embeddedExpansion: {
        padding:0,
        display: "block",
    },
    chipLine: {
        width: "100%",
    },
    gridList: { 
        maxWidth: 320,
    },
    gridButtonTile: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

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

        const { classes, theme } = this.props;

        return (
                <Dialog fullScreen open={this.props.showdialog} onClose={() => this.props.closeDialog()} className={this.props.classes.dialog}>
                    <DialogTitle >{this.props.name}</DialogTitle>
                    <DialogContent>
                    <List>
                        <ListItem>
                            <ListItemText primary="Power"/>
                            <ListItemSecondaryAction>
                                <Switch color="primary" checked={this.props.deviceProperties.powerState=='ON'} onChange={this.handlePowerChange} />
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                    </List>
                    <div>
                        <Typography variant="subheading" noWrap>Input</Typography>
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
                    </div>
                    <Divider />
                    <Typography variant="subheading" noWrap>Remote Control</Typography>
                    <GridList cellHeight={80} className={classes.gridList} cols={3}>
                    <GridListTile cols={1}>
                    </GridListTile>
                    <GridListTile cols={1} className={classes.gridButtonTile}>
                        <Button>
                            <ExpandLessIcon />
                        </Button>

                    </GridListTile>
                    <GridListTile cols={1} className={classes.gridButtonTile}>
                    </GridListTile>

                    <GridListTile cols={1} className={classes.gridButtonTile}>
                        <Button>
                            <ChevronLeftIcon />
                        </Button>
                    </GridListTile>
                    <GridListTile cols={1} className={classes.gridButtonTile}>
                        <Button>
                            <FullscreenIcon />
                        </Button>
                    </GridListTile>
                    <GridListTile cols={1} className={classes.gridButtonTile}>
                        <Button>
                            <ChevronRightIcon />
                        </Button>
                    </GridListTile>

                    <GridListTile cols={1} className={classes.gridButtonTile}>
                    </GridListTile>
                    <GridListTile cols={1} className={classes.gridButtonTile}>
                        <Button>
                            <ExpandMoreIcon />
                        </Button>
                    </GridListTile>
                    <GridListTile cols={1} className={classes.gridButtonTile}>
                    </GridListTile>

                    <GridListTile cols={1} className={classes.gridButtonTile}>
                        <Button>
                            <ArrowBackIcon />
                        </Button>
                    </GridListTile>
                    <GridListTile cols={1} className={classes.gridButtonTile}>
                    </GridListTile>
                    <GridListTile cols={1} className={classes.gridButtonTile}>
                        <Button>
                            <HomeIcon />
                        </Button>
                    </GridListTile>


                    </GridList>
                    </DialogContent>
                    <DialogActions>
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
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(TVDialog);
