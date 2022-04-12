import {capitalize, Slide, styled, useTheme, useThemeProps} from "@mui/material";
import * as React from 'react';
import {useEffect, useRef} from 'react';
import clsx from 'clsx';
import {ClickAwayListener, unstable_composeClasses as composeClasses} from '@mui/material';
import useEventCallback from '../utils/useEventCallback';
import SnackbarContent from '../SnackbarContent/SnackbarContent';
import {getSnackbarUtilityClass} from './snackbarClasses';
import {ISnackbarProps} from "../index";
import {REASONS} from "../utils/constrants";

const useUtilityClasses = (ownerState: any) => {
    const {classes, anchorOrigin} = ownerState;

    const slots = {
        root: ['root',
            `anchorOrigin${capitalize(anchorOrigin.vertical)}${capitalize(
                anchorOrigin.horizontal)}`,],
    };

    return composeClasses(slots, getSnackbarUtilityClass, classes);
};

const SnackbarRoot = styled('div', {
    name: 'MuiSnackbar',
    slot: 'Root',
    overridesResolver: (props: any, styles: any) => {
        const {ownerState} = props;
        return [styles.root,
            styles[`anchorOrigin${capitalize(
                ownerState.anchorOrigin.vertical)}${capitalize(
                ownerState.anchorOrigin.horizontal,)}`],];
    },
})(({theme, ownerState}: any) => {
    const center = {
        ...(!ownerState.isRtl && {
            left: '50%', right: 'auto', transform: 'translateX(-50%)',
        }), ...(ownerState.isRtl && {
            right: '50%', left: 'auto', transform: 'translateX(50%)',
        }),
    };

    return {
        zIndex: theme.zIndex.snackbar,
        position: 'relative',
        display: 'flex',
        left: 8,
        right: 8,
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center', ...(ownerState.anchorOrigin.horizontal === 'left' &&
            {justifyContent: 'flex-start'}), ...(ownerState.anchorOrigin.horizontal ===
            'right' && {justifyContent: 'flex-end'}),
        [theme.breakpoints.up('sm')]: {
            //...(ownerState.anchorOrigin.vertical === 'top' ? {top: 24} : {bottom: 24}),
            ...(ownerState.anchorOrigin.horizontal === 'center' &&
                center), ...(ownerState.anchorOrigin.horizontal === 'left' && {
                ...(!ownerState.isRtl && {
                    left: 24, right: 'auto',
                }), ...(ownerState.isRtl && {
                    right: 24, left: 'auto',
                }),
            }), ...(ownerState.anchorOrigin.horizontal === 'right' && {
                ...(!ownerState.isRtl && {
                    right: 24, left: 'auto',
                }), ...(ownerState.isRtl && {
                    left: 24, right: 'auto',
                }),
            }),
        },
    };
});

