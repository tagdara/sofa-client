import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

const styles = theme => ({
    card: {
        display: 'flex',
        maxWidth: '480px',
        margin: 8
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        height: 100,
        width: 100,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    
});

class Sonos extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            players: {},
            endpointId: '',
            title: '',
            artist: '',
            artbase: "/image/sonos/player/RINCON_B8E937ECE1F001400/AVTransport/current_track_meta_data/album_art_uri",
            art: "/image/sonos/player/RINCON_B8E937ECE1F001400/AVTransport/current_track_meta_data/album_art_uri",
            linked: [],
            
        };
    }    


    static getDerivedStateFromProps(nextProps, prevState) {
        return Sonos.parseState(nextProps.deviceState, prevState.endpointId, prevState)
    
    }

    static parseState(data, endpointId, prevState) {
        
        var changes={}
        if (data===undefined) {
            return changes
        }
        
        if (data.hasOwnProperty('event')) {
            
            if (endpointId=='' ) {
                changes.endpointId=data.event.endpoint.endpointId
            }
            console.log(endpointId,data)
            if ((endpointId==data.event.endpoint.endpointId) || changes.hasOwnProperty('endpointId')) {

                if (data.hasOwnProperty('context')){
                    
                    for (var i = 0; i < data.context.properties.length; i++) {
                        if (data.context.properties[i].name=='artist') {
                            changes.artist=data.context.properties[i].value;
                        } 
                        else if (data.context.properties[i].name=='title') {
                            changes.title=data.context.properties[i].value;
                        }   
                        else if (data.context.properties[i].name=='album') {
                            changes.album=data.context.properties[i].value;
                            //changes.art=prevState.artbase+"?"+data.context.properties[i].value
                        }   
                        else if (data.context.properties[i].name=='art') {
                            changes.art=data.context.properties[i].value;
                        }   
                        else if (data.context.properties[i].name=='linked') {
                            changes.linked=data.context.properties[i].value;
                        }   

                    }
                } 
                // might be both. We probably don't need to apply the ones from context in a change 
                // but might as well keep it all in sync.
                if (data.hasOwnProperty('payload')){
                    if (data.payload.hasOwnProperty('change')){
                        for (var i = 0; i < data.payload.change.properties.length; i++) {
                            if (data.payload.change.properties[i].name=='artist') {
                                changes.artist=data.context.properties[i].value;
                            } 
                            if (data.payload.change.properties[i].name=='title') {
                                changes.title=data.context.properties[i].value;
                            } 
                            if (data.payload.change.properties[i].name=='album') {
                                changes.album=data.context.properties[i].value;
                                changes.art=prevstate.artbase+"?"+data.context.properties[i].value
                            } 
                        }
                    }
                }


            }
        }
        return changes;
    }
    
    componentDidMount() {
        if (this.props.deviceState.hasOwnProperty('event')) {

        } else {
            this.props.updateDevice(this.props.device.friendlyName)
        }
    }
 
    render() {

        const { classes, theme } = this.props;

        return (
                <Card className={classes.card} >
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Typography variant="body2">{this.props.name}</Typography>
                            <Typography variant="body2">{this.state.linked}</Typography>
                            <Typography variant="subheading">{this.state.title}</Typography>
                            <Typography variant="body1" color="textSecondary">
                                {this.state.artist}
                            </Typography>
                        </CardContent>
                        <div className={classes.controls}>
                            <IconButton aria-label="Previous">
                                <SkipPreviousIcon />
                            </IconButton>
                            <IconButton aria-label="Play/pause">
                                <PlayArrowIcon className={classes.playIcon} />
                            </IconButton>
                            <IconButton aria-label="Next">
                                <SkipNextIcon />
                            </IconButton>
                        </div>
                    </div>
                    <CardMedia
                        className={classes.cover}
                        image={this.state.art}
                        title={this.state.title}
                    >
                        <IconButton aria-label="Play/pause">
                            <PlayArrowIcon className={classes.playIcon} />
                        </IconButton>
                    </CardMedia>
                </Card>
        );
    }
}

Sonos.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Sonos);
