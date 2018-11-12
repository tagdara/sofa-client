import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const styles = theme => ({
        
    listItem: {
        padding: 16,
        width: '100%',
    },
    input: {
        marginTop:0,
        marginLeft: 16,
    }

});


class AreaAdd extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            newAreaName: '',
        }
    }

    editNewAreaName = (e) => {
        this.setState({ newAreaName: e.target.value })
    }
    
    render() {
        
        const { classes, addArea } = this.props;
        const { newAreaName } = this.state;
        
        return (
            <form noValidate autoComplete="off">
                <ListItem className={classes.listItem}>
                    <ListItemIcon><EditIcon /></ListItemIcon>
                    <TextField
                        className={classes.input}
                        id="required"
                        label="Area name"
                        margin="normal"
                        value={newAreaName}
                        onChange={(e) => this.editNewAreaName(e)}
                    />
                    <ListItemSecondaryAction>
                        <IconButton onClick={(e) => addArea(newAreaName)}>
                            <CheckIcon />
                        </IconButton>
                        </ListItemSecondaryAction>
                </ListItem>
            </form>
        )
    }

}

AreaAdd.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AreaAdd);
