/* eslint-disable max-len */

import React from 'react';
import { SvgIcon } from '@material-ui/core';
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
