import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ListSubheader from '@material-ui/core/ListSubheader';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

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
    },
    im: {
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
        padding: 8,
    },
    dialogContent: {
        height: "100%",
        padding: 8,
    },
    dialogMaxWidth: {
        height: "100%",
        padding: "8 0",
    },
    hotButton: {
        marginRight: 2,
        minWidth: 36,
        "&:hover" : {
            backgroundColor: theme.palette.primary.light,
        },
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    thumbbar: {
        height: 20,
    }
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
                        <Button onClick={() => this.setState({level:'camera', selectedImage:'', selectedHour:'', selectedDate:'', selectedCamera:''})} size="small" className={classes.hotButton }>
                            Cameras
                        </Button>
                        { this.state.selectedCamera ?
                        <Button onClick={() => this.setState({level:'dates', selectedImage:'', selectedHour:'', selectedDate:''})} size="small" className={classes.hotButton }>
                            {this.state.selectedCamera}
                        </Button>
                        : null }
                        { this.state.selectedDate ?
                        <Button onClick={() => this.setState({level:'hours', selectedImage:'', selectedHour:''})} size="small" className={classes.hotButton }>
                            {this.state.selectedDate}
                        </Button>
                        : null }
                        { this.state.selectedHour ?
                        <Button onClick={() => this.setState({level:'pics', selectedImage:''})} size="small" className={classes.hotButton }>
                            {this.state.selectedHour}
                        </Button>
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
                    : null }
                    { this.state.level=='pics' ?
                        <GridList>
                            { Object.keys(this.state.pics).map((pic) =>
                                <GridListTile key={pic} onClick={() => this.choosePic(pic)} >
                                    <img src={"/thumbnail/dlink/captures/"+this.state.selectedCamera+"/Picture/"+this.state.selectedDate+"/"+this.state.selectedHour+"/"+pic} />
                                    <GridListTileBar subtitle={this.state.pics[pic].date} className={classes.thumbbar} />
                                </GridListTile>
                            )}
                        </GridList>
                    : null }
                    { this.state.level=='image' ?
                        <ListItem className={classes.stackedImageLabel}>
                        <img
                            className={classes.im}
                            src={this.state.imageurl}
                            onClick={ () => this.startOver()}
                        />
                        <Typography variant="subtitle1">{this.state.selectedImage}</Typography>
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
