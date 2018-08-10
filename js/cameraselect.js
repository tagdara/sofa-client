
import React from "react";
import Receiver from './devices/receiver';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SecurityCamera from './devices/securitycamera';
import CameraGrid from './devices/cameraGrid';

const styles = theme => ({
        
    CameraSelect: {
        paddingBottom: 4,
        minWidth: 320,
    },
});

class CameraSelect extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cameras: [],
            currentCamera: null,
            currentCameraNumber: 0,
            showGrid: false,
        };
        
        this.nextCamera = this.nextCamera.bind(this);
        this.prevCamera = this.prevCamera.bind(this);
        this.handleGridOpen = this.handleGridOpen.bind(this);
        this.handleGridClose = this.handleGridClose.bind(this);
        
    }
    
    
    setBaseState = data => {

        return {cameras:data}

    }
    
    componentDidMount() {
  	    fetch('http://home.dayton.home:8090/data/cameras')
 		    .then(result=>result.json())
 		    .then(data=>this.setState({cameras:data, currentCamera:data[0]}))
    }
    
    nextCamera = () => {
        var nextcam=this.state.currentCameraNumber+1
        if (nextcam>this.state.cameras.length-1) { nextcam=0; console.log('set nextcam to 0 due to length') }
        if (nextcam<0) {nextcam=this.state.cameras.length-1; console.log('set nextcam to l-1 due to length')}
        
        this.setState({currentCameraNumber: nextcam, currentCamera:this.state.cameras[nextcam]})
    }
    
    prevCamera = () => {
        var nextcam=this.state.currentCameraNumber-1
        if (nextcam>this.state.cameras.length-1) { nextcam=0; console.log('set nextcam to 0 due to length') }
        if (nextcam<0) {nextcam=this.state.cameras.length-1; console.log('set nextcam to l-1 due to length')}
        
        this.setState({currentCameraNumber: nextcam, currentCamera:this.state.cameras[nextcam]})
    }
    
    handleGridOpen = () => {
        this.setState({ showGrid: true });
        //this.setState({ 'camera': "/image/dlink/camera"+this.props.name})
    };  

    handleGridClose = () => {
        this.setState({ showGrid: false });
        //this.setState({ 'camera': "/image/dlink/camera"+this.props.name})
    };  

    
    render() {
        
        const { classes } = this.props;

        return (
            <div className={classes.CameraSelect}>
                {
                <SecurityCamera selectButtons={true} openGrid={ this.handleGridOpen } key={ this.state.currentCamera } name={ this.state.currentCamera } sender={this.props.sender} nextCamera={this.nextCamera} prevCamera={this.prevCamera}></SecurityCamera>
                }
                <CameraGrid showGrid={this.state.showGrid} closeDialog={this.handleGridClose} cameras={this.state.cameras} />
            </div> 
        );
    }
}

CameraSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CameraSelect);
