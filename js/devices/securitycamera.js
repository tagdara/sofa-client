import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import CameraDialog from './cameraDialog';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

const styles = theme => ({
    card: {
        margin: 8,
        maxWidth: 480,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'relative',
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
        };
    }    

    componentDidMount() {
        console.log('Selectbuttons',this.props.selectButtons)
        this.setState({'camera': this.state.camerabasepath+this.props.name})
        this.setState({'updateurl':this.state.camerabasepath+this.props.name+'?'+Date.now()})
        this.interval = setInterval(() => this.setState({'updateurl':this.state.camera+'?'+Date.now()}), 3000);
    }
    
    imageFinished() {
        this.setState( {'imageloaded': true})
        this.setState( {'currenturl':this.state.updateurl})
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    closeDialog = () => {
        this.setState({ 'camera': "/thumbnail/dlink/camera/"+this.props.name, showDialog: false });
        //this.setState({ 'camera': "/thumbnail/dlink/camera"+this.props.name})
    };  
    
    handleClickOpen = () => {
        this.setState({ 'camera': "/image/dlink/camera/"+this.props.name, showDialog: true });
        //this.setState({ 'camera': "/image/dlink/camera"+this.props.name})
    };  
    
    render() {

        const { classes, theme } = this.props;

        return (
                <Card className={classes.card} >
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
                    <CameraDialog showDialog={this.state.showDialog} closeDialog={this.closeDialog} src={this.state.currenturl} />
                </Card>
        );
    }
}

SecurityCamera.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SecurityCamera);
