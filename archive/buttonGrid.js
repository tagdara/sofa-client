import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


const styles = theme => ({

    card: {
        display: 'flex',
        maxWidth: '480px',
        margin: "8 6",
        boxSizing: "border-box",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 0,
        backgroundColor: theme.palette.background.default,
    },    
    content: {
        minWidth: 0,
        padding: "0 !important",
        flexGrow:1,
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
    },

});


class ButtonGrid extends React.Component {
    
    render() {
        
        const { classes } = this.props;
        
        return (
            <Card className={classes.card} elevation={0}>
                <CardContent className={classes.content}>
                    {this.props.children}
                </CardContent>
            </Card> 
        )
    }
};

ButtonGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonGrid);

