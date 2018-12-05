import React from "react";
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';

import TuneIcon from '@material-ui/icons/Tune';
import EditIcon from '@material-ui/icons/Edit';
import PlaceIcon from '@material-ui/icons/Place';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import LayersIcon from '@material-ui/icons/Layers';

import RegionAdd from "./regionAdd"

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


class RegionList extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            add: false,
            adding: false,
            selectedName: '',
            selectedDevices: [],
            areamap: {},
            regions: {},
            roomBrowser: false,
            objectBrowser: false,
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
    
    handleAdd = (item) => {
        this.props.done()
        if (this.state.regions.hasOwnProperty(item)) {
            console.log('That region already exists')
        } else {
            var curmap=this.state.regions;
            curmap[item]={"areas": {}, "scenes": {}}
            this.setState({ regions: curmap },
                () => this.addRegion(item, curmap[item])
            );
        }

    }
    
    handleDelete = (item) => {
        var curmap=this.state.regions;
        delete curmap[item]
        this.setState({regions: curmap},
                () => this.delRegion(item)
        );
    }
    
    handleSelect = (region) => {
        if (!this.props.editMode) {
            this.props.handleSelect(region)
        }
    }
    
    addRegion = (region, data) => {
        fetch('/add/logic/region/'+region, {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res=>console.log(res))
    }
    
    delRegion = (region) => {
        fetch('/del/logic/region/'+region, {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            })
            .then(res=>console.log(res))
    }

    saveRegion = (region, data) => {
        fetch('/save/logic/region/'+region, {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res=>console.log(res))
    }
    
    componentDidMount() {
  	    fetch('/list/logic/regions')
 		    .then(result=>result.json())
            .then(result=>this.setState({regions:result}));

    }
    
    done = () => {
        this.setState({add: false, edit: false})
    }
    
    render() {
        
        const { classes } = this.props;
        const { add, edit } = this.state;
        
        return (
            <React.Fragment>
                <DialogContent className={classes.dialogContent }>
                    <List className={classes.List} >
                        { Object.keys(this.state.regions).sort().map(name => 
                            <ListItem className={classes.listItem} key={ name+'-reg' } onClick={ () => this.props.selectRegion(name)}>
                                <ListItemIcon><LayersIcon /></ListItemIcon>
                                <ListItemText primary={name} secondary={Object.keys(this.state.regions[name].areas).length+' rooms'} />
                                {this.state.edit ?
                                <ListItemSecondaryAction>
                                    <IconButton onClick={() => this.handleDelete(name)}>
                                        <CloseIcon />
                                    </IconButton>
                                    <IconButton onClick={() => this.props.handleRegionEdit(name)}>
                                        <EditIcon />
                                    </IconButton>                                        
                                </ListItemSecondaryAction>
                                : null }
                            </ListItem>
                        )}
                        { add ?
                            <RegionAdd add={this.handleAdd} />
                        : null }
                    </List>
                </DialogContent>
                <DialogActions className={classes.dialogActions} >
                    { !edit && !add ?
                        <React.Fragment>
                            <Button onClick={(e) => this.setState({ add: true}) } color="primary" autoFocus>ADD</Button>
                            <Button onClick={(e) => this.setState({ edit: true}) } color="primary" autoFocus>EDIT</Button>
                            <Button onClick={(e) => this.props.close()} color="primary" autoFocus>OK</Button>
                        </React.Fragment>
                    :   <React.Fragment>
                        { add ?
                            <Button onClick={(e) => this.done() } color="primary" autoFocus>CANCEL</Button>
                        : 
                            <Button onClick={(e) => this.done() } color="primary" autoFocus>DONE</Button> 
                        }
                        </React.Fragment>
                    }
                </DialogActions>
            </React.Fragment>

        )
    }
}

RegionList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegionList);
