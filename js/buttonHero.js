import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Avatar from '@material-ui/core/Avatar';
import TuneIcon from '@material-ui/icons/Tune';

import ButtonDialog from './buttonDialog';
import ScheduleDialog from './scheduleDialog';

const styles = theme => ({
        
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
    listItem: {
        padding: "16 0",
        width: '100%',
    },
    

});


class ButtonHero extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            showOverlay: false,
            showSched: false,
        }
    }
    
    handleOverlay = () => {
        this.setState({showOverlay: true})
    }

    closeOverlay = () => {
        this.setState({showOverlay: false})
    }

    handleSched = () => {
        this.setState({showSched: true})
    }

    closeSched = () => {
        this.setState({showSched: false})
    }

    render() {
    
        const { classes } = this.props;
        
        return (
                <Card className={classes.card}>
                    <CardContent className={classes.content} >
                        <ListItem className={classes.listItem}>
                            <Avatar onClick={this.handleOverlay}><TuneIcon/></Avatar>
                            <ListItemText onClick={this.handleSched} primary='Other Devices'/>
                        </ListItem>
                    </CardContent>
                    <ButtonDialog close={this.closeOverlay} open={this.state.showOverlay} devices={this.props.devices} deviceProperties={ this.props.deviceProperties } sendMessage={this.props.sendMessage} />
                    <ScheduleDialog close={this.closeSched} open={this.state.showSched} devices={this.props.devices} deviceProperties={ this.props.deviceProperties } sendMessage={this.props.sendMessage} />
                </Card>
        );
    }
}

ButtonHero.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonHero);
