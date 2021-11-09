import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';

import ListSubheader from '@mui/material/ListSubheader';

import DataUsageIcon from '@mui/icons-material/DataUsage';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import SpeakerIcon from '@mui/icons-material/Speaker';
import SpeakerGroupIcon from '@mui/icons-material/SpeakerGroup';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import TuneIcon from '@mui/icons-material/Tune';
import ListIcon from '@mui/icons-material/List';
import TvIcon from '@mui/icons-material/Tv';
import LightbulbOutlineIcon from '../LightbulbOutline';
import Button from '@mui/material/Button';


const styles = theme => ({
        
    button: {
        minWidth: 36,
        marginRight: 2,
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
    line: {
        width: "100%",
        backgroundColor: theme.palette.background.paper,
    }
        

});

class SofaCategoryFilter extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            actions: [],
            filter: '',
            icons: {'SCENE_TRIGGER':TuneIcon, 'ACTIVITY_TRIGGER':ListIcon, 'LIGHT':LightbulbOutlineIcon, 'BUTTON':TouchAppIcon, 'SPEAKER':SpeakerIcon, 'THERMOSTAT':DataUsageIcon, 'RECEIVER':SpeakerGroupIcon, 'TV':TvIcon}
        }
    }
    
    getIcon = (category, size='default') => {
            
        var pxSize=24;
        if (size==='small') {
            pxSize=16
        }
        var RealIcon=DeveloperBoardIcon
        if (this.state.icons.hasOwnProperty(category)) {
            RealIcon=this.state.icons[category]
        }
        
        return <RealIcon size={pxSize} fontSize={size} />
    }
    
    filterIcon = (icon) => {
        console.log('filter',this.state.filter,'vs',icon)
        if (this.state.filter===icon) {
            this.setState({filter:''})
            this.props.applyFilter('')
        }  else {
            this.setState({filter:icon})
            this.props.applyFilter(icon)
        }
    }

    render() {
        
        const { classes } = this.props;
        
        return (
            <ListSubheader className={classes.line}>
            { Object.keys(this.state.icons).map((icon) => 
                <Button key={icon+"icon"} size="small" onClick={ () => this.filterIcon(icon)} className={ (this.state.filter===icon) ? classes.hotButton : classes.button }>
                    {this.getIcon(icon,'small')}
                </Button>
            )}
            </ListSubheader>
        )
    }
}

SofaCategoryFilter.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SofaCategoryFilter);
