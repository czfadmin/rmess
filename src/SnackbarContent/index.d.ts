import * as React from 'react';
import {SxProps, Theme} from '@mui/system';
import {SnackbarContentClasses} from './snackbarContentClasses';
import {AlertProps, InternalStandardProps as StandardProps} from '@mui/material';


export interface ISnackbarContentProps extends StandardProps<AlertProps, 'children'> {
    /**
     * The action to display. It renders after the message, at the end of the snackbar.
     */
    action?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<SnackbarContentClasses>;
    /**
     * The message to display.
     */
    message?: React.ReactNode;
    /**
     * The ARIA role attribute of the element.
     * @default 'alert'
     */
    role?: AlertProps['role'];
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;

    ownerState?: any
}

/**
 *
 * Demos:
 *
 * - [Snackbars](https://mui.com/material-ui/react-snackbar/)
 *
 * API:
 *
 * - [SnackbarContent API](https://mui.com/material-ui/api/snackbar-content/)
 * - inherits [Paper API](https://mui.com/material-ui/api/paper/)
 */
export default function SnackbarContent(props: ISnackbarContentProps): JSX.Element;

export {default as snackbarContentClasses} from './snackbarContentClasses';
export * from './snackbarContentClasses';