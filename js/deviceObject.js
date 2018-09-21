import React from "react";
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Zone from './devices/zone';
import Thermostat from './devices/thermostat';
import ThermostatSettable from './devices/thermostatSettable';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Slide from  '@material-ui/core/Slide';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';


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
        padding: "8 0",
        width: '100%',
    },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class DeviceObject extends React.Component {
    
    componentDidMount() {
        console.log(this.props.device)
        console.log(this.props.propertiesFromDevices([this.props.device]))
    }
        

    render() {
        
        const { classes, fullScreen  } = this.props;
        
        return (
            <Table className={classes.table}>
                <TableBody>
                {
                    Object.keys(this.props.propertiesFromDevices([this.props.device])[this.props.device.friendlyName]).map(name => (
                        <TableRow key={name+'-od'}>
                            <TableCell>{name}</TableCell>
                            <TableCell>{this.props.propertiesFromDevices([this.props.device])[this.props.device.friendlyName][name]}</TableCell>
                        </TableRow>
                    ))
                }
                </TableBody>
            </Table>
            )
        }

}

DeviceObject.propTypes = {
    classes: PropTypes.object.isRequired,
    fullScreen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(withMobileDialog()(DeviceObject));
