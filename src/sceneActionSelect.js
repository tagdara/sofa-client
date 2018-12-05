import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { MdLightbulbOutline as LightbulbOutlineIcon} from "react-icons/md";
//import LightbulbOutlineIcon from '@material-ui/icons/LightbulbOutline';


const styles = theme => ({
        
    deviceExpand: {
        padding: "0",
        marginBottom: 2,
    },
    detailList: {
        paddingLeft: 24,
    },
    dialogContent: {
        padding: 0,
    },
    expListItem: {
        padding: 0,
        width: '100%',
    },
    list: {
        minWidth: 320,
        width: "100%",
    },
    sumexp: {
        margin: '0 !important',
    }
        

});

class SceneActionSelect extends React.Component {
    
    render() {
        
        const { classes } = this.props;
        
        return (
            <List className={classes.list} >
                { Object.keys(this.props.sceneData).map((area) => (
                <ExpansionPanel key={ area+'-exp' } elevation={0} CollapseProps={{ unmountOnExit: true }}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} classes={{ root: classes.summary, expanded: classes.sumexp }}>
                        <ListItem className={classes.expListItem} >
                            <ListItemIcon><LightbulbOutlineIcon /></ListItemIcon>
                            <ListItemText primary={area} secondary={Object.keys(this.props.sceneData[area]).length+" scenes"} />
                        </ListItem>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.deviceExpand}>
                        <List className={classes.detailList}>
                            { Object.keys(this.props.sceneData[area]['scenes']).map((scene) => 
                                <ListItem key={area+scene} className={classes.listItem} onClick={() => this.props.select(area+" "+scene, "logic:scene:"+area+" "+scene, 'SceneController', 'Activate')}>
                                    <ListItemIcon><LightbulbOutlineIcon /></ListItemIcon>
                                    <ListItemText primary={scene} />
                                </ListItem>
                            )}
                        </List>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                ))}
            </List>
        )
    }
}

SceneActionSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SceneActionSelect);
