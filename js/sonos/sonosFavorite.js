import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({

    content: {
        display: 'flex',
        margin: "2 2",
        boxSizing: "border-box",
        padding: "8 16",
        alignItems: "center",
        flexBasis: 0,
        flexGrow: 1,
        flexWrap: 'wrap',
        minWidth: "320px",
        maxHeight: "100px",
    },
    listItem: {
        padding: 0,
    }        

});

class SonosFavorite extends React.Component {
    
    render() {

        const { classes } = this.props;

        return (
            <Paper elevation={1} className={classes.content}>
                <List>
                    <ListItem  className={classes.listItem}>
                        <Avatar onClick={ () => this.handleClickSelect() } src={this.props.item['album_art_uri']} />
                        <ListItemText primary={this.props.name} secondary={ this.props.item.description }/>
                    </ListItem>
                </List>
            </Paper>
        );
    }
}

SonosFavorite.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SonosFavorite);

