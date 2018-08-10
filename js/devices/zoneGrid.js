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
import Zone from './zone';
import Avatar from '@material-ui/core/Avatar';
import WarningIcon from '@material-ui/icons/Warning';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Button from '@material-ui/core/Button';

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

class ZoneGrid extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            filter: 'open',
        }
    }
    
    toggleFilter = event => {
        if (this.state.filter=='open') {
            this.setState({ filter:'all'})
        } else {
            this.setState({ filter:'open'}) 
        }
    }
    
    render() {
        
        const { classes, theme } = this.props;
        
        return (
            <Dialog fullScreen open={this.props.showGrid}  className={classes.camGridDialog} PaperProps ={{ classes: { root: classes.paper}}}>
                <AppBar position="static" className={classes.camGridToolbar}>
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.gridTitle}>
                            Security Zones
                        </Typography>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={(e) =>  this.props.closeGrid(e)}>
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>                
                <Card className={classes.card}>
                    <CardContent className={classes.content}>
                        { this.props.zoneCount('open')>0 ? 
                        <Avatar className={classes.open} onClick={ () => this.toggleFilter('all') }><WarningIcon/></Avatar>
                        : 
                        <Avatar className={classes.closed} onClick={ () => this.toggleFilter('all') }><VerifiedUserIcon/></Avatar>
                        }
                        { this.props.zoneCount('open')>0 ? 
                            <Typography className={classes.countLabel} variant="subheading">{this.props.zoneCount('open')} zones are not secure</Typography>
                            : 
                            <Typography className={classes.countLabel} variant="subheading">All zones secure</Typography>
                        }
                    </CardContent>
                </Card>

                <div className={classes.camGrid}>
                { 
                this.props.devices.map((device) =>
                    <Zone key={ device.endpointId } name={ device.friendlyName } filter={ this.props.filter} device={ device } deviceProperties={ this.props.deviceProperties[device.friendlyName] } sender={this.props.sender} updateDevice={this.props.updateDevice} />
                )}

                </div>
            </Dialog>
        )
    }
};

ZoneGrid.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ZoneGrid);
