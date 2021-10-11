/* eslint-disable max-len */

import React from 'react';
import { SvgIcon } from '@material-ui/core';
import { ReactComponent as Ubiquiti } from './Ubiquiti.svg';

function UbiquitiIcon(props) {

    return (
        <SvgIcon >
            <Ubiquiti />
        </SvgIcon>
    );
}

UbiquitiIcon.muiName = 'SvgIcon';

export default UbiquitiIcon;
