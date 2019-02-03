import React from 'react';

import LightbulbOutlineIcon from '../LightbulbOutline';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import SofaSlider from '../SofaSlider'


class SceneEditorLine extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            brightness: 0,
        };
    }    

    static getDerivedStateFromProps(nextProps, prevState) {
        
        var changes={}
        if (nextProps.brightness !== prevState.brightness) {
            changes['brightness']=nextProps.brightness
        }  
        return changes
    }
    
    handlePreLevelsChange = event => {
        this.setState({ brightness: event });
    }; 

    handleLevelsChange = event => {
        this.props.levelsChange(this.props.endpointId, this.state.brightness)
    };

    render() {
        
        const { name } = this.props;
        const { brightness } = this.state;
        
        return (
            <ListItem>
                <ListItemIcon>
                    <LightbulbOutlineIcon />
                </ListItemIcon>
                <SofaSlider name={name} value={brightness} preChange={this.handlePreLevelsChange} change={this.handleLevelsChange} />
            </ListItem>
        )
    }
};

export default SceneEditorLine;

