import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


const styles = theme => ({
        
    card: {
        display: 'flex',
        minHeight: 64,
        maxWidth: '480px',
        margin: 8,
        boxSizing: "border-box",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "16",
    },
    content: {
        minWidth: 0,
        padding: "0 !important",
        flexGrow:1,
        display: "flex",
        alignItems: "center",
				flexDirection: "column",
    },
});


class SofaCard extends React.Component {
    
    render() {
    
        const { classes } = this.props;
        
        return (
            <Card className={classes.card}>
                <CardContent className={classes.content} >
                    {this.props.children}
                </CardContent>
            </Card>
        );
    }
}

SofaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SofaCard);
