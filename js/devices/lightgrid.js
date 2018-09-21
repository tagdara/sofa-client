import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';import IconButton from '@material-ui/core/IconButton';
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
import LightbulbOutlineIcon from '@material-ui/icons/LightbulbOutline';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Slide from  '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import CustomScroll from 'react-custom-scroll';

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
    lGrid: {
        display: "flex",
        flexWrap: "wrap",

        padding: 0,
        flex: "auto",
        flexGrow: 0,
        margin: "0 0 auto 0",
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
        color: theme.palette.primary.contrastText,
    },
    menuIcon: {
        color: theme.palette.primary.contrastText,
    },
    tabRow: {
        color: theme.palette.primary.contrastText,
        display: "flex",
        justifyContent: "center",
    },
    tabInfo: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary[500],
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
    },

    topBar: {
        width: "100%",
    },
    tabTitle: {
        backgroundColor: theme.palette.primary[500],
        paddingTop: "env(safe-area-inset-top)",
        padding: "16px 24px 0px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
    },
    gridPlaceholder: {
        height: 2,
        minWidth: 320,
        flexGrow: 1,
    },
    fullDialog: {
        boxSizing: "border-box",
    },
    dialogContent: {
        height: "100%",
        padding: 8,
    },
    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",    
    }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class LightGrid extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            filter: 'on',
            frontTab: 0,
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
    
    
    handleTab = (event, tabno) => {
        if (tabno==0) { this.setState({frontTab: tabno, filter: 'on'})}
        if (tabno==1) { this.setState({frontTab: tabno, filter: 'all'})}
    };    
    
    render() {
        
        const { classes, fullScreen  } = this.props;
        
        return (
            <Dialog 
                fullScreen={fullScreen}
                maxWidth={'md'}
                open={this.props.showGrid}  
                onClose={this.props.closeGrid}
                TransitionComponent={Transition}
                className={fullScreen ? classes.fullDialog : classes.normalDialog }
            >
                <DialogTitle id="area-dialog-title" className={classes.tabTitle} >
                    <Paper className={classes.tabInfo} elevation={0}>
                        { this.props.lightCount('on')>0 ? 
                            <Typography variant="subheading"  className={classes.gridTitle} >{this.props.lightCount('on')} lights are on</Typography>
                            : 
                            <Typography variant="subheading"  className={classes.gridTitle} color="inherit" >All lights off</Typography>
                        }
                    </Paper>
                    <Tabs className={classes.tabRow} value={this.state.frontTab} onChange={this.handleTab}>
                        <Tab label="On" />
                        <Tab label="All" />
                    </Tabs>
                </DialogTitle>
                { this.props.name=='all' ?
                null
                :
                <Card className={classes.card}>
                    <CardContent className={classes.content}>
                    <GroupLight key={ this.props.name } name={ this.props.name } deviceProperties={ this.props.deviceProperties } devices={ this.props.devices } avgState={ this.avgState } sendMessage={this.props.sendMessage} />
                    </CardContent>
                </Card>
                }
                <Divider />
                <DialogContent className={classes.dialogContent }>
                        <div className={classes.lGrid }>
                { 
                this.props.devices.map((device) =>
                    this.state.filter=='all' || String(this.props.deviceProperties[device.friendlyName].powerState).toLowerCase()==this.state.filter.toLowerCase() ?
                    <Light key={ device.endpointId } name={ device.friendlyName } filter={ this.props.filter} device={ device } deviceProperties={ this.props.deviceProperties[device.friendlyName] } sendMessage={this.props.sendMessage}  />
                    : null
                )}
                <div className={classes.gridPlaceholder}></div>
                </div>
                </DialogContent>
                <Divider />
                <DialogActions className={classes.dialogActions} >
                    <Button onClick={(e) => this.props.closeGrid(e)} color="primary" autoFocus>OK</Button>
                </DialogActions>
            </Dialog>
        )
    }
};

LightGrid.propTypes = {
    classes: PropTypes.object.isRequired,
    fullScreen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(withMobileDialog()(LightGrid));

