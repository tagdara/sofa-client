import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Switch from '@material-ui/core/Switch';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import TvDialog from './tvDialog';

const styles = theme => ({

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
            icon: '/react/images/tv.jpg?v2',
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
        console.log(this)
    }   
 
    handlePowerChange = event => {
        this.setState({ powerState: event.target.checked, target: this.props.device.friendlyName});
        if (event.target.checked) {
            this.props.sendAlexaCommand(this.props.device.friendlyName, '', 'PowerController', 'TurnOn')
        } else {
            this.props.sendAlexaCommand(this.props.device.friendlyName, '', 'PowerController', 'TurnOff')
        }
    }; 
    
    
    render() {

        const { classes } = this.props;

        return (
                <Card className={classes.card}>
                    <CardContent className={classes.content}>
                        <ListItem className={classes.listItem}>
                            <Avatar src={this.state.icon} onClick={ () => this.handleClickOpen()} />
                            <ListItemText primary={this.props.name} secondary={this.props.deviceProperties.input} onClick={ () => this.handleClickOpen()}/>
                            <Switch color="primary" checked={this.state.powerState=='ON'} onChange={ (e) => this.handlePowerChange(e) } />
                        </ListItem>
                    </CardContent>
                    <TvDialog sendAlexaCommand={this.props.sendAlexaCommand}  showdialog={this.state.showdialog} closeDialog={this.closeDialog} name={this.props.name} device={ this.props.device } deviceProperties={ this.props.deviceProperties } />
                </Card>
        );
    }
}

Tv.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Tv);
