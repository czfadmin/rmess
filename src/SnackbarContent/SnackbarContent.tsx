import {Paper, styled,} from "@mui/material";
import * as React from 'react';
import clsx from 'clsx';
import {unstable_composeClasses as composeClasses} from '@mui/base';
import {emphasize, useThemeProps} from '@mui/system';

import {getSnackbarContentUtilityClass} from './snackbarContentClasses';
import {ISnackbarContentProps} from ".";

const useUtilityClasses = (ownerState: any) => {
    const {classes} = ownerState;

    const slots = {
        root: ['root'],
        action: ['action'],
        message: ['message'],
    };

    return composeClasses(slots, getSnackbarContentUtilityClass, classes);
};

const SnackbarContentRoot = styled(Paper, {
    name: 'MuiSnackbarContent',
    slot: 'Root',
    overridesResolver: (props: any, styles: any) => styles.root,
})(({theme}: any) => {
    const emphasis = theme.palette.mode === 'light' ? 0.8 : 0.98;
    const backgroundColor = emphasize(theme.palette.background.default, emphasis);

    return {
        ...theme.typography.body2,
        color: theme.palette.getContrastText(backgroundColor),
        backgroundColor,
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: '6px 16px',
        borderRadius: theme.shape.borderRadius,
        flexGrow: 1,
        [theme.breakpoints.up('sm')]: {
            flexGrow: 'initial',
            minWidth: 288,
        },
    };
});

const SnackbarContentMessage = styled('div', {
    name: 'MuiSnackbarContent',
    slot: 'Message',
    overridesResolver: (props: any, styles: any) => styles.message,
})({
    padding: '8px 0',
});

const SnackbarContentAction = styled('div', {
    name: 'MuiSnackbarContent',
    slot: 'Action',
    overridesResolver: (props: any, styles: any) => styles.action,
})({
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
    paddingLeft: 16,
    marginRight: -8,
});


const SnackbarContent = React.forwardRef(
    function SnackbarContent(inProps: ISnackbarContentProps, ref:any) {
        const props = useThemeProps({props: inProps, name: 'MuiSnackbarContent'});
        const {action, className, message, role = 'alert', ...other} = props;
        const ownerState:any = props as any;
        const classes = useUtilityClasses(ownerState);

        return (
            <SnackbarContentRoot
                role={role}
                square
                elevation={6}
                className={clsx(classes.root, className)}
                ownerState={ownerState}
                ref={ref}
                {...other}
            >
                <SnackbarContentMessage className={classes.message}
                                        ownerState={ownerState}>
                    {message}
                </SnackbarContentMessage>
                {action ? (
                    <SnackbarContentAction className={classes.action}
                                           ownerState={ownerState}>
                        {action}
                    </SnackbarContentAction>
                ) : null}
            </SnackbarContentRoot>
        );
    });

export default SnackbarContent;
