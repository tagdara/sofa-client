import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Switch from '@material-ui/core/Switch';
import TvDialog from './tvDialog';

const styles = theme => ({

    card: {
        display: 'flex',
        maxWidth: '480px',
        margin: 8,
        boxSizing: "border-box",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "8 24 16 24",
    },
    cardname: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    content: {
        minWidth: 0,
        padding: "0 !important",
        flexGrow:1,
        display: "flex",
        justifyContent: "space-between",
    },
    metadata: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
    },
    icon: {
        minWidth: 62,
        height: 62,
        width: 62,
        alignSelf: "flex-end",
    },
});

class Tv extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            endpointId: '',
            showdialog: false,
            icon: '/react/images/tv.jpg?v2',
        };
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

        const { classes, theme } = this.props;

        return (
                <Card className={classes.card}>
                    <CardContent className={classes.content} onClick={ () => this.handleClickOpen()}>
                        <div className={classes.cardname}>
                            <Typography variant="body2">{this.props.name}</Typography>
                        </div>
                        <Switch color="primary" checked={this.props.deviceProperties.powerState=='ON'} onChange={ (e) => this.handlePowerChange(e) } />
                    </CardContent>
                    <CardContent className={classes.content} onClick={ () => this.handleClickOpen()}>
                        <div className={classes.metadata}>
                            <Typography variant="subheading" noWrap>{this.props.deviceProperties.input}</Typography>
                        </div>
                        <img src={this.state.icon} className={classes.icon} />
                    </CardContent>
                    <TvDialog showdialog={this.state.showdialog} closeDialog={this.closeDialog} name={this.props.name} device={ this.props.device } deviceProperties={ this.props.deviceProperties } sendMessage={ this.props.sendMessage } />
                </Card>

        );
    }
}

Tv.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Tv);
