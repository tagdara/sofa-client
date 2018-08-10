
import React from "react";
import Receiver from './devices/receiver';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SecurityCamera from './devices/securitycamera';

const styles = theme => ({
        
    CameraList: {
        paddingBottom: 4,
        minWidth: 320,
    },
});

class CameraList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cameras: [],
        };
    }
    
    
    setBaseState = data => {

        return {cameras:data}

    }
    
    componentDidMount() {
  	    fetch('/data/cameras')
 		    .then(result=>result.json())
 		    .then(data=>this.setState({cameras:data}))
    }
    
    render() {
        
        const { classes } = this.props;

        return (
            <div className={classes.CameraList}>
                {
                    this.state.cameras.map((name) => 
                        <SecurityCamera key={ name } name={ name } sender={this.props.sender} ></SecurityCamera>
                    )
                }
            </div> 
        );
    }
}

CameraList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CameraList);
