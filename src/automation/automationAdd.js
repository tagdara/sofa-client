import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';

const styles = theme => ({
        
    item: {
        padding: 16,
    },
    sec: {
        paddingRight: 16,
    },
    input: {
        marginTop:0,
        marginLeft: 16,
        flexGrow: 1,
    },

});

class AutomationItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
        }
    }
    
    edit = (name) => {
        this.setState({name:name})
    }

    render() {
        
        const { classes  } = this.props;
        
        return (
                <ListItem className={classes.item}>
                    <Avatar>
                        <EditIcon />
                    </Avatar>
                    <TextField
                        className={classes.input}
                        id="required"
                        label="Automation Name"
                        margin="normal"
                        value={this.state.name}
                        onChange={(e) => this.edit(e.target.value)}
                    />
                        <IconButton aria-label="Confirm" onClick={(e) => this.props.add(this.state.name)}>
                            <CheckIcon />
                        </IconButton>
                        <IconButton aria-label="Cancel" onClick={(e) => this.props.cancel()}>
                            <CloseIcon />
                        </IconButton>
                </ListItem>
        )
    }
}

AutomationItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AutomationItem);
