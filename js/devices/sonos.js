import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SonosGroupDialog from './sonosGroupDialog';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

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
            tracked: ['artist','title','album','art','linked','input','playbackState'],
            players: {},
            endpointId: '',
            title: '',
            artist: '',
            artbase: "",
            art: "",
            linked: [],
            input: '',
            open: false,
            playbackState: 'STOPPED',
            linkedPlayers: {},
            showOverlay: true,
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
    
    componentDidMount() {
        console.log(this.props.devices)
    }
    

    render() {

        const { classes, theme } = this.props;
        
        return (
            this.props.name===this.props.deviceProperties.input || this.props.deviceProperties.input==''? 

                <Paper elevation={1} className={classes.content} >
                    <List className={classes.linklist} >
                        <ListItem className={classes.listItem}> 
                            <ListItemText variant="body2" primary={this.props.name}  onClick={ () => this.props.chooseActivePlayer(this.props.name) }/>
                            <Chip 
                                label={ 'Group' } 
                                className={ classes.chip }
                                onClick={ () => this.handleClickOpen()}
                            />

                        </ListItem>
                        {this.createListLinks()}
                    </List>

                    <List >
                        <ListItem className={classes.listItem}>
                            <Avatar 
                                src={this.props.deviceProperties.art}
                            />
                            { this.props.deviceProperties.title!='' ?
                                <ListItemText primary={this.props.deviceProperties.title} secondary={this.props.deviceProperties.artist}/>
                                :
                                <ListItemText primary='No music selected.'/>
                            }
                        </ListItem>
                    </List>
                    <SonosGroupDialog sendAlexaCommand={this.props.sendAlexaCommand} key={this.props.name+'grp'} open={this.state.showdialog} close={this.closeDialog} coordinator={this.props.name} devices={this.props.devices} players={this.props.linkedPlayers} linked={this.props.deviceProperties.linked} sendMessage={this.props.sendMessage} />
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
