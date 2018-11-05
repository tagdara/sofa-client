import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';

import SonosGroupDialog from './sonosGroupDialog';

const styles = theme => ({
    content: {
        display: 'flex',
        margin: "2 2",
        boxSizing: "border-box",
        padding: "8 16",
        flexWrap: 'wrap',
        alignItems: "center",
        flexGrow: 1,
        minWidth: "320px",
        flexBasis: 0,
    },
    linklist: {
        width: "100%",
    },
    listItem: {
        padding: 0,
    }
});

class Sonos extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            showdialog: false,
        };
    }    


    createLinks = () => {
        
        let links=[]
        for (var i = 0; i < this.props.deviceProperties.linked.length; i++) {
            links.push(<Typography  key={ this.props.deviceProperties.linked[i]+"link" } variant="body2">{this.props.deviceProperties.linked[i]}</Typography>)
        }
        return links
    }

    createListLinks = () => {
        
        let links=[]
        for (var i = 0; i < this.props.deviceProperties.linked.length; i++) {
            links.push(<ListItem className={this.props.classes.listItem} key={ this.props.deviceProperties.linked[i]+"link" }><ListItemText variant="body2" primary={this.props.deviceProperties.linked[i]} /></ListItem>)
        }
        return links
    }

    
    handleClickOpen = () => {
        this.setState({ showdialog: true });
    };  
    
    closeDialog = () => {
        this.setState({ showdialog: false });
    };    
    

    addDefaultSrc(ev){
        ev.target.src = '/image/sonos/logo'
    }
    
    render() {

        const { classes, theme, name, devices, deviceProperties, linkedPlayers } = this.props;
        
        return (
            name===deviceProperties.input || deviceProperties.input==''? 

                <Paper elevation={1} className={classes.content} >
                    <List className={classes.linklist} >
                        <ListItem className={classes.listItem}> 
                            <ListItemText variant="body2" primary={name}  onClick={ () => this.props.chooseActivePlayer(name) }/>
                            <Chip 
                                label={ 'Group' } 
                                className={ classes.chip }
                                onClick={ () => this.handleClickOpen()}
                            />

                        </ListItem>
                        {this.createListLinks()}
                    </List>

                    <List onClick={ () => this.props.chooseActivePlayer(name) } >
                        <ListItem className={classes.listItem}>
                            <Avatar onError={this.addDefaultSrc} src={deviceProperties.art} />
                            { deviceProperties.title!='' ?
                                <ListItemText primary={deviceProperties.title} secondary={deviceProperties.artist}/>
                                :
                                <ListItemText primary='No music selected.'/>
                            }
                        </ListItem>
                    </List>
                    <SonosGroupDialog sendAlexaCommand={this.props.sendAlexaCommand} key={name+'grp'} open={this.state.showdialog} close={this.closeDialog} coordinator={name} devices={devices} players={linkedPlayers} linked={deviceProperties.linked} />
                </Paper>
            : null
        );
    }
}

Sonos.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Sonos);
