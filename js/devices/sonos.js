import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SonosDialog from './sonosDialog';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';

const styles = theme => ({
    card: {
        display: 'flex',
        minWidth: '320px',
        maxWidth: '480px',
        margin: 8,
        boxSizing: "border-box",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "16 24 16 24",
        width: "100%",
    },
    cardname: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    content: {
        minWidth: 0,
        padding: "0 !important",
        flexGrow:1,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "flex-end",
    },
    metadata: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        minWidth: 0,
    },
    icon: {
        paddingLeft: 8,
        minWidth: 62,
        height: 62,
        width: 62,
        alignSelf: "flex-end",
    },
    littleicon: {
        paddingTop: 2,
        paddingBottom: 2,
        paddingRight: 4,
        height: 16,
        width: 16,
        color: "#777",
    },
    biglittleicon: {
        paddingTop: 12,
        paddingBottom: 12,
        paddingRight: 4,
        height: 16,
        width: 16,
        color: "#777",
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
    
    handleClickOpen = () => {
        this.setState({ showdialog: true });
    };  
    
    closeDialog = () => {
        this.setState({ showdialog: false });
    };    

    render() {

        const { classes, theme } = this.props;
        
        return (
            this.props.name===this.props.deviceProperties.input ? 
                <Card className={classes.card}>
                    <CardContent className={classes.content} onClick={ () => this.props.chooseActivePlayer(this.props.name)}>
                        <div>
                            <Typography variant="body2">{this.props.name}</Typography>
                            {this.createLinks()}
                        </div>
                    </CardContent>
                    <CardContent className={classes.content} onClick={ () => this.props.chooseActivePlayer(this.props.name)}>
                        { this.props.deviceProperties.playbackState=='STOPPED' ?
                            <StopIcon className={classes.littleicon} />
                        :
                            <PlayArrowIcon className={classes.biglittleicon} />
                        }
                    {this.props.deviceProperties.playbackState=='STOPPED' ?
                        <div className={classes.metadata}>
                            <Typography variant="body1" color="textSecondary" noWrap>Not playing</Typography>
                        </div>
                    :
                        <div className={classes.metadata}>
                            <Typography variant="subheading" noWrap>{this.props.deviceProperties.title}</Typography>
                            <Typography variant="body1" color="textSecondary" noWrap>{this.props.deviceProperties.artist}</Typography>
                        </div>
                    }
                        <img src={this.props.deviceProperties.art} className={classes.icon} />
                    </CardContent>
                </Card>
            : null
        );
    }
}

Sonos.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Sonos);
