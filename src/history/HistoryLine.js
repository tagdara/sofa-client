import React from 'react';

import Moment from 'react-moment';
import 'moment-timezone';

import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import ButtonItem from "components/ButtonItem"



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
