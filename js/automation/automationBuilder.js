import React from "react";
import PropTypes from 'prop-types';

import AutomationList from './automationList';
import AutomationEditor from './automationEditor';
import SofaDialog from '../sofaDialog';

import { withData } from '../dataContext';

class AutomationDialog extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            controllers: {},
            automations: {},
            newAutomationName: '',
            addingAction: false,
            adding: false,
            editing: false,
            selectedAutomation: '',
            regionData: {},
            areamap: {},
            sceneData: {},
        }
    }
    
    handleClose = () => {
        this.setState({editing: false, adding: false})
        this.props.close()
    }

    handleEditAutomation = () => {
        this.setState({addingAction:true})
    }

    handleDoneEditAutomation = () => {
        this.setState({addingAction:false, editing:false, adding: false})
    }

    handleDoneEditing = () => {
        this.setState({editing:false})
    }

    handleSelectAutomation = (name) => {
        this.setState({adding: false, editing:true, selectedAutomation:name})
    }

    render() {
        
        return (
            <SofaDialog title="Automation" open={this.props.open} close={this.props.close} >
                { this.state.editing ?
                    <AutomationEditor name={this.state.selectedAutomation} doneEditing={this.handleDoneEditing} />
                :
                    <AutomationList close={this.handleClose} sendAlexaCommand={this.props.sendAlexaCommand} save={this.saveAutomationActions} delete={this.handleDeleteAutomation} editMode={this.state.adding} doneEditing={this.doneAdding} controllers={this.state.controllers} select={this.handleSelectAutomation} />
                }
            </SofaDialog>
        )
    }
}

export default withData(AutomationDialog);
