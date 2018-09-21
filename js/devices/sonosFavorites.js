import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';import IconButton from '@material-ui/core/IconButton';
import ScreenRotationIcon from '@material-ui/icons/ScreenRotation';
import CloseIcon from '@material-ui/icons/Close';
import Sonos from './sonos';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import SonosFavorite from './sonosFavorite';
import Avatar from '@material-ui/core/Avatar';
import WarningIcon from '@material-ui/icons/Warning';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Button from '@material-ui/core/Button';
import GroupLight from './grouplight'
import LightbulbOutlineIcon from '@material-ui/icons/LightbulbOutline';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Slide from  '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import CustomScroll from 'react-custom-scroll';

const styles = theme => ({
    
    closed: {
        backgroundColor: "#6a6",
    },
    open: {
        backgroundColor: "#e66",
    },
    countLabel: {
        padding: "8 16",
    },
    card: {
        display: 'flex',
        maxWidth: '480px',
        margin: 8,
        boxSizing: "border-box",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 16,
        width: '100%',
    },    
    content: {
        minWidth: 0,
        padding: "0 !important",
        flexGrow:1,
        display: "flex",
        alignItems: "center"
    },
    camGridDialog: {
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
    },
    lGrid: {
        display: "flex",
        flexWrap: "wrap",

        padding: 0,
        flex: "auto",
        flexGrow: 0,
        margin: "0 0 auto 0",
    },
    paper: {
        boxShadow: "none",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",

    },
    camGridToolbar: {
        paddingTop: "env(safe-area-inset-top)",
    },
    gridTitle: {
        color: theme.palette.primary.contrastText,
    },
    menuIcon: {
        color: theme.palette.primary.contrastText,
    },
    tabRow: {
        color: theme.palette.primary.contrastText,
        display: "flex",
        justifyContent: "center",
    },
    tabInfo: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary[500],
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
    },

    topBar: {
        width: "100%",
    },
    tabTitle: {
        backgroundColor: theme.palette.primary[500],
        paddingTop: "env(safe-area-inset-top)",
        padding: "16px 24px 0px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
    },
    gridPlaceholder: {
        height: 2,
        minWidth: 320,
        flexGrow: 1,
    },
    fullDialog: {
        boxSizing: "border-box",
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
        
        const { classes, fullScreen  } = this.props;
        
        return (
            <Dialog 
                fullScreen={fullScreen}
                fullWidth={true}
                maxWidth={'md'}
                open={this.props.open}  
                onClose={this.props.close}
                TransitionComponent={Transition}
                className={fullScreen ? classes.fullDialog : classes.normalDialog }
            >
                <DialogTitle id="area-dialog-title" className={classes.tabTitle} >
                    <Tabs className={classes.tabRow} value={this.state.frontTab} onChange={this.handleTab}>
                        <Tab label="On" />
                        <Tab label="All" />
                    </Tabs>
                </DialogTitle>
                <Divider />
                <DialogContent className={classes.dialogContent }>
                    <div className={classes.lGrid }>
                {
                    this.state.favorites.map((fav) =>
                    <SonosFavorite key={ fav.item_id } itemid={ fav.item_id } name={ fav.title } item={ fav } sendMessage={this.props.sendMessage}  />
                )}
                <div className={classes.gridPlaceholder}></div>
                </div>
                </DialogContent>
                <Divider />
                <DialogActions className={classes.dialogActions} >
                    <Button onClick={(e) => this.props.close(e)} color="primary" autoFocus>OK</Button>
                </DialogActions>
            </Dialog>
        )
    }
};

SonosFavorites.propTypes = {
    classes: PropTypes.object.isRequired,
    fullScreen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(withMobileDialog()(SonosFavorites));

