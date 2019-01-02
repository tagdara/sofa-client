import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({

    off: {
        margin: 4,
        color: theme.palette.primary.contrastText, 
    },
    on: {
        margin: 4,
        color: theme.palette.primary.contrastText,
        background: theme.palette.primary.main,
    },

});

class ToggleChip extends React.Component {

    render() {

        const avclass=this.props.classes[this.props.chipState]
        
        return (
            <Chip 
                label={this.props.label}
                className={ avclass }
                onClick={ this.props.onClick}
            />
        )
    }
};

ToggleChip.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToggleChip);


