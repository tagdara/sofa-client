import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import { MdLightbulbOutline as LightbulbOutlineIcon} from "react-icons/md";
//import LightbulbOutlineIcon from '@material-ui/icons/LightbulbOutline';
import Paper from '@material-ui/core/Paper';

import Light from './light';
import SofaDialog from '../sofaDialog'

const styles  = theme =>  ({

    titleControls: {
        padding: 0,
    },
    titleContent: {
        padding: "16 24",
        minWidth: 0,
        flexGrow:1,
        display: "flex",
        alignItems: "center"
    },

    dialogContent: {
        padding: 0,
    },
    dialogcard: {
        maxWidth: '480px',
        minWidth: '320px',
        flexDirection: "row",
        justifyContent: "space-between",
    },
    card: {
        display: 'flex',
        maxWidth: '480px',
        boxSizing: "border-box",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 16,
    },
    content: {
        minWidth: 0,
        padding: "0 !important",
        flexGrow:1,
        display: "flex",
        alignItems: "center"
    },
    countLabel: {
        padding: "8 16",
    },
    off: {
        backgroundColor: "#777",
    },
    on: {
        backgroundColor: theme.palette.primary.dark,
    },    
})

class LightListDialog extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            showOverlay: true,
            showdialog: false,
            filter: 'on',
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

        const { classes, fullScreen } = this.props;

        return (
                <SofaDialog open={this.props.showdialog} close={() => this.props.closeDialog()} >
                    <DialogTitle elevation={1} disableTypography={true} className={classes.titleControls}>
                        <Paper className={classes.titleContent} onClick={ () => this.toggleFilter('all') } >
                            { this.props.lightCount('on')>0 ? 
                            <Avatar className={classes.on} ><LightbulbOutlineIcon/></Avatar>
                            : 
                            <Avatar className={classes.off} ><LightbulbOutlineIcon/></Avatar>
                            }
                            { this.props.lightCount('on')>0 ? 
                                <Typography className={classes.countLabel} variant="subtitle1">{this.props.lightCount('on')} lights are on</Typography>
                                : 
                                <Typography className={classes.countLabel} variant="subtitle1">All lights off</Typography>
                            }
                        </Paper>
                    </DialogTitle>
                    <DialogContent className={classes.dialogContent}>
                        { this.props.devices.map((device) => (
                            this.state.filter=='all' || String(this.props.deviceProperties[device.friendlyName].powerState).toLowerCase()==this.state.filter.toLowerCase() ?
                            <Light key={ device.endpointId } name={ device.friendlyName } filter={ this.props.filter} device={ device } deviceProperties={ this.props.deviceProperties[device.friendlyName] } sendMessage={this.props.sendMessage} />
                            : null )
                        )}                    
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.props.closeDialog()} color="primary" autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </SofaDialog>
        );
    }
}

LightListDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LightListDialog);
