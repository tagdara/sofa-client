import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Star';
import ListIcon from '@material-ui/icons/List';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import CloseIcon from '@material-ui/icons/Close';
import SofaListItem from 'components/SofaListItem';
import CardBase from "components/CardBase"

export default function AutomationItem(props) {
    
    
    function summary() {
        if (props.allowEdit) {
            return props.automation.triggers.length+" triggers / "+props.automation.conditions.length+" conditions / "+props.automation.actions.length+' actions'
        } else {
            return " "
        }
    }
    
    function loading() {
        try {
            if (props.deviceState && props.deviceState.Running.toggleState.value === 'ON') {
                return true
            }
        }
        catch {}
        return false
    }
    
    // noGrid={props.noGrid} nolist={true} noMargin={props.noMargin} noback={true} noPaper={false} button={false}
    return (
        <CardBase noPad={ props.small } highlight={props.highlight}>
        <SofaListItem 
            avatar={ props.favorite && props.icon!=="base" ? <FavoriteIcon/> : <ListIcon /> }
            avatarState={props.favorite ? "on": "off" }
            avatarClick={() => props.makeFavorite(props.endpointId, !props.favorite)}
            labelClick={() => props.select(props.endpointId)}
            avatarBackground={false}
            primary={ props.name }
            secondary={ summary() }
            small={ props.small }
            noPad={ props.small }
            loading={ loading() }
            secondaryActions={
                <>
                    { props.deleting ?
                        <IconButton size={"small"} onClick={ () => props.delete(props.endpointId) } >
                            <CloseIcon />
                        </IconButton>
                    :
                        <IconButton disabled={ loading() } size={"small"} onClick={ () => props.run(props.endpointId) } >
                            <PlayArrowIcon />
                        </IconButton>                
                    }
                </>
            }
        />
        </CardBase>
    );

}

AutomationItem.defaultProps = {
    launcher: false,
    allowEdit: true,
    deleting: false,
    small: true,
}

