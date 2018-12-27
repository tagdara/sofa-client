import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import HomeIcon from '@material-ui/icons/Home';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';


const styles = theme => ({

    gridList: { 
        maxWidth: 320,
        margin: "0 auto !important",
        backgroundColor: theme.palette.background.default,
    },
    gridButtonTile: {
        width: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    remoteButton: {
        width: "100%",
        flexGrow: 1,
        height: "100%",
    },
});

class TvRemote extends React.Component {

    handleRemoteButton = (buttonName) => {
        console.log('sending button',  buttonName)
        this.props.sendAlexaCommand(this.props.name, this.props.endpointId, 'RemoteController', 'PressRemoteButton', { 'buttonName' : buttonName })
    };

    render() {

        const { classes, deviceProperties } = this.props;

        return (
            <GridList cellHeight={80} className={classes.gridList} cols={3}>
                <GridListTile cols={1}>
                </GridListTile>
                <GridListTile cols={1} className={classes.gridButtonTile}>
                    <Button className={classes.remoteButton} onClick={ (e) => this.handleRemoteButton('CursorUp')}>
                        <ExpandLessIcon />
                    </Button>
                </GridListTile>
                <GridListTile cols={1} className={classes.gridButtonTile}>
                </GridListTile>

                <GridListTile cols={1} className={classes.gridButtonTile}>
                    <Button className={classes.remoteButton} onClick={ (e) => this.handleRemoteButton('CursorLeft')}>
                        <ChevronLeftIcon />
                    </Button>
                </GridListTile>
                <GridListTile cols={1} className={classes.gridButtonTile}>
                    <Button className={classes.remoteButton} onClick={ (e) => this.handleRemoteButton('DpadCenter')}>
                        <FullscreenIcon />
                    </Button>
                </GridListTile>
                <GridListTile cols={1} className={classes.gridButtonTile}>
                    <Button className={classes.remoteButton} onClick={ (e) => this.handleRemoteButton('CursorRight')}>
                        <ChevronRightIcon />
                    </Button>
                </GridListTile>

                <GridListTile cols={1} className={classes.gridButtonTile}>
                </GridListTile>
                <GridListTile cols={1} className={classes.gridButtonTile}>
                    <Button className={classes.remoteButton} onClick={ (e) => this.handleRemoteButton('CursorDown')}>
                        <ExpandMoreIcon />
                    </Button>
                </GridListTile>
                <GridListTile cols={1} className={classes.gridButtonTile}>
                </GridListTile>

                <GridListTile cols={1} className={classes.gridButtonTile}>
                    <Button className={classes.remoteButton} onClick={ (e) => this.handleRemoteButton('Exit')}>
                        <ArrowBackIcon />
                    </Button>
                </GridListTile>
                <GridListTile cols={1} className={classes.gridButtonTile}>
                </GridListTile>
                <GridListTile cols={1} className={classes.gridButtonTile}>
                    <Button className={classes.remoteButton} onClick={ (e) => this.handleRemoteButton('Home')}>
                        <HomeIcon />
                    </Button>
                </GridListTile>
            </GridList>
        );
    }
}

TvRemote.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TvRemote);
