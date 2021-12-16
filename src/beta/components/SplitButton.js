import React from 'react';
import { createStyles } from '@mantine/styles';
import { Paper, ThemeIcon, Group, Text } from '@mantine/core';
import { ChevronRight } from 'react-feather';

const useStyles = createStyles((theme) => ({
    button: {
        display: 'block',
        width: '100%',
        padding: theme.spacing.sm,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? 
                    theme.colors.dark[0] : theme.black,
        backgroundColor: theme.colorScheme === 'dark' ? 
                            theme.fn.rgba(theme.colors.dark[6], 0.4) : 
                            theme.fn.rgba(theme.colors.gray[3], 0.4),

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? 
                            theme.fn.rgba(theme.colors.dark[6], 0.8) : 
                            theme.fn.rgba(theme.colors.gray[3], 0.8),
        },
    },
    transparentButton: {
        display: 'block',
        width: '100%',
        padding: theme.spacing.sm,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },
    themeButton: {
        display: 'block',
        width: '100%',
        padding: theme.spacing.sm,
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
                            theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.1) : 
                            theme.fn.rgba(theme.colors[theme.primaryColor][5], 0.1),
        "& > *": {
            borderRadius: 0,
            display: "table-cell !important",
            verticalAlign: "middle",
        },
        '&>:first-child': {
            borderTopLeftRadius: theme.radius.sm,
            borderBottomLeftRadius: theme.radius.sm,
            flexGrow: 0,
        },
        '&>:last-child': {
            borderTopRightRadius: theme.radius.sm,
            borderBottomRightRadius: theme.radius.sm,
            flexGrow: 0,
        }
    }

}));


export const SplitButtonGroup = ( props ) => {

    const { classes } = useStyles();
   
    return (
        <Group direction="row" noWrap spacing={0} className={classes.buttonGroup}>
            { props.children }
        </Group>
    );
}

export const SplitButton = ( props ) => {

    const { classes } = useStyles();

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
        <Paper className={classSelect()} style={{ width: props.label ? undefined : 1 }} onClick={props.onClick}>
            <Group noWrap style={{  display: "flex", alignItems: "center"}}>
                { props.icon &&
                    <ThemeIcon className={arrowClass()} >
                        { props.icon }
                    </ThemeIcon>
                }
                { props.label &&
                    <Group direction="column" spacing={0} style={{ justifyContent: "center", display: "flex", flexGrow:1, flexShrink: 0, width: "100%"}}>
                        <Text size="md" lineClamp={1}>{props.label}</Text>
                        { props.secondary && <Text size="sm" lineClamp={1} color="dimmed" style={{ flexGrow: 1 }}>{props.secondary}</Text> }
                    </Group>
                }
                { props.children }
                { props.arrow &&
                    <ThemeIcon className={arrowClass()} >
                        <ChevronRight />
                    </ThemeIcon>
                }
            </Group>
        </Paper>
    );
}

