import * as React from 'react';
import {Alert, AlertTitle, styled, useThemeProps,} from "@mui/material";
import {unstable_composeClasses as composeClasses} from '@mui/material';

import {getSnackbarContentUtilityClass} from './snackbarContentClasses';
import {ISnackbarContentProps} from "../index";
import clsx from "clsx";

const useUtilityClasses = (ownerState: any) => {
    const {classes} = ownerState;

    const slots = {
        root: ['root'],
        action: ['action'],
        message: ['message'],
    };

    return composeClasses(slots, getSnackbarContentUtilityClass, classes);
};

const SnackbarContentRoot = styled(Alert, {
    name: 'MuiSnackbarContent',
    slot: 'Root',
    overridesResolver: (props: any, styles: any) => styles.root,
})(({theme, ownerState}: any) => {
    return {
        ...theme.typography.body2,
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
})({});


const SnackbarContent = React.forwardRef(
    function SnackbarContent(inProps: ISnackbarContentProps, ref: any) {
        const props = useThemeProps({props: inProps, name: 'MuiSnackbarContent'});
        const {action, className, message, title, role = 'alert', ...other} = props;
        const ownerState: any = props as any;
        const classes = useUtilityClasses(ownerState);
        return (
            <SnackbarContentRoot
                role={role}
                severity={'error'}
                className={clsx(classes.root, className)}
                ownerState={ownerState}
                action={action}
                ref={ref}
                {...other}
            >
                {title && <AlertTitle>{title}</AlertTitle>}
                <SnackbarContentMessage className={classes.message}
                                        ownerState={ownerState}>
                    {message}
                </SnackbarContentMessage>
            </SnackbarContentRoot>
        );
    });


export default SnackbarContent;
