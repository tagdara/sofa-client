/* eslint-disable max-len */

import React from 'react';
import { SvgIcon } from '@mui/material';
import { ReactComponent as Windows } from './Windows.svg';

function WindowsIcon(props) {
    
    return (
        <SvgIcon >
            <Windows />
        </SvgIcon>
    );
}

WindowsIcon.muiName = 'SvgIcon';

export default WindowsIcon;
