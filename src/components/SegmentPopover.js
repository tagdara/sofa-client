import React, { useState } from 'react';
import CardPopover from 'components/CardPopover'
import Segment from 'components/Segment'

const SegmentPopover = props => {

    const [ open, setOpen ] = useState(false)

    const togglePopover = () => { setOpen(!open) }

    return (
        <CardPopover
                opened={ open }
                setOpen={ setOpen }
                target={ <Segment {...props} onClick={togglePopover} />}
        >
            { props.popOver }
        </CardPopover>
    );
}

export default SegmentPopover

