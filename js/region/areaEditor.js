import React from "react";
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Checkbox from  '@material-ui/core/Checkbox';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
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

import { withData } from '../DataContext/withData';
import AreaLine from "./areaLine"
import AreaAdd from "./areaAdd"

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
    list: {
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


class AreaEditor extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            adding: false,
            selectedName: '',
            selectedDevices: [],
            areas: {},
            objectBrowser: false,
            region: {},
        }
    }
    
    saveArea = (area,data) => {

        fetch('/save/logic/area/'+area, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(this.props.loadAreas())

    }
    
    isLightInArea = (light) => {
        if (this.props.area.hasOwnProperty('lights')) {
            if (this.props.area.lights.hasOwnProperty(light)) {
                return true
            }
        }
        return false
    }   
    
    handleCheck = (event, item) => {
        console.log(event.target.checked,item)
        
        if (event.target.checked) {
            var curarea=this.props.area
            curarea.lights[item.friendlyName]={'endpointId':item.endpointId}
            this.saveArea(this.props.name, curarea)
        } else {
            if (this.isLightInArea(item.friendlyName)) {
                var curarea=this.props.area
                delete curarea.lights[item.friendlyName]
                console.log('removed',item.friendlyName,curarea)
                this.saveArea(this.props.name, curarea)
            }
        }
    }
    
    componentDidMount() {
        console.log(this.props.area)
    }

    render() {
        
        const { classes, area } = this.props;
        const { add, edit, areas, region } = this.state;
        
        return (
            <React.Fragment>
                { this.props.devices.map((device) => (
                    device.displayCategories[0]=='LIGHT' ?
                    <ListItem className={classes.listItem} key={ device.endpointId+'-dlg' }>
                        <ListItemIcon><TuneIcon /></ListItemIcon>
                        <ListItemText primary={device.friendlyName} secondary={device.displayCategories[0]}/>
                        <ListItemSecondaryAction>
                            <Checkbox
                                onClick={ event => this.handleCheck(event, device) }
                                checked={ this.isLightInArea(device.friendlyName) }
                                color='primary'
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                    : null
                ))}
            </React.Fragment>
        )
    }

}

AreaEditor.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withData(withStyles(styles)(AreaEditor));
