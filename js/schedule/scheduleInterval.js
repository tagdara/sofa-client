import React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import TextField from  '@material-ui/core/TextField';

import ScheduleIcon from '@material-ui/icons/Schedule';
import Button from '@material-ui/core/Button';


const styles = theme => ({
        
    item: {
        padding: "16 0",
        width: '100%',
    },
    activeIcon: {
        backgroundColor: theme.palette.primary.dark,
    },
    shortLabel: {
        flexGrow:0,
    },
    input: {
        marginTop:0,
        flexGrow:0,
        marginBottom:0,
        maxWidth: 50,
        marginRight: 16,
    },
    button: {
        minWidth: 36,
        marginRight: 2,
    },
    hotButton: {
        marginRight: 2,
        minWidth: 36,
        "&:hover" : {
            backgroundColor: theme.palette.primary.light,
        },
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
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
            <ListItem className={classes.item}> 
                <Avatar className={ classes.activeIcon }><ScheduleIcon /></Avatar>
                <ListItemText className={ classes.shortLabel} primary="Every" />
                <TextField
                    className={classes.input}
                    id={'specint'}
                    margin={"normal"}
                    type="number"
                    value={this.props.value}
                    onChange={(e) => this.props.change(this.props.intervalTarget, e.target.value)}
                />
                { this.state.intervalUnits.map((unit) => 
                    <Button size="small" className={this.props.unit==unit ? classes.hotButton : classes.button } key={unit} onClick={(e) => this.props.change(this.props.unitTarget, unit)}>
                        {unit}
                    </Button>
                )}
            </ListItem>
        )
    }

}

ScheduleInterval.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScheduleInterval);
