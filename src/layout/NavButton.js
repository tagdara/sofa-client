import React from 'react';
import { createStyles } from '@mantine/styles';
import { Switch, ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';
import { ChevronLeft, ChevronRight } from 'react-feather';

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

    }

}));

const NavButton = ( props ) => {

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
        <UnstyledButton className={classSelect()} onClick={props.onClick}>
            <Group noWrap>
                { (props.reverse && props.arrow) &&
                    <ThemeIcon className={arrowClass()}>
                        <ChevronRight />
                    </ThemeIcon>
                }
                { (props.reverse && props.leftArrow) &&
                    <ThemeIcon className={arrowClass()}>
                        <ChevronLeft />
                    </ThemeIcon>
                }

                { props.avatar &&
                    props.avatar
                }
                { props.icon &&
                <ThemeIcon color={props.color} variant="light">
                    {props.icon}
                </ThemeIcon>
                }
                <Group direction="column" spacing={0} grow style={{ flexGrow: 1 }}>
                    <Text size="md" lineClamp={1} style={{ flexGrow: 1 }}>{props.label}</Text>
                    { props.detail && <Text color="dimmed" size="xs" style={{ flexGrow: 1 }}>{props.detail}</Text> }
                </Group>
                { props.children }
                { (!props.reverse && props.arrow) &&
                    <ThemeIcon className={arrowClass()} >
                        <ChevronRight />
                    </ThemeIcon>
                }
                { (!props.reverse && props.leftArrow) &&
                    <ThemeIcon className={arrowClass()} >
                        <ChevronLeft />
                    </ThemeIcon>
                }
                { props.switch &&
                    <Switch checked={props.checked} onChange={props.switch} />
                }
            </Group>
        </UnstyledButton>
    );
}

export default NavButton