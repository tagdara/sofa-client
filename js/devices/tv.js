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
        event.stopPropagation();
        this.setState({ powerState: event.target.checked, target: this.props.device.friendlyName});
        if (event.target.checked) {
            var ops={"op":"set", "path":"discovery/"+this.props.device.friendlyName+"/PowerController/powerState", "command":"TurnOn", "value":event.target.checked}
        } else {
            var ops={"op":"set", "path":"discovery/"+this.props.device.friendlyName+"/PowerController/powerState", "command":"TurnOff", "value":event.target.checked}
        }
        this.props.sendMessage(JSON.stringify(ops));
    }; 
    
    
    render() {

        const { classes } = this.props;

        return (
                <Card className={classes.card}>
                    <CardContent className={classes.content} onClick={ () => this.handleClickOpen()}>
                        <ListItem className={classes.listItem}>
                            <Avatar src={this.state.icon} />
                            <ListItemText primary={this.props.name} secondary={this.props.deviceProperties.input}/>
                            <Switch color="primary" checked={this.state.powerState=='ON'} onChange={ (e) => this.handlePowerChange(e) } />
                        </ListItem>
                    </CardContent>
                    <TvDialog showdialog={this.state.showdialog} closeDialog={this.closeDialog} name={this.props.name} device={ this.props.device } deviceProperties={ this.props.deviceProperties } sendMessage={ this.props.sendMessage } />
                </Card>
        );
    }
}

Tv.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Tv);
