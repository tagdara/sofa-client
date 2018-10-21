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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import WarningIcon from '@material-ui/icons/Warning';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Button from '@material-ui/core/Button';
import LightbulbOutlineIcon from '@material-ui/icons/LightbulbOutline';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Slide from  '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import SceneEditorArea from './sceneEditorArea';

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
    },
    input: {
        width: 50,
        margin: theme.spacing.unit,
    },
});

class SceneEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sceneData: {},
        }
        this.levelsChange = this.levelsChange.bind(this);
        this.addScene = this.addScene.bind(this);
        this.deleteScene = this.deleteScene.bind(this);
    }
    
    levelsChange = (area, scene, light, brightness) => {
        console.log(area, scene, light, brightness)
        var newdata=this.state.sceneData
        newdata[area]['scenes'][scene][light]={'set':brightness}
        this.setState({sceneData:newdata},
            () => this.levelsSaveChanges()
        );
    }
    
    setShortcut = (area, scene, shortcut) => {
        console.log(area, scene, shortcut)
        var newdata=this.state.sceneData
        newdata[area]['shortcuts'][shortcut]=scene
        this.setState({sceneData:newdata},
            () => this.levelsSaveChanges()
        );
    }
    

    getAreaData = (data) => {
        
        // This ensures all required fields are available in the data
        
        var frame={}
        
        console.log('data',data)

        if (!data.hasOwnProperty(this.props.area)) {
            frame={'scenes': {}, 'shortcuts': {}}
        } 
        if (!data[this.props.area].hasOwnProperty('scenes')) {
            frame['scenes']=data[this.props.area]
        } else {
            frame['scenes']=data[this.props.area]['scenes']
        }
        if (!data[this.props.area].hasOwnProperty('scenes')) {
            frame['shortcuts']={}
        } else {
            frame['shortcuts']=data[this.props.area]['shortcuts']
        }

        console.log(this.props.area,'=',frame)
        data[this.props.area]=frame
        
        this.setState({sceneData:data})
    }
    
    deleteScene = (sceneName) => {
        var areas=this.state.sceneData
        delete areas[this.props.area]['scenes'][sceneName]
        this.setState({sceneData: areas},
            () => this.levelsSaveChanges()
        );
        
    }
    
    addScene = (sceneName) => {
        var setpoints=['set']
        var sceneFrame={}
        
        for (var j = 0; j < this.props.lightList.length; j++) {
            sceneFrame[this.props.lightList[j]]={}
            for (var k = 0; k < setpoints.length; k++) {
                sceneFrame[this.props.lightList[j]][setpoints[k]]=0
            }
        }
        
        var areas=this.state.sceneData
        areas[this.props.area]['scenes'][sceneName]=sceneFrame
        this.setState({sceneData: areas},
            () => this.levelsSaveChanges()
        );
    }
    
    runScene = sceneName => {
        var fullscene=this.props.name+" "+sceneName
        this.props.sendAlexaCommand(fullscene, "logic:scene:"+fullscene, "SceneController", "Activate")
    }
    
    levelsSaveChanges = () => {
        
        this.props.editFinished()
        console.log(this.state.sceneData)
        fetch('/config/scenemap', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.sceneData)
            })
            .then(res=>console.log(res))
    }


    componentDidMount() {
  	    fetch('/config/scenemap')
 		    .then(result=>result.json())
 		    .then(result=>this.getAreaData(result));
    }
 
    render() {
        
        const { classes } = this.props;
        
        return (
            this.state.sceneData.hasOwnProperty(this.props.area) ?
                <SceneEditorArea computedLevel={this.props.computedLevel} setShortcut={this.setShortcut} addScene={this.addScene} deleteScene={this.deleteScene} runScene={this.runScene} edit={this.props.edit} editFinished={this.props.editFinished} key={'scene-area-'+this.props.area} area={this.props.area} areadata={this.state.sceneData[this.props.area]} levelsChange={this.levelsChange} />
                :
                <DialogContent className={classes.dialogContent } />
        )
    }
};

SceneEditor.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SceneEditor);

