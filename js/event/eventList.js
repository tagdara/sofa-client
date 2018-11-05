import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';

import List from '@material-ui/core/List';
import EventItem from "./eventItem"

const styles = theme => ({
        
    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    },

});

class EventList extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            adding: false,
            editing: false,
            events: {},
        }
    }
    
    render() {
        
        const { classes, events} = this.props;
        const { adding, editing } = this.state;
        
        return (
            <React.Fragment>
                <DialogContent>
                    <List>
                    { Object.keys(events).map((name, index) => (
                        <EventItem edit={editing} toggle={this.props.toggle} key={name} name={name} open={this.props.openEditor} index={index} event={events[name]} delete={this.props.delete} />
                    )) }
                    </List>
                </DialogContent>
                <Divider />
                <DialogActions className={classes.dialogActions} >
                    { !adding && !editing ?
                        <Button onClick={ (e) => this.setState({editing:true}) } color="primary" >EDIT</Button>
                    : null }
                    { !adding && !editing ?
                        <Button onClick={ (e) => this.props.openEditor() } color="primary" >ADD</Button>
                    : null }
                    { !editing ?
                        <Button onClick={ (e) => this.props.close() } color="primary" autoFocus>OK</Button>
                    :
                        <Button onClick={ (e) => this.setState({editing:false}) } color="primary" autoFocus>OK</Button>
                    }
                </DialogActions>
            </React.Fragment>
        )
    }
}

EventList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventList);
