import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import ScreenRotationIcon from '@material-ui/icons/ScreenRotation';
import CloseIcon from '@material-ui/icons/Close';
import Sonos from './sonos';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Light from './light';
import Avatar from '@material-ui/core/Avatar';
import WarningIcon from '@material-ui/icons/Warning';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Button from '@material-ui/core/Button';
import GroupLight from './grouplight'

const styles = theme => ({
    
    closed: {
        backgroundColor: "#6a6",
    },
    open: {
        backgroundColor: "#e66",
    },
    countLabel: {
        padding: "8 16",
    },
    card: {
        display: 'flex',
        maxWidth: '480px',
        margin: 8,
        boxSizing: "border-box",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 16,
        width: '100%',
    },    
    content: {
        minWidth: 0,
        padding: "0 !important",
        flexGrow:1,
        display: "flex",
        alignItems: "center"
    },
    camGridDialog: {
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
    },
    camGrid: {
        display: "flex",
        flexWrap: "wrap",
        maxWidth: 1440,
        width: "100%",

        paddingBottom: "env(safe-area-inset-bottom)",
        overflowY: "auto",
    },
    paper: {
        boxShadow: "none",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",

    },
    camGridToolbar: {
        paddingTop: "env(safe-area-inset-top)",
    },
    gridTitle: {
        flexGrow: 1,
    },


});

class LightGrid extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            filter: 'open',
        }
        
        this.avgState = this.avgState.bind(this);

    }

    avgState(prop) {
        
        if (prop=='on') {
            
            for (var dev in this.props.deviceProperties) {
                if (this.props.deviceProperties[dev].hasOwnProperty('powerState')) {
                    if (this.props.deviceProperties[dev].powerState=='ON') {
                        return true
                    }
                }
            }
            
            return false
            
        } else if (prop=='brightness') {
            
            var brightnessCount=0;
            var totalbrightness=0;
            for (var dev in this.props.deviceProperties) {
                if (this.props.deviceProperties[dev].hasOwnProperty('brightness')) {
                    brightnessCount=brightnessCount+1;
                    if (this.props.deviceProperties[dev].powerState=='ON') {
                        totalbrightness=totalbrightness+this.props.deviceProperties[dev].brightness;
                    }
                }
            }
        
            if (brightnessCount==0) { return 0 }

            var avgb=totalbrightness/brightnessCount
            return avgb;
        
        } else if (prop=='temperature') {
            var temperatureCount=0;
            var totaltemperature=0;
            for (var dev in this.props.deviceProperties) {
                if (this.props.deviceProperties[dev].hasOwnProperty('colorTemperatureInKelvin')) {
                    temperatureCount=temperatureCount+1;
                    if (this.props.deviceProperties[dev].powerState=='ON') {
                        totaltemperature=totaltemperature+this.props.deviceProperties[dev].colorTemperatureInKelvin;
                    }
                }
            }
            
            if (temperatureCount==0) { return 0 }

            var avgb=totaltemperature/temperatureCount
            return avgb;
        
        } else {
            return 0;
        }
        
    }
    
    toggleFilter = event => {
        if (this.state.filter=='on') {
            this.setState({ filter:'all'})
        } else {
            this.setState({ filter:'on'}) 
        }
    }
    
    render() {
        
        const { classes, theme } = this.props;
        
        return (
            <Dialog fullScreen open={this.props.showGrid}  className={classes.camGridDialog} PaperProps ={{ classes: { root: classes.paper}}}>
                <AppBar position="static" className={classes.camGridToolbar}>
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.gridTitle}>
                            Lights
                        </Typography>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={(e) =>  this.props.closeGrid(e)}>
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>                
                <Card className={classes.card}>
                    <CardContent className={classes.content}>
                    <GroupLight key={ this.props.name } name={ this.props.name } deviceProperties={ this.props.deviceProperties } devices={ this.props.devices } avgState={ this.avgState } sendMessage={this.props.sendMessage} />
                    </CardContent>
                </Card>

                <div className={classes.camGrid}>
                { 
                this.props.devices.map((device) =>
                    <Light key={ device.endpointId } name={ device.friendlyName } filter={ this.props.filter} device={ device } deviceProperties={ this.props.deviceProperties[device.friendlyName] } sendMessage={this.props.sendMessage}  />
                )}

                </div>
            </Dialog>
        )
    }
};

LightGrid.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(LightGrid);
