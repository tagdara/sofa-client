import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import EditIcon from '@material-ui/icons/Edit';
import PlaceIcon from '@material-ui/icons/Place';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import Checkbox from  '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';


const styles = theme => ({
        
    listItem: {
        padding: 16,
        width: '100%',
    },

});


class AreaLine extends React.Component {
    
    render() {
        
        const { classes, name, deviceCount, inRegion, edit } = this.props;
        
        return (
            <ListItem className={classes.listItem} key={ name+'-grp' }>
                <ListItemIcon><PlaceIcon /></ListItemIcon>
                <ListItemText primary={name} secondary={ deviceCount+' devices'} />
                { edit ?
                    <ListItemSecondaryAction>
                        <IconButton onClick={(e) => this.delArea(name)}>
                            <CloseIcon />
                        </IconButton>
                        <IconButton onClick={() => this.props.editArea(name)}>
                            <EditIcon />
                        </IconButton>                                        
                    </ListItemSecondaryAction>
                    :
                    <ListItemSecondaryAction>
                        <Checkbox color="primary"
                            checked={inRegion}
                            onClick={event => this.props.handleCheck(event, name)}
                        />
                    </ListItemSecondaryAction>
                }
            </ListItem>
        )
    }

}

AreaLine.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AreaLine);
