import React from "react";
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

import Slide from  '@material-ui/core/Slide';
import Checkbox from  '@material-ui/core/Checkbox';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import TuneIcon from '@material-ui/icons/Tune';
import EditIcon from '@material-ui/icons/Edit';
import PlaceIcon from '@material-ui/icons/Place';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import TextField from '@material-ui/core/TextField';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import DeviceSelect from "./deviceSelect"

const styles = theme => ({
        
    content: {
        minWidth: 0,
        padding: "0 !important",
        flexGrow:1,
        display: "flex",
        alignItems: "center"
    },
    list: {
        minWidth: 320,
        width: "100%",
    },
    tabTitle: {
        backgroundColor: theme.palette.primary[700],
        padding: 0,
        paddingTop: "env(safe-area-inset-top)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
    },
    dialogTitle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
        color: theme.palette.primary.contrastText,
    },
    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    },
    listItem: {
        padding: 16,
        width: '100%',
    },
    dialogContent: {
        padding: 0,
    },
    sceneExpand: {
        padding: "0",
        marginBottom: 2,
    },
    areaInput: {
        marginTop:0,
        marginLeft: 16,
    }

});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}


class RegionList extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            adding: false,
            selectedName: '',
            selectedDevices: [],
            areamap: {},
            regions: {},
            roomBrowser: false,
            objectBrowser: false,
            newRegionName: '',
        }
    }

    updateList = (regionname, roomlist) => {
        var curmap=this.state.regions
        curmap[regionname]['rooms']=roomlist
        this.setState({regions:curmap})
    }
    
    editNewRegionName = (e) => {
        this.setState({ newRegionName: e.target.value })
    }
    
    handleAdd = (add) => {
        
        if (this.state.regions.hasOwnProperty(this.state.newRegionName)) {
            console.log('That region already exists')
        } else {
            var curmap=this.state.regions;
            curmap[this.state.newRegionName]={'rooms': []}
            this.setState({ regions: curmap, newRegionName: '' },
                () => this.saveRegions()
            );
        }

    }
    
    handleDelete = (delarea) => {
        var curmap=this.state.regions;
        delete curmap[delarea]
        this.setState({regions: curmap},
                () => this.saveRegions()
        );
    }
    
    handleSelect = (region) => {
        if (!this.props.editMode) {
            this.props.handleSelect(region)
        }
    }
    
    componentDidMount() {
  	    fetch('/config/regions')
 		    .then(result=>result.json())
            .then(result=>this.setState({regions:result}));
    }

    saveRegions = () => {
        fetch('/config/regions', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.regions)
            })
            .then(res=>console.log(res))
    }
    
    
    render() {
        
        const { classes, fullScreen  } = this.props;
        
        return (
            <DialogContent className={classes.dialogContent }>
                <List className={classes.List} >
                    { Object.keys(this.state.regions).map(name => 
                        <ListItem className={classes.listItem} key={ name+'-reg' } onClick={() => this.handleSelect(name)}>
                            <ListItemIcon><PlaceIcon /></ListItemIcon>
                            <ListItemText primary={name} secondary={this.state.regions[name]['rooms'].length+' rooms'} />
                            {this.props.editMode ?
                            <ListItemSecondaryAction>
                                <IconButton aria-label="Close" onClick={() => this.handleDelete(name)}>
                                    <CloseIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                            : null }
                        </ListItem>
                    )}

                    { this.props.editMode ?
                        <form className={classes.container} noValidate autoComplete="off">
                        <ListItem className={classes.listItem}>
                            <ListItemIcon><EditIcon /></ListItemIcon>
                            <TextField
                                className={classes.areaInput}
                                id="required"
                                label="Area name"
                                margin="normal"
                                value={this.state.newRegionName}
                                onChange={(e) => this.editNewRegionName(e)}
                            />
                            <ListItemSecondaryAction>
                                <IconButton aria-label="Confirm" onClick={(e) => this.handleAdd(true)}>
                                    <CheckIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        </form>
                    : null }
                </List>
            </DialogContent>
        )
    }
}

RegionList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegionList);
