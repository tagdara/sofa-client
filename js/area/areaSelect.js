import React from "react";
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Slide from  '@material-ui/core/Slide';
import Checkbox from  '@material-ui/core/Checkbox';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import IconButton from '@material-ui/core/IconButton';
import PlaceIcon from '@material-ui/icons/Tune';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import SofaDialog from '../sofaDialog';

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
    thermostatList: {
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
    }

});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}


class AreaSelect extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            selectedAreas: this.props.selectedAreas,
        }
    }


    handleToggle = dev => () => {
        console.log(this.state)

        if (this.state.selectedAreas.includes(dev)) {
            var newdevlist=this.state.selectedAreas
            var idx=newdevlist.indexOf(dev)
            newdevlist.splice(idx,1)
        } else {
            var newdevlist=this.state.selectedAreas
            newdevlist.push(dev)
        }
        
        this.setState( {selectedAreas:newdevlist.sort()} )
            
    }
    
    handleSave = (e) => {
        this.props.updateList(this.props.name, this.state.selectedAreas)
        this.props.close(e)
    }
    
    render() {
        
        const { classes, fullScreen  } = this.props;
        
        return (
            <SofaDialog open={this.props.open} close={this.props.close} title={this.props.name} >
                <Divider />
                <DialogContent className={classes.dialogContent }>
                    <List className={classes.thermostatList} >
                    { 
                    this.props.areas ?
                    Object.keys(this.props.areas).map(name => 
                        <ListItem className={classes.listItem} key={ name+'-grp' } onClick={() => this.handleClick(name)}>
                            <ListItemIcon><PlaceIcon /></ListItemIcon>
                            <ListItemText primary={name} secondary={Object.keys(this.props.areas[name]['lights']).length+' devices'} />
                            <ListItemSecondaryAction>
                                <Checkbox
                                    onChange={ this.handleToggle(name) }
                                    checked={ this.state.selectedAreas.includes(name) }
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                    )
                    : null
                    }
                    </List>
                </DialogContent>
                <Divider />
                <DialogActions className={classes.dialogActions} >
                    <Button onClick={(e) => this.handleSave(e)} color="primary" autoFocus>OK</Button>
                </DialogActions>
            </SofaDialog>
        )
    }

}

AreaSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AreaSelect);
