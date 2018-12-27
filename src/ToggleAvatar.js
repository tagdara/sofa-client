import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({

    off: {
        color: theme.palette.primary.contrastText,    
    },
    on: {
        color: theme.palette.primary.contrastText,
        background: theme.palette.primary.main,
    },
    notready: {
        color: theme.palette.primary.contrastText,
        backgroundColor: "#bbb",
    },
    closed: {
        color: theme.palette.primary.contrastText,
        backgroundColor: "#6a6",
    },
    open: {
        color: theme.palette.primary.contrastText,
        backgroundColor: "#e66",
    },
    cool: {
        color: theme.palette.primary.contrastText,
        backgroundColor: "#00796B"
    },
    mid: {
        color: theme.palette.primary.contrastText,
        backgroundColor: "#558B2F"
    },
    hot: {
        color: theme.palette.primary.contrastText,
        backgroundColor: "#E65100"
    }
 
});

class ToggleAvatar extends React.Component {

    render() {

        const avclass=this.props.classes[this.props.avatarState]
        
        return (
            <Avatar className={ avclass} onClick={this.props.onClick}>
                {this.props.children}
            </Avatar>
        )
    }
};

ToggleAvatar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToggleAvatar);


