import React from "react";
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import IconButton from '@material-ui/core/IconButton';

import VirtualList from './virtuallist';
import ComputerList from './computerList';
import ModeList from './modeList';
import SmartButton from './devices/smartbutton';
import { withData } from './DataContext/withData';
import SofaDialog from './sofaDialog';

const styles = theme => ({
        
    list: {
        minWidth: 320,
    },
    content: {
        minWidth: 0,
        padding: "0 !important",
        flexGrow:1,
        display: "flex",
        alignItems: "center"
    },
    thermostatList: {
        width: "100%",
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
    },
    listItem: {
        padding: "16 0",
        width: '100%',
    },

});


class ButtonDialog extends React.Component {

    render() {
        
        const { classes } = this.props;
        
        return (
            <SofaDialog open={this.props.open} close={this.props.close} title='Other Devices' >
                <Divider />
                <DialogContent className={classes.dialogContent }>
                    <List className={classes.thermostatList} >
                        <VirtualList sendAlexaCommand={this.props.sendAlexaCommand} />
                    </List>
                    <Divider />
                    <ComputerList devices={ this.props.devicesByCategory('PC') } deviceProperties={ this.props.propertiesFromDevices(this.props.devicesByCategory('PC')) } sendAlexaCommand={this.props.sendAlexaCommand} />
                    <Divider />
                    <ModeList devices={ this.props.devicesByCategory('MODE') } deviceProperties={ this.props.propertiesFromDevices(this.props.devicesByCategory('MODE')) } sendAlexaCommand={this.props.sendAlexaCommand} />
                </DialogContent>
                <Divider />
                <DialogActions className={classes.dialogActions} >
                    <Button onClick={(e) => this.props.close(e)} color="primary" autoFocus>OK</Button>
                </DialogActions>
            </SofaDialog>
        )
    }

}

ButtonDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withData(withStyles(styles)(ButtonDialog));
