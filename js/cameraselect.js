import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';

import SecurityCamera from './devices/securitycamera';
import CameraGrid from './devices/cameraGrid';


const styles = theme => ({
        
    CameraSelect: {
        margin: 8,
        padding: 0,
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
    
    setCurrentCamera = (data) => {
        this.setState({cameras:data})
        if (data.length>0) {
            this.setState( {currentCamera:data[0]} )
        } else {
            this.setState( {currentCamera:null} )
        }
    }
    
    nextCamera = () => {
        var nextcam=this.state.currentCameraNumber+1
        if (nextcam>this.state.cameras.length-1) { nextcam=0; }
        if (nextcam<0) {nextcam=this.state.cameras.length-1; }
        
        this.setState({currentCameraNumber: nextcam, currentCamera:this.state.cameras[nextcam]})
    }
    
    prevCamera = () => {
        var nextcam=this.state.currentCameraNumber-1
        if (nextcam>this.state.cameras.length-1) { nextcam=0; }
        if (nextcam<0) {nextcam=this.state.cameras.length-1; }
        
        this.setState({currentCameraNumber: nextcam, currentCamera:this.state.cameras[nextcam]})
    }
    
    handleGridOpen = () => {
        this.setState({ showGrid: true });
    };  

    handleGridClose = () => {
        this.setState({ showGrid: false });
    };  
    
    componentDidMount() {
  	    fetch('/data/cameras')
 		    .then(result=>result.json())
 		    .then(data=>this.setCurrentCamera(data))
    }

    
    render() {
        
        const { classes } = this.props;

        return (

            <Card className={classes.CameraSelect}>
                { this.state.currentCamera!=null ?
                <SecurityCamera selectButtons={true} openGrid={ this.handleGridOpen } key={ this.state.currentCamera } name={ this.state.currentCamera } sender={this.props.sender} nextCamera={this.nextCamera} prevCamera={this.prevCamera}></SecurityCamera>
                :null
                }
                { this.state.showGrid ?
                <CameraGrid open={this.state.showGrid} close={this.handleGridClose} cameras={this.state.cameras} />
                :null
                }
            </Card> 
        );
    }
}

CameraSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CameraSelect);
