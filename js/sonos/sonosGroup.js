import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import SpeakerIcon from '@material-ui/icons/Speaker';

const styles = theme=> ({
        
    list: {
        minWidth: 320,
    },
});

class SonosGroup extends React.Component {
    
    render() {
        
        const { classes, fullScreen, name, coordinator, linked  } = this.props;
        
        return (
            <ListItem>
                <ListItemIcon><SpeakerIcon /></ListItemIcon>
                <ListItemText primary={name}/>
                <ListItemSecondaryAction>
                    <Checkbox color="primary"
                        checked={coordinator==name || linked.includes(name)}
                        onClick={event => this.props.handleCheck(event, name)}
                    />
                </ListItemSecondaryAction>
            </ListItem>
        )
    }

}

SonosGroup.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SonosGroup);
