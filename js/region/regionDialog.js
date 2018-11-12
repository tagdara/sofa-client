import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import RegionList from "./regionList"
import AreaSelect from "./areaSelect"
import SofaDialog from "../sofaDialog"

const styles = theme => ({
        
    list: {
        minWidth: 320,
        width: "100%",
    },
});

class RegionDialog extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            add: false,
            selectedName: '',
            selectedDevices: [],
            areamap: {},
            regions: {},
            areaSelect: false,
            objectBrowser: false,
        }
    }

    done = () => {
        this.setState({ add: false, edit: false, areaSelect: false})
    };
    
    handleClick = (name) => {
        if (!this.state.adding) {
            if (!this.state.regions[name].hasOwnProperty('rooms')) {
                var srooms=[]
            } else {
                var srooms=this.state.regions[name]['rooms']
            }
            this.setState( { selectedRegion: name, selectedRooms:srooms, roomBrowser: true} )
        }
    }
    
    handleRegionEdit = (region) => {
        console.log('hre',region)
        this.setState({areaSelect:true, selectedRegion: region})
    }


    render() {
        
        const { classes  } = this.props;
        const { add } = this.state;
        
        return (
            <SofaDialog open={this.props.open} close={this.props.close} title="Regions" >
                { this.state.areaSelect ?
                    <AreaSelect name={this.state.selectedRegion} close={this.done} devices={this.props.devices} propertiesFromDevices={this.props.propertiesFromDevices} />
                : 
                    <RegionList close={this.props.close} done={this.done} Editing={this.doneEditing} handleRegionEdit={this.handleRegionEdit} selectRegion={this.props.selectRegion} />
                }
            </SofaDialog>
        )
    }

}

RegionDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegionDialog);
