import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
 
    litAvatar: {
        color: '#fff',
        backgroundColor: theme.palette.primary.main,
    },
    stack: {
        height: 48,
        display: "flex",
        flexGrow: 1,
        paddingLeft: 16,
        justifyContent: "space-between",
        flexWrap: "wrap",
        maxWidth: 480,
        minWidth: 240,
        width: "100%",
        boxSizing: "border-box",
        overflowX: "hidden",
    },
    stackLabel: {
        alignSelf: "flex-end",
    },
    stackSlider: {
        marginTop: 4,
        marginLeft: 4,
        marginRight: 6,
    },
    sliderTrackHot: {
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main, 
        marginTop: -5, 
        height: 12, 
        width: 12,
    },
    sliderTrack: {
        borderColor: 'silver', 
        backgroundColor: 'silver', 
        marginTop: -5, 
        height: 12, 
        width: 12,
    }

});

class SofaSlider extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            delaySet: false,
        };
    }

    
    static getDerivedStateFromProps(nextProps, prevState) {

        var data=nextProps.deviceProperties
        var changes={}

        if (!prevState.delaySet) {
            if (nextProps.hasOwnProperty('value')) {
                changes.value=nextProps.value
            }
        }
        return changes
    }

    handlePreChange = (event,value) => {
        console.log(value)
        this.setState({ value: value, delaySet: true});
        this.props.preChange(event);
    }; 

    handleChange = (event,value) => {
        console.log(value)
        this.props.change(this.state.value);
    }; 
    
    delaySliderUpdates = () => {
        this.setState({ delaySet: true},
            () =>  setTimeout(() => endSliderDelay(), 1000)
        )
    }
    
    endSliderDelay = () => {
        this.setState({ delaySet: false});
    }
   
    render() {

        const { classes, dis } = this.props;

        return (
                    <div className={classes.stack}>
                        <Typography variant="subtitle1" className={classes.stackLabel} gutterBottom>{this.props.name}</Typography>
                        <Typography variant="caption" className={classes.stackLabel} gutterBottom>{this.state.value+this.props.unit}</Typography>
                        <Slider
                            classes={{ container: classes.slider }}
                            value={this.state.value} step={this.props.step} 
                            min={this.props.min} max={this.props.max}
                            onChange={this.handlePreChange}
                            onDragEnd={this.handleChange}
                        />
                    </div>

        );
    }
}

SofaSlider.defaultProps = {
    name: '',
    unit: "%",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    value: 0,
    tabs: '',
    dis: false,
}

SofaSlider.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SofaSlider);

