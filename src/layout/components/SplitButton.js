import React from 'react';
import { createStyles } from '@mantine/styles';
import { Paper, ThemeIcon, Group, Stack, Text, useMantineTheme } from '@mantine/core';

import { IconChevronRight } from '@tabler/icons';
import clsx from 'clsx';
import useLayoutStore from 'layout/layoutStore'

const useStyles = createStyles((theme) => ({
    button: {
        display: 'block',
        width: '100%',
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? 
                    theme.colors.dark[0] : theme.black,
        backgroundColor: 'transparent',
    },
    transparentButton: {
        display: 'block',
        width: '100%',
        //padding: theme.spacing.sm,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },
    themeButton: {
        display: 'block',
        width: '100%',
        //padding: theme.spacing.sm,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? 
                    theme.fn.rgba(theme.colors[theme.primaryColor][9], 1) : 
                    theme.fn.rgba(theme.colors[theme.primaryColor][5], 1),

        backgroundColor: theme.colorScheme === 'dark' ? 
                            theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.1) : 
                            theme.fn.rgba(theme.colors[theme.primaryColor][5], 0.1),

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? 
                            theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.15) : 
                            theme.fn.rgba(theme.colors[theme.primaryColor][5], 0.15),

        },
    },

    arrow: {
        backgroundColor: 'transparent',
        color: theme.colorScheme === 'dark' ? 
                    theme.colors.dark[0] : 
                    theme.colors.gray[6] , 
    },
    transparentArrow: {
        backgroundColor: 'transparent',
        color: theme.colorScheme === 'dark' ? 
                    theme.colors[theme.primaryColor][9] : 
                    theme.colors[theme.primaryColor][5],

    },
    themeArrow: {
        backgroundColor: 'transparent',
        color: theme.colorScheme === 'dark' ? 
                    theme.colors[theme.primaryColor][9] : 
                    theme.colors[theme.primaryColor][5],
    },
    buttonGroup: {
        display: "table",
        width: "100%",
        tableLayout: "auto",
        borderRadius: theme.radius.sm,
        backgroundColor: theme.colorScheme === 'dark' ? 
                            theme.fn.rgba(theme.colors.dark[6], 0.5):
                            theme.fn.rgba(theme.colors[theme.primaryColor][5], 0.1),
        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? 
                            theme.fn.rgba(theme.colors.dark[6], 0.7) : 
                            theme.fn.rgba(theme.colors[theme.primaryColor][5], 0.15),
        },
        "& > *": {
            borderRadius: 0,
            display: "table-cell !important",
            verticalAlign: "middle",
            color: theme.colors[theme.primaryColor][7],
        },
        '&>:first-of-type': {
            borderTopLeftRadius: theme.radius.sm,
            borderBottomLeftRadius: theme.radius.sm,
            flexGrow: 1,
        },
        '&>:last-child': {
            borderTopRightRadius: theme.radius.sm,
            borderBottomRightRadius: theme.radius.sm,
            flexGrow: 1,
        }
    },
    cardButtonGroup: {
        backgroundColor: theme.colorScheme === 'dark' ? 
                            theme.fn.rgba(theme.colors.dark[4], 0.5) :
                            theme.fn.rgba(theme.colors[theme.primaryColor][5], 0.1),
        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? 
                            theme.fn.rgba(theme.colors.dark[4], 0.7) : 
                            theme.fn.rgba(theme.colors[theme.primaryColor][5], 0.15),
        },
    },
    buttonGroupOn: {
        backgroundColor: theme.colorScheme === 'dark' ? 
                            theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.35) : 
                            theme.fn.rgba(theme.colors[theme.primaryColor][4], 0.1),
        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? 
                            theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.4) : 
                            theme.fn.rgba(theme.colors[theme.primaryColor][5], 0.15),
        }
    }


}));


export const SplitButtonGroup = ( props ) => {

    const { classes } = useStyles();

    return (
        <Group  onClick={ props.onClick }
                noWrap spacing={0} 
                className={clsx(classes.buttonGroup, {
                    [classes.cardButtonGroup]: props.onCard,
                    [classes.buttonGroupOn]: props.on,
                })}
        >
            { props.children }
        </Group>
    );
}

export const SplitButton = ( props ) => {

    const { classes } = useStyles();
    const theme = useMantineTheme()
    const isMobile = useLayoutStore( state => state.isMobile)
    const classSelect = () => {
        if (props.transparent) { return classes.transparentButton }
        if (props.highlight) { return classes.themeButton }
        return classes.button
    }

    const arrowClass = () => {
        if (props.transparent) { return classes.transparentArrow }
        if (props.highlight) { return classes.themeArrow }
        return classes.arrow
    }

    return (
        <Paper p={isMobile ? "md": "xs"} className={classSelect()} style={{  display: "flex", width: props.label ? undefined : 1 }} onClick={props.onClick}>
            <Group noWrap style={{  display: "flex", alignItems: "center", overflow: "hidden"}}>
                { props.icon &&
                    <ThemeIcon className={arrowClass()} >
                        { props.icon }
                    </ThemeIcon>
                }
                { props.label &&
                    <Stack spacing={0} style={{ justifyContent: "center", display: "flex", maxWidth: "100%"}}>
                        <Text   size={isMobile ? "md": "sm"} 
                                style={{ color : props.on ?  theme.colors[theme.primaryColor][2] : "dimmed" }} 
                                weight={500} 
                                lineClamp={1}>
                            {props.label}
                        </Text>
                        { props.secondary && <Text weight={400} size="sm" lineClamp={2} color="dimmed" style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{props.secondary}</Text> }
                    </Stack>
                }
                { props.children }
                { props.arrow &&
                    <ThemeIcon className={arrowClass()} >
                        <IconChevronRight />
                    </ThemeIcon>
                }
            </Group>
        </Paper>
    );
}

