import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import GridItem from './GridItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({    
    
    spinner: {
        padding: "4 16",
    }
    
});

class PlaceholderCard extends React.Component {

    render() {
        
        const { classes, theme } = this.props;        
        
        return (
            <GridItem wide={true}>
                <ListItem>
                    <CircularProgress  className={classes.spinner} size={24} />
                    <ListItemText primary={"Loading..."} />
                </ListItem>
            </GridItem>
        );
    }
}

PlaceholderCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlaceholderCard);

