import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';

import List from '@material-ui/core/List';
import ScheduleItem from "./scheduleItem"

const styles = theme => ({
        
    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    },

});
const monthLongNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];  
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];  

class ScheduleList extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            adding: false,
            editing: false,
            schedule: {},
        }
    }
    
    render() {
        
        const { classes, schedule} = this.props;
        const { adding, editing } = this.state;
        
        return (
            <React.Fragment>
                <DialogContent>
                    <List>
                    { Object.keys(schedule).map((name, index) => (
                        <ScheduleItem edit={editing} toggle={this.props.toggle} key={name} name={name} open={this.props.openEditor} index={index} schedule={schedule[name]} delete={this.props.delete} />
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

ScheduleList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScheduleList);
