import React from 'react';
import { withStyles, withTheme } from '@material-ui/core/styles';

const styles = theme => ({

    coverDimmer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: theme.palette.background.default,
        opacity: "0.8",
    },

});

class CoverDimmer extends React.Component {
    
    render() {
        const { classes } = this.props;
        return ( 
            <div className={classes.coverDimmer} {...this.props}></div>
        );
    }
}

export default withTheme()(withStyles(styles)(CoverDimmer));