const Snackbar = React.forwardRef(function Snackbar(inProps: ISnackbarProps, ref: any) {
    //@ts-ignore
    const props = useThemeProps({props: inProps, name: 'MuiSnackbar'});
    const theme: any = useTheme();
    const defaultTransitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    }
    const {
        action,
        closeable,
        hideIconVariant,
        anchorOrigin: {vertical, horizontal} = {
            vertical: 'bottom', horizontal: 'left'
        },
        content,
        autoHideDuration = null,
        className,
        disableWindowBlurListener = false,
        message,
        onBlur,
        onClose,
        onFocus,
        open,
        resumeHideDuration,
        TransitionComponent = Slide,
        transitionDuration = defaultTransitionDuration,

        onMouseEnter,
        onMouseLeave,

        // @ts-ignore
        TransitionProps: {onEnter, onExited, ...transitionProps},
        ClickAwayListenerProps,
        ContentProps,

        ...other
    } = props


    const isRtl = theme.direction === 'rtl'
    const ownerState = {...props, anchorOrigin: {vertical, horizontal}, isRtl}
    const classes = useUtilityClasses(ownerState)
    const timerAutoHide = useRef()
    const [exited, setExited] = React.useState(true)


    const handleClose = useEventCallback((...args: any) => {
        if (onClose) {
            // @ts-ignore
            onClose(...args);
        }
    })
    const setAutoHideTimer = useEventCallback((autoHideDurationParam: any) => {
        if (!onClose || autoHideDurationParam == null) {
            return;
        }

        clearTimeout(timerAutoHide.current);
        //@ts-ignore
        timerAutoHide.current = setTimeout(() => {
            handleClose(null, 'timeout');
        }, autoHideDurationParam);
    });

    useEffect(() => {
        if (open) {
            setAutoHideTimer(autoHideDuration);
        }

        return () => {
            clearTimeout(timerAutoHide.current);
        };
    }, [open, autoHideDuration, setAutoHideTimer]);

    // Pause the timer when the user is interacting with the Snackbar
    // or when the user hide the window.
    const handlePause = () => {
        clearTimeout(timerAutoHide.current);
    };


    // Restart the timer when the user is no longer interacting with the Snackbar
    // or when the window is shown back.
    const handleResume = React.useCallback(() => {
        if (autoHideDuration != null) {
            setAutoHideTimer(
                resumeHideDuration != null ? resumeHideDuration : autoHideDuration * 0.5);
        }
    }, [autoHideDuration, resumeHideDuration, setAutoHideTimer]);

    const handleFocus = (event: any) => {
        if (onFocus) {
            onFocus(event);
        }
        handlePause();
    };


    const handleMouseEnter = (event: any) => {
        if (onMouseEnter) {
            onMouseEnter(event);
        }
        handlePause();
    };

    const handleBlur = (event: any) => {
        if (onBlur) {
            onBlur(event);
        }
        handleResume();
    };
    const handleMouseLeave = (event: any) => {
        if (onMouseLeave) {
            onMouseLeave(event);
        }
        handleResume();
    };

    const handleClickAway = (event: any) => {
        if (onClose) {
            onClose(event, 'clickaway');
        }
    };

    const handleExited = (node: any) => {
        setExited(true);

        if (onExited) {
            onExited(node);
        }
    };

    const handleEnter = (node: any, isAppearing: any) => {
        setExited(false);

        if (onEnter) {
            onEnter(node, isAppearing);
        }
    };

    useEffect(() => {
        // TODO: window global should be refactored here
        if (!disableWindowBlurListener && open) {
            window.addEventListener('focus', handleResume);
            window.addEventListener('blur', handlePause);

            return () => {
                window.removeEventListener('focus', handleResume);
                window.removeEventListener('blur', handlePause);
            };
        }

        return undefined;
    }, [disableWindowBlurListener, handleResume, open]);


    useEffect(() => {
        if (!open) {
            return undefined;
        }

        /**
         * @param {KeyboardEvent} nativeEvent
         */
        function handleKeyDown(nativeEvent: any) {
            if (!nativeEvent.defaultPrevented) {
                // IE11, Edge (prior to using Bink?) use 'Esc'
                if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
                    // not calling `preventDefault` since we don't know if people may ignore this event e.g. a permanently open snackbar
                    if (onClose) {
                        onClose(nativeEvent, REASONS.ESC);
                    }
                }
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [exited, open, onClose]);


    // So we only render active snackbars.
    if (!open && exited) {
        return null;
    }


    return (<ClickAwayListener onClickAway={handleClickAway} {...ClickAwayListenerProps}>
        <SnackbarRoot
            className={clsx(classes.root, className)}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ownerState={ownerState}
            ref={ref}
            {...other}
        >
            <TransitionComponent
                appear
                in={open}
                timeout={transitionDuration}
                direction={vertical === 'top' ? 'down' : 'up'}
                onEnter={handleEnter}
                onExited={handleExited}
                {...transitionProps}
            >
                {/* @ts-ignore*/}
                {content || <SnackbarContent message={message}
                                             action={action}
                                             icon={hideIconVariant || ContentProps?.icon}
                                             {...ContentProps}
                                             onClose={closeable ?
                                                 (event) => handleClose(event,
                                                     REASONS.INSTRUCTED,) : undefined}
                />}
            </TransitionComponent>
        </SnackbarRoot>
    </ClickAwayListener>);
});

export default Snackbar