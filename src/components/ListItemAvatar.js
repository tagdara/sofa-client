import React from 'react';
import ToggleAvatar from 'components/ToggleAvatar'
import CircularProgress from '@material-ui/core/CircularProgress';

const ListItemAvatar = props => {
    
    if (props.loading) {
        return  <div style={{ marginLeft: 8, marginTop: 8, marginRight: 24 }} >
                    <CircularProgress size={24} />
                </div>
    }

    return (
        <ToggleAvatar small={props.small} wideAvatar={props.wide} avatarState={ props.state } noback={props.noBackground} onClick={props.onClick } >
            { props.avatar }
        </ToggleAvatar>
    );
}

ListItemAvatar.defaultProps = {
    state: "off",
}

export default ListItemAvatar;


