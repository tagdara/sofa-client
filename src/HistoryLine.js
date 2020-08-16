import React from 'react';

import Moment from 'react-moment';
import 'moment-timezone';

import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import ButtonItem from "./ButtonItem"



export default function HistoryLine(props) {    
    
    return (
        <ButtonItem noGrid={props.noGrid} nolist={true} noMargin={props.noMargin} noback={true}
            avatarIcon={ props.val==='NOT_DETECTED' ?
                <DoneIcon />
            :
                <ClearIcon />
            }                
            avatarState={ props.val==='NOT_DETECTED' ? "closed" : "open" }
            label={<Moment format={props.justTime ? "h:mm:ssa" : "ddd MMM D h:mm:ssa"}>{props.time}</Moment>}
        />
    );
}
