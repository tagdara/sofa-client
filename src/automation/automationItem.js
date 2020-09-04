import React from 'react';
import IconButton from '@material-ui/core/IconButton';

import FavoriteIcon from '@material-ui/icons/Star';
import ListIcon from '@material-ui/icons/List';
import EditIcon from '@material-ui/icons/Edit';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import CloseIcon from '@material-ui/icons/Close';
import GridItem from '../GridItem';
import SofaListItem from '../SofaListItem';

export default function AutomationItem(props) {
    
    
    function summary() {
        if (props.allowEdit) {
            return props.automation.triggers.length+" triggers / "+props.automation.conditions.length+" conditions / "+props.automation.actions.length+' actions'
        } else {
            return " "
        }
    }
    
    return (
        <GridItem wide={props.wide} nopad={true} hover={true}>
        <SofaListItem   loading={props.launched} avatarState={props.favorite ? "on": "off" }
                        onClick={() => props.makeFavorite('logic:activity:'+props.name, !props.favorite)}
                        avatar={ props.favorite && props.icon!=="base" ? <FavoriteIcon/> : <ListIcon /> }
                        avatarBackground={false}
                        primary={props.name} secondary={summary()}
                        secondaryActions={ <>
                            { props.deleting &&
                                <IconButton size={"small"} onClick={ () => props.delete(props.name) } >
                                    <CloseIcon />
                                </IconButton>
                            }
                            { props.allowEdit ?
                                <IconButton size={"small"} onClick={ () => props.select(props.name) } >
                                    <EditIcon />
                                </IconButton>
                            :
                                <IconButton size={"small"} onClick={ () => { props.run(props.name) }} >
                                    <PlayArrowIcon />
                                </IconButton>                
                            }
                            </>
                        }
        />
        </GridItem>
    )
}

AutomationItem.defaultProps = {
    launcher: false,
    allowEdit: true,
    deleting: false
}

