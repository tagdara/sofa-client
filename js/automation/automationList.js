import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import List from '@material-ui/core/List';

import AutomationItem from "./automationItem"
import AutomationAdd from "./automationAdd"

const styles = theme => ({
        
    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    },
    dialogContent: {
        height: "100%",
        padding: 0,
    },
});


class AutomationList extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            adding: false,
            editing: false,
            automations: {},
        }
    }

    runAutomation = name => {
        this.props.sendAlexaCommand(name, 'logic:activity:'+name, 'SceneController', 'Activate')
    }

    editNewAutomationName = (e) => {
        this.setState({ newAutomationName: e.target.value })
    }
    
    handleAddAutomation = () => {
        this.setState({ adding: true, editing: false}, () => 
            this.end.scrollIntoView({ behavior: "smooth" })
        )
    }

    handleEditAutomations = () => {
        this.setState({ adding: false, editing: true})
    }
    
    handleDoneAddEdit = () => {
        this.setState({ adding: false, editing: false})
    }


    handleSelect = (automation) => {
        console.log('handle select', automation, this.state.editing)
        if (!this.state.editing) {
            this.props.select(automation)
        }
    }
    
    addAutomation = (automationName) => {

        if (this.state.automations.hasOwnProperty(automationName)) {
            console.log('An automation with that name already exists',automationName)
            return false
        } else {

            var automations=this.state.automations
            automations[automationName]={'actionCount': 0, 'conditionCount': 0}
            console.log('Automatiions will be', automations)
    
            fetch('/add/logic/automation/'+automationName, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify([])
                })
                .then(this.setState({automations: automations}))
        }
    } 
    
    deleteAutomation = (automationName) => {

        var automations=this.state.automations
        delete automations[automationName]

        fetch('/del/logic/automation/'+automationName, {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify([])
            })
            .then(this.setState({automations:automations}));
    } 
    
    componentDidMount() {
  	    fetch('/list/logic/automationlist')
 		    .then(result=>result.json())
            .then(result=>this.setState({automations:result}));
    }
    
    
    render() {
        
        const { classes, fullScreen  } = this.props;
        const { editing, adding, automations } = this.state
        
        return (
            <React.Fragment>
                <DialogContent className={classes.dialogContent }>
                    <List ref={(element) => { this.listContainer = element; }}>
                        { Object.keys(automations).sort().map(automation => 
                            <AutomationItem select={this.handleSelect} edit={editing} triggerCount={automations[automation].triggerCount } actionCount={automations[automation].actionCount} conditionCount={automations[automation].conditionCount } name={automation} delete={this.deleteAutomation} run={this.runAutomation} key={ automation+'-reg' } />
                        )}
                        { adding ? 
                            <AutomationAdd  add={this.addAutomation} cancel={this.handleDoneAddEdit} />
                        : null }
                        <div ref={(el) => { this.end = el; }} />
                    </List>
                </DialogContent>
                <Divider />
                <DialogActions className={classes.dialogActions} >
                    { !adding && !editing ?
                        <Button onClick={() => this.handleAddAutomation()} color="primary" autoFocus>ADD</Button>
                    : null }
                    { !adding && !editing ?
                        <Button onClick={() => this.handleEditAutomations()} color="primary" autoFocus>EDIT</Button>
                    : null }
                    { !adding && !editing ?
                        <Button onClick={() => this.props.close()} color="primary" autoFocus>CLOSE</Button>
                    : null }
                    { adding || editing ?
                        <Button onClick={() => this.handleDoneAddEdit()} color="primary" autoFocus>DONE</Button>
                    : null }
                </DialogActions>
            </React.Fragment>
        )
    }
}

AutomationList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AutomationList);
