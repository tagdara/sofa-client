import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Switch from '@material-ui/core/Switch';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import TvIcon from '@material-ui/icons/Tv';

import TvDialog from './tvDialog';

const styles = theme => ({
    
    hotAvatar: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    icon: {
        minWidth: 62,
        height: 62,
        width: 62,
        alignSelf: "flex-end",
    },
    listItem: {
        padding: "16 0",
        width: '100%',
    },
    card: {
        display: 'flex',
        maxWidth: '480px',
        margin: 8,
        boxSizing: "border-box",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "4 16",
    },
    content: {
        minWidth: 0,
        padding: "0 !important",
        flexGrow:1,
        display: "flex",
        alignItems: "center"
    }, 
});

class Tv extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            powerState: 'OFF',
            showdialog: false,
        };
    }    

    static getDerivedStateFromProps(nextProps, prevState) {
        
        var changes={}
        if (nextProps.deviceProperties.powerState !== prevState.powerState) {
            changes['powerState']=nextProps.deviceProperties.powerState
        }  
        return changes
    }
    
    handleClickOpen = () => {
        this.setState({ showdialog: true });
    };  
    
    closeDialog = () => { 
        this.setState({ showdialog: false})
    }   
 
    handlePowerChange = event => {
        this.setState({ powerState: event.target.checked, target: this.props.device.friendlyName});
        if (event.target.checked) {
            this.props.sendAlexaCommand(this.props.device.friendlyName, this.props.device.endpointId, 'PowerController', 'TurnOn')
        } else {
            this.props.sendAlexaCommand(this.props.device.friendlyName, this.props.device.endpointId, 'PowerController', 'TurnOff')
        }
    }; 
    
    
    render() {

        const { classes, name, device, deviceProperties } = this.props;
        const { powerState, showdialog } = this.state;

        return (
                <Card className={classes.card}>
                    <CardContent className={classes.content}>
                        <ListItem className={classes.listItem}>
                            <Avatar onClick={ () => this.handleClickOpen()} className={ powerState=='ON' ? classes.hotAvatar : classes.normalAvatar } ><TvIcon /></Avatar>
                            <ListItemText primary={name} secondary={deviceProperties.input} onClick={ () => this.handleClickOpen()}/>
                            <Switch color="primary" checked={powerState=='ON'} onChange={ (e) => this.handlePowerChange(e) } />
                        </ListItem>
                    </CardContent>
                    <TvDialog sendAlexaCommand={this.props.sendAlexaCommand} open={showdialog} close={this.closeDialog} name={name} device={ device } deviceProperties={ deviceProperties } />
                </Card>
        );
    }
}

Tv.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Tv);
