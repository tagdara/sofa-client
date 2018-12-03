import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

import CameraDialog from './cameraDialog';

const styles = theme => ({
    
    card: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'relative',
        flexBasis: 0,
        flexGrow: 1,
        minWidth: "320px",
        margin: 0,
    },
    nextbutton: {
        position: "absolute",
        right: 8,
    },
    prevbutton: {
        position: "absolute",
        left: 8,
    },
    gridbutton: {
        position: "absolute",
        left: 8,
        bottom: 8,
    },
    im: {
        width: "100%",
        height: "auto",
    },
    hiddenimage: {
        height: 0,
    },
    hidden: {
        backgroundColor: "#777",
        position: "relative",
        width: "100%",
        paddingTop: '56.25%', // 16:9
    },
    coverx: {
        height: "240",
        width: "480",
    },
    cover: {
        display: "none",
    },
    spinner: {
        position: "absolute",
        margin: "auto",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
    

});

class SecurityCamera extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            camera: "",
            camerabasepath: "/thumbnail/dlink/camera/",
            updateurl: "",
            currenturl: "",
            imageloaded: false,
            showDialog: false,
            refreshInterval: 3000,
        };
        this.changeInterval = this.changeInterval.bind(this);
    }    
    
    componentDidMount() {
        this.setState({'camera': this.state.camerabasepath+this.props.name})
        this.setState({'updateurl':this.state.camerabasepath+this.props.name+'?'+Date.now()})
        this.interval = setInterval(() => this.setState({'updateurl':this.state.camera+'?'+Date.now()}), this.state.refreshInterval);
    }
    
    imageFinished() {
        this.setState( {'imageloaded': true})
        this.setState( {'currenturl':this.state.updateurl})
    }

    changeInterval() {
        
        var refreshInterval=this.state.refreshInterval
        
        if (refreshInterval==500) { 
            refreshInterval=5000
        } else if (refreshInterval==1000) { 
            refreshInterval=500
        } else if (refreshInterval==3000) { 
            refreshInterval=1000
        } else if (refreshInterval==5000) { 
            refreshInterval=3000
        }
        clearInterval(this.interval);
        this.interval = setInterval(() => this.setState({'updateurl':this.state.camera+'?'+Date.now()}), refreshInterval);
        this.setState({refreshInterval:refreshInterval})
         
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    closeDialog = () => {
        this.setState({ 'camera': "/thumbnail/dlink/camera/"+this.props.name, showDialog: false });
    };  
    
    handleClickOpen = () => {
        this.setState({ 'camera': "/image/dlink/camera/"+this.props.name, showDialog: true });
    };  
    
    render() {

        const { classes, theme } = this.props;

        return (
                <Paper elevation={0} className={classes.card} >
                    <img
                        className={this.state.imageloaded ? classes.im : classes.hiddenimage}
                        src={this.state.updateurl}
                        onLoad={ () => this.imageFinished() }
                        onClick={ () => this.handleClickOpen()}
                    />
                    {this.state.imageloaded ? null :
                    <div className={classes.hidden}>
                        <CircularProgress  className={classes.spinner} size={50} />
                    </div>
                    }
                    {this.state.imageloaded && this.props.selectButtons ?
                    <IconButton color="primary" className={classes.prevbutton} onClick={ () => this.props.nextCamera()}>
                        <ChevronLeftIcon />
                    </IconButton>
                    : null }
                    {this.state.imageloaded && this.props.selectButtons ?
                    <IconButton color="primary" className={classes.nextbutton} onClick={ () => this.props.nextCamera()}>
                        <ChevronRightIcon />
                    </IconButton>
                    : null }
                    {this.props.selectButtons ?
                    <IconButton color="primary" className={classes.gridbutton} onClick={ () => this.props.openGrid()}>
                        <ViewModuleIcon />
                    </IconButton>
                    : null }                    
                    <CameraDialog refreshInterval={this.state.refreshInterval} changeInterval={this.changeInterval} showDialog={this.state.showDialog} closeDialog={this.closeDialog} src={this.state.currenturl} />
                </Paper>
        );
    }
}

SecurityCamera.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SecurityCamera);