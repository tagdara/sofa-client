import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import SofaCard from '../sofaCard';

const styles = theme => ({

    listItem: {
        width: '100%',
        minHeight: 48,
        padding: 0,
    }
});

class NoPlayer extends React.Component {
    
    render() {

        const { classes, theme, name } = this.props;
        
        return (
                <SofaCard>
                    <ListItem className={classes.listItem} onClick={ () => this.props.choose()}>
                        <Avatar ><QueueMusicIcon /></Avatar>
                        <ListItemText primary={"No music playing"} />
                    </ListItem>
                </SofaCard>
        );
    }
}

NoPlayer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NoPlayer);
