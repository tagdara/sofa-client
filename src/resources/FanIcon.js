/* eslint-disable max-len */

import React from 'react';
import { SvgIcon } from '@mui/material';
import { ReactComponent as Fan } from './Fan.svg';

function FanIcon(props) {
    
    return (
        <SvgIcon >
            <Fan />
        </SvgIcon>
    );
}

FanIcon.muiName = 'SvgIcon';

export default FanIcon;