import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import SofaCard from './sofaCard';
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
            <SofaCard>
                <CircularProgress  className={classes.spinner} size={24} />
                <Typography>Loading...</Typography>
            </SofaCard>
        );
    }
}

PlaceholderCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlaceholderCard);

