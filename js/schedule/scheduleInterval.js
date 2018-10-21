import React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import TextField from  '@material-ui/core/TextField';

import Chip from '@material-ui/core/Chip';
import ScheduleIcon from '@material-ui/icons/Schedule';


const styles = theme => ({
        
    listItem: {
        padding: "16 0",
        width: '100%',
    },
    activeIcon: {
        backgroundColor: "#6666FF",
    },
    chip: {
        margin: "0 4",
    },
    hotChip: {
        backgroundColor: "#6666FF",
        margin: "0 4",
    },
    

});


class ScheduleInterval extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            intervalUnits: ['days','hours','minutes'],
        };
    }

    render() {
        
        const { classes } = this.props;
        
        return (
            <ListItem className={classes.listItem}> 
                <Avatar className={ classes.activeIcon }><ScheduleIcon /></Avatar>
                <ListItemText primary="Every" />
                <TextField
                    className={classes.dataInput}
                    id={'specint'}
                    label={'Interval'}
                    margin={"normal"}
                    value={this.props.interval}
                    onChange={(e) => this.props.editInterval(e)}
                />
                { this.state.intervalUnits.map((unit) => 
                    <Chip className={this.props.unit==unit ? classes.hotChip : classes.chip } key={unit}  label={unit} onClick={(e) => this.props.editUnit(unit)}/>
                )}
            </ListItem>
        )
    }

}

ScheduleInterval.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScheduleInterval);
