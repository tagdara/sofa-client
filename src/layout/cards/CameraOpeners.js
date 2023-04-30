import React from 'react';
import { endpointIdByFriendlyName, endpointIdsByDisplayCategory, sortByName } from 'endpoint-model/discovery'

import SecurityCamera from 'devices/Camera/SecurityCamera';
import StatusLock from 'devices/Lock/StatusLock';
import StackCard from 'layout/components/StackCard'
import usePageFrame from 'helpers/usePageFrame'
import { Carousel } from '@mantine/carousel';
import { createStyles, getStylesRef, rem } from '@mantine/core';

// const useStyles = createStyles((_theme, _params, getRef) => ({
//     controls: {
//         ref: getRef('controls'),
//         transition: 'opacity 150ms ease',
//         opacity: 0,
//     },
//     indicators: {
//         ref: getRef('indicators'),
//         transition: 'opacity 150ms ease',
//         opacity: 0,
//     },
//     root: {
//         '&:hover': {
//             [`& .${getRef('controls')}`]: {
//                 opacity: 1,
//             },
//             [`& .${getRef('indicators')}`]: {
//                 opacity: 1,
//             },
//         },
//     },
// }));

const useStyles = createStyles(() => ({
    controls: {
      ref: getStylesRef('controls'),
      transition: 'opacity 150ms ease',
      opacity: 0,
    },
    indicators: {
        ref: getStylesRef('indicators'),
        transition: 'opacity 150ms ease',
        opacity: 0,
    },
    root: {
      '&:hover': {
        [`& .${getStylesRef('controls')}`]: {
          opacity: 1,
        },
        [`& .${getStylesRef('indicators')}`]: {
            opacity: 1,
        },
    },
    },
  }));

export default function CameraSelect(props) {

    const { classes } = useStyles();
    const cameras = sortByName(endpointIdsByDisplayCategory('CAMERA'))
    const { maxStacks } = usePageFrame()

    const getOpener = (opener) => {
        try {
            const endpointId = endpointIdByFriendlyName(opener.deviceName)  
            if (!endpointId) { return null}
            return (
                <StackCard key={endpointId}>
                    <StatusLock endpointId={endpointId} displayName={ opener.displayName } buttonDuration={opener.buttonDuration}  />
                </StackCard>
            )
        }
        catch {
            return null
        }
    }
    
    const nullOnClick = () => {}

    if (!cameras || cameras.length < 1) { return null }

    if (maxStacks === 1) {
        return (
            <>
                { cameras.map(camera => 
                    <SecurityCamera key={camera} endpointId={camera} onClick={nullOnClick} />
                )}
            </>
        )
    }

    return (
        <>
            <Carousel 
                withIndicators 
                loop  
                classNames={classes}
                styles={{
                    indicator: {
                      width: rem(8),
                      height: rem(8),
                      transition: 'width 250ms ease',
                      '&[data-active]': {
                        width: rem(20),
                      },
                    },
                  }}    
            >
                { cameras.map(camera => 
                    <Carousel.Slide key={camera}>
                        <SecurityCamera endpointId={camera} noLabel/>
                    </Carousel.Slide>
                )}
            </Carousel>

            { props.openers &&
                <>
                    { props.openers.map( opener => getOpener(opener)) }
                </>
            }
        </>
    );
}