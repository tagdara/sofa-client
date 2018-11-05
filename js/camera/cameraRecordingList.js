import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

const styles = theme => ({
        
    list: {
        minWidth: 320,
    },
    content: {
        minWidth: 0,
        padding: "0 !important",
        flexGrow:1,
        display: "flex",
        alignItems: "center"
    },
    metadata: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
    },
    icon: {
        minWidth: 62,
        height: 62,
        width: 62,
        alignSelf: "flex-end",
    },
    CameraRecordingList: {
        width: "100%",
        color: "#eee",
    },
    camListItem: {
        color: "#eee",
    },
    im: {
        backgroundColor: '#111',
        width: "100%",
    },    
    stackedImageLabel: {
        display: "flex",
        flexDirection: "column",
        padding: 0,
        color: "#eee",
    },
    breadcrumbs: {
        display: "flex",
    },
    crumbItem: {
        color: "#eee",
        padding: 8,
        borderLeft: "1px solid #aaa",
    },
    dialogContent: {
        backgroundColor: '#111',
        height: "100%",
        padding: 8,
    },
    dialogMaxWidth: {
        backgroundColor: '#111',
        height: "100%",
        padding: "8 0",
    },
});


class CameraRecordingList extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            level: 'camera',
            selectedCamera: '',
            selectedDate: '',
            selectedHour: '',
            dates: [],
            hours: [],
        }
    }
    
    
    startOver = () => {
        this.setState({level:'camera', selectedCamera:'', selectedHour:'', selectedDate:''})
    }
    
    chooseCamera = cameraname => { 

  	    fetch('/list/dlink/captures/'+cameraname+'/Picture')
 		    .then(result=>result.json())
            .then(result=>this.setState({ dates: result, 'selectedCamera': cameraname, 'level':'dates'}));
    }

    chooseDate = cameraDate => { 
        console.log('Cd', '/list/dlink/captures/'+this.state.selectedCamera+'/Picture/'+cameraDate)
  	    fetch('/list/dlink/captures/'+this.state.selectedCamera+'/Picture/'+cameraDate)
 		    .then(result=>result.json())
            .then(result=>this.setState({ hours: result, 'selectedDate': cameraDate, 'level':'hours'}));
    }
    
    chooseHour = cameraHour => { 
  	    fetch('/list/dlink/captures/'+this.state.selectedCamera+'/Picture/'+this.state.selectedDate+"/"+cameraHour)
 		    .then(result=>result.json())
            .then(result=>this.setState({ pics: result, 'selectedHour': cameraHour, 'level':'pics'}));
    }
    
    choosePic = pic => { 
        var imageurl='/image/dlink/captures/'+this.state.selectedCamera+'/Picture/'+this.state.selectedDate+"/"+this.state.selectedHour+"/"+pic
        this.setState({ selectedImage: pic, imageurl:imageurl, level:'image'});
    }


    render() {
    
        const { classes } = this.props;
        
        return (
                <React.Fragment>
                    <DialogTitle disableTypography className={classes.breadcrumbs}>
                        { this.state.selectedCamera ?
                        <Typography variant="subheading" className={classes.crumbItem} onClick={() => this.setState({level:'camera', selectedImage:'', selectedHour:'', selectedDate:'', selectedCamera:''})} >
                            Cameras
                        </Typography>
                        : null }
                        { this.state.selectedCamera ?
                        <Typography variant="subheading" className={classes.crumbItem} onClick={() => this.setState({level:'dates', selectedImage:'', selectedHour:'', selectedDate:''})} >
                            {this.state.selectedCamera}
                        </Typography>
                        : null }
                        { this.state.selectedDate ?
                        <Typography variant="subheading" className={classes.crumbItem} onClick={() => this.setState({level:'hours', selectedImage:'', selectedHour:''})} >
                            {this.state.selectedDate}
                        </Typography>
                        : null }
                        { this.state.selectedHour ?
                        <Typography variant="subheading" className={classes.crumbItem} onClick={() => this.setState({level:'pics', selectedImage:''})} >
                            {this.state.selectedHour}
                        </Typography>
                        : null }
                    </DialogTitle>
                    <DialogContent className={ classes.dialogContent }>
                    <List>
                    { this.state.level=='camera' ?
                    this.props.cameras.map((camera) =>
                        <ListItem key={ camera+'sel' } onClick={() => this.chooseCamera(camera)} >
                            <Avatar src={"/thumbnail/dlink/camera/"+camera} />
                            <ListItemText primary={camera} classes={{ primary: classes.camListItem}}  />
                        </ListItem>
                    )
                    :null    
                    }
                    { this.state.level=='dates' ?
                    this.state.dates.map((picdate) =>
                        <ListItem key={ picdate+'sel' } onClick={() => this.chooseDate(picdate)} >
                            <ListItemText primary={picdate} classes={{ primary: classes.camListItem}}  />
                        </ListItem>
                    )
                    :null    
                    }
                    { this.state.level=='hours' ?
                    this.state.hours.map((pichour) =>
                        <ListItem key={ pichour+'sel' } onClick={() => this.chooseHour(pichour)}  >
                            <ListItemText primary={pichour} classes={{ primary: classes.camListItem}}  />
                        </ListItem>
                    )
                    :null    
                    }
                    { this.state.level=='pics' ?
                    this.state.pics.map((pic) =>
                        <ListItem key={ pic+'sel' } onClick={() => this.choosePic(pic)} >
                            <Avatar src={"/thumbnail/dlink/captures/"+this.state.selectedCamera+"/Picture/"+this.state.selectedDate+"/"+this.state.selectedHour+"/"+pic} />
                            <ListItemText primary={pic} classes={{ primary: classes.camListItem}}  />
                        </ListItem>
                    )
                    :null    
                    }
                    { this.state.level=='image' ?
                        <ListItem className={classes.stackedImageLabel}>
                        <img
                            className={classes.im}
                            src={this.state.imageurl}
                            onClick={ () => this.startOver()}
                        />
                        <Typography variant="subheading">{this.state.selectedImage}</Typography>
                        </ListItem>
                    :null    
                    }
                    </List>
                    </DialogContent>
                </React.Fragment>
        );
    }
}

CameraRecordingList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CameraRecordingList);
