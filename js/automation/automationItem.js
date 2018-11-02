import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import ListIcon from '@material-ui/icons/List';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
        
    item: {
        padding: 16,
    },

});

class AutomationItem extends React.Component {

    render() {
        
        const { classes, name, edit, actionCount, conditionCount } = this.props;
        
        return (
            <ListItem className={classes.item} key={ name+'-reg' }>
            { edit ?
                <Avatar onClick={ () => this.props.delete(name)}><CloseIcon /></Avatar>
            :
                <Avatar onClick={ () => this.props.run(name)}><ListIcon /></Avatar>
            }
                <ListItemText primary={name} secondary={conditionCount+" conditions / "+actionCount+' actions'}  onClick={() => this.props.select(name)}/>
            </ListItem>

        )
    }
}

AutomationItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AutomationItem);
