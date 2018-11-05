import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import SofaDialog from '../sofaDialog';
import SonosFavorite from './sonosFavorite';

const styles = theme => ({
    
    lGrid: {
        display: "flex",
        flexWrap: "wrap",

        padding: 0,
        flex: "auto",
        flexGrow: 0,
        margin: "0 0 auto 0",
    },
    gridPlaceholder: {
        height: 2,
        minWidth: 320,
        flexGrow: 1,
        flexBasis: 0,
    },

    dialogContent: {
        height: "100%",
        padding: 8,
    },
    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",    
    }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class SonosFavorites extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            filter: 'on',
            frontTab: 0,
            favorites: [],
        }
    }

    componentDidMount() {
  	    fetch('/list/sonos/favorites')
 		    .then(result=>result.json())
            .then(data=>this.setState({favorites: data}));
    }
    
    handleTab = (event, tabno) => {
        if (tabno==0) { this.setState({frontTab: tabno, filter: 'on'})}
        if (tabno==1) { this.setState({frontTab: tabno, filter: 'all'})}
    };    
    
    render() {
        
        const { classes } = this.props;
        
        return (
            <SofaDialog open={this.props.open} close={this.props.close} maxWidth={'md'} title="Sonos Favorites" tabValue={this.state.frontTab} tabChange={this.handleTab}
                        tabs={ ["Favorites","Queue"] } >
                <DialogContent className={classes.dialogContent }>
                    <div className={classes.lGrid }>
                        { this.state.favorites.map((fav) =>
                            <SonosFavorite key={ fav.item_id } itemid={ fav.item_id } name={ fav.title } item={ fav } />
                        )}
                        <div className={classes.gridPlaceholder}></div>
                    </div>
                </DialogContent>
                <Divider />
                <DialogActions className={classes.dialogActions} >
                    <Button onClick={(e) => this.props.close(e)} color="primary" autoFocus>OK</Button>
                </DialogActions>
            </SofaDialog>
        )
    }
};

SonosFavorites.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SonosFavorites);

