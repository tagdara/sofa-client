import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import SceneEditorScene from './sceneEditorScene';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';

import TextField from '@material-ui/core/TextField';

import Checkbox from  '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const styles = theme => ({

     dialogContent: {
        height: "100%",
        padding: 8,
    }, 
    listItem: {
        padding: "0 8",
        
    },
    sceneInput: {
        marginLeft: 16,
    }
});    

class SceneAdd extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            newSceneName: '',
        }
    }

    editNewSceneName = (e) => {
        this.setState({ newSceneName: e.target.value })
    }

    render() {
        
        const { classes } = this.props;
        
        return (
            <List>
            <form className={classes.container} noValidate autoComplete="off">
                <ListItem className={classes.listItem}>
                    <Avatar><EditIcon /></Avatar>
                    <TextField
                        className={classes.sceneInput}
                        id="required"
                        label="New scene name"
                        margin="none"
                        value={this.state.newSceneName}
                        onChange={(e) => this.editNewSceneName(e)}
                    />
                    <ListItemSecondaryAction>
                        <IconButton aria-label="Confirm" onClick={(e) => this.props.addScene(this.state.newSceneName)}>
                            <CheckIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </form>
            </List>
        )
    }
};

SceneAdd.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SceneAdd);

