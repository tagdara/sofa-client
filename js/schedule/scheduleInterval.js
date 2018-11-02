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
        display: "flex",
        padding: "16 0",
        width: '100%',
        alignItems: "center",
    },
    dataInput: {
        width: 50,
        margin:0,
    },    
    activeIcon: {
        backgroundColor: theme.palette.primary.dark,
    },
    chip: {
        margin: "0 4",
    },
    hotChip: {
        backgroundColor: theme.palette.primary.dark,
        margin: "0 4",
    },

});


class ScheduleInterval extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            intervalUnits: ['day','hour','min'],
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
                    margin={"normal"}
                    type="number"
                    value={this.props.value}
                    onChange={(e) => this.props.change(this.props.intervalTarget, e.target.value)}
                />
                { this.state.intervalUnits.map((unit) => 
                    <Chip className={this.props.unit==unit ? classes.hotChip : classes.chip } key={unit}  label={unit} onClick={(e) => this.props.change(this.props.unitTarget, unit)}/>
                )}
            </ListItem>
        )
    }

}

ScheduleInterval.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScheduleInterval);
