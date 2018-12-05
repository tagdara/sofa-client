import React from "react";
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';

import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';

const styles = theme => ({
        

    listItem: {
        padding: 16,
        width: '100%',
    },
    areaInput: {
        marginTop: 0,
        marginLeft: 16,
        flexGrow: 1,
    }

});


class RegionList extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            newRegionName: '',
        }
    }

    editNewRegionName = (e) => {
        this.setState({ newRegionName: e.target.value })
    }
    
    render() {
        
        const { classes } = this.props;
        
        return (
            <ListItem className={classes.listItem}>
                <ListItemIcon><EditIcon /></ListItemIcon>
                <TextField
                    className={classes.areaInput}
                    id="required"
                    label="Area name"
                    margin="normal"
                    value={this.state.newRegionName}
                    onChange={(e) => this.editNewRegionName(e)}
                />
                <IconButton aria-label="Confirm" onClick={(e) => this.props.add(this.state.newRegionName)}>
                    <CheckIcon />
                </IconButton>
            </ListItem>
        )
    }
}

RegionList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegionList);
