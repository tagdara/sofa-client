import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withLayout } from './layout/withLayout';

import SecurityCamera from './camera/securitycamera';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import GridItem from './GridItem';
import GridBreak from './GridBreak';
import CircularProgress from '@material-ui/core/CircularProgress';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const useStyles = makeStyles({
     thumbbar: {
        height: 20,
    },
    thumbpic: {
        width: "100%",
    },
    stackedImageLabel: {
        display: "flex",
        flexDirection: "column",
        padding: 0,
        color: "#eee",
    },
    im: {
        width: "100%",
        height: "auto",
        borderRadius: 4,
    },
    hiddenimage: {
        height: 0,
    },
    hidden: {
        borderRadius: 4,
        position: "relative",
        width: "100%",
        paddingTop: '56.25%', // 16:9
    },
    spinner: {
        position: "absolute",
        margin: "auto",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

});

function CameraHistory(props) {

    const classes = useStyles();
    const [pic, setPic] = useState('')
    const [level, setLevel] = useState('dates')
    const [camera, setCamera] = useState('')
    const [dates, setDates] = useState({})
    const [hours, setHours] = useState({})
    const [pics, setPics] = useState({})
    const [selectedHour, setSelectedHour] = useState('')
    const [selectedDate, setSelectedDate] = useState('')
    const [selectedDateLabel, setSelectedDateLabel] = useState('')
    const [selectedHourLabel, setSelectedHourLabel] = useState('')

    const mobileBreakpoint = 800
    const isMobile = window.innerWidth <= mobileBreakpoint;
    const [loadedImages, setLoadedImages] = useState([])
    
    useEffect(() => {
  	    chooseCamera(props.name)
    }, []);
    
    function addLoadedImage(imagename) {
        if (loadedImages.includes(imagename)) {
            return true
        } else {
            setLoadedImages([...loadedImages, imagename])
            return true
        }
    }
    
    function chooseCamera(cameraname) { 

  	    fetch('/list/dlink/captures/'+cameraname+'/Picture')
 		    .then(result=>result.json())
            .then(result=>setDates(result))
            .then(result=>setLevel('dates'))
            .then(result=>setCamera(cameraname))
    }
    
    function chooseDate(cameraDate, datelabel) { 
        setSelectedDate(cameraDate)
        setSelectedDateLabel(datelabel)
        
  	    fetch('/list/dlink/captures/'+camera+'/Picture/'+cameraDate)
 		    .then(result=>result.json())
            .then(result=>setHours(result))
            .then(result=>setLevel('hours'))
    }
    
    function chooseHour(cameraHour, hourLabel) { 
        setSelectedHour(cameraHour)
        setSelectedHourLabel(hourLabel)
        setLoadedImages([])
  	    fetch('/list/dlink/captures/'+camera+'/Picture/'+selectedDate+"/"+cameraHour)
 		    .then(result=>result.json())
 		    .then(result=>setPics(result))
 		    .then(result=>setLevel('pics'))
    }
    
    function formatHour(hourdir) {
        var hourout=parseInt(hourdir)
        if (hourout==0) {
            return "12:00am"
        } else if (hourout==12) {
            return "12:00pm"
        } else {
            if (hourout<12) {
                return hourout+":00am"
            } else {
                return hourout-12+":00pm"
            }
        }
    }

    return (
        <React.Fragment>
            <GridBreak label={'History for '+props.name} size="h6" >
                {props.name &&
                    <Button onClick={ () => { props.setLayoutCard('CameraLayout', {}) } }>
                        {props.name}
                    </Button>
                }
                {selectedDate &&
                    <Button onClick={ () => {setSelectedDate(''); setLevel('dates'); }}>
                        {selectedDateLabel}
                    </Button>
                }
                {selectedHour &&
                    <Button onClick={ () => {setSelectedHour(''); setLevel('hours'); }}>
                        {selectedHourLabel}
                    </Button>
                }

            </GridBreak>
            { level=='pics' && pic ? 
                <GridItem xs={12}>
                <ListItem className={classes.stackedImageLabel}>
                    <img
                        className={classes.im}
                        src={'/image/dlink/captures/'+camera+'/Picture/'+selectedDate+"/"+selectedHour+"/"+pic}
                        onClick={ () => this.startOver()}
                    />
                    <Typography variant="subtitle1">{this.state.selectedImage}</Typography>
                </ListItem>
                </GridItem>
                :null
            }
            
            { level=='dates' ?
                Object.keys(dates).sort().reverse().map((picdate) =>
                    <GridItem xs={ isMobile ? 12 : 2} key={ picdate+'sel' }>
                        <ListItem onClick={() => chooseDate(picdate, dates[picdate].date)} >
                            <ListItemText primary={dates[picdate].date}  />
                        </ListItem>
                    </GridItem>
                    )
                :null                     
            }
            { level=='hours' ?
                hours.map((pichour) =>
                    <GridItem xs={ isMobile ? 12 : 2} key={ pichour+'sel' } >
                        <ListItem onClick={() =>chooseHour(pichour,formatHour(pichour))}  >
                            <ListItemText primary={formatHour(pichour)}  />
                        </ListItem>
                    </GridItem>
                )
                : null 
            }
            { level=='pics' ?
                Object.keys(pics).sort().map((pic) =>
                    <GridItem key={pic} onClick={() => setPic(pic)} xs={ isMobile ? 6 : 2} nopad={true}>
                        <img src={"/thumbnail/dlink/captures/"+camera+"/Picture/"+selectedDate+"/"+selectedHour+"/"+pic}  
                            className={ loadedImages.includes("/thumbnail/dlink/captures/"+camera+"/Picture/"+selectedDate+"/"+selectedHour+"/"+pic) ? classes.im : classes.hiddenimage}
                            onLoad={ () => addLoadedImage("/thumbnail/dlink/captures/"+camera+"/Picture/"+selectedDate+"/"+selectedHour+"/"+pic) }
                            onClick={ () => handleClickOpen("/thumbnail/dlink/captures/"+camera+"/Picture/"+selectedDate+"/"+selectedHour+"/"+pic)}
                            />
                    { loadedImages.includes("/thumbnail/dlink/captures/"+camera+"/Picture/"+selectedDate+"/"+selectedHour+"/"+pic) ?
                        <GridListTileBar subtitle={pics[pic].date} className={classes.thumbbar} />
                    : 
                        <div className={classes.hidden}>
                            <CircularProgress className={classes.spinner} size={50} />
                        </div>
                    }
                    </GridItem>
                )
            : null }

        </React.Fragment>
    )
}
export default withLayout(CameraHistory)
