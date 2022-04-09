import React, {useEffect, useRef, useState} from "react"
import Snackbar from "./Snackbar"
import {emphasize,} from "@mui/system";
import {RequiredBy, SharedProps, Snack, TransitionHandlerProps} from "index";
import {ISnackbarProviderProps as IProviderProps,} from '../.'
import createChainedFunction from "utils/createChainedFunction";
import {objectMerge} from "utils/constrants";

import defaultIconVariants from "utils/defaultIconVariant";
import {Collapse, styled} from "@mui/material";
import clsx from "clsx";
import SnackbarContent from "SnackbarContent";

type RemovedProps =
    | 'variant' // the one received from Provider is processed and passed to snack prop
    | 'anchorOrigin' // same as above
    | 'autoHideDuration' // same as above
    | 'preventDuplicate' // the one recevied from enqueueSnackbar is processed in provider, therefore shouldn't be passed to SnackbarItem */

export interface ISnackbarItemProps
    extends RequiredBy<Omit<SharedProps, RemovedProps>, 'onEntered' | 'onExited' | 'onClose'> {
    snack: Snack;
    dense: IProviderProps['dense'];
    iconVariant: IProviderProps['iconVariant'];
    hideIconVariant: IProviderProps['hideIconVariant'];
    //classes: Partial<ClassNameMap<SnackbarClassKey>>;
}

const componentName = 'SnackbarItem';

const classes = {
    contentRoot: `${componentName}-contentRoot`,
    lessPadding: `${componentName}-lessPadding`,
    variantSuccess: `${componentName}-variantSuccess`,
    variantError: `${componentName}-variantError`,
    variantInfo: `${componentName}-variantInfo`,
    variantWarning: `${componentName}-variantWarning`,
    message: `${componentName}-message`,
    action: `${componentName}-action`,
    wrappedRoot: `${componentName}-wrappedRoot`,
};

const StyledSnackbar = styled(Snackbar)(({theme}: any) => {
    const mode = theme.palette.mode || theme.palette.type;
    const backgroundColor = emphasize(theme.palette.background.default,
        mode === 'light' ? 0.8 : 0.98);

    return {
        [`&.${classes.wrappedRoot}`]: {
            position: 'relative',
            transform: 'translateX(0)',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        },
        [`.${classes.contentRoot}`]: {
            ...theme.typography.body2,
            backgroundColor,
            color: theme.palette.getContrastText(backgroundColor),
            alignItems: 'center',
            padding: '6px 16px',
            borderRadius: '4px',
            boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
        },
        [`.${classes.lessPadding}`]: {
            paddingLeft: 8 * 2.5,
        },
        [`.${classes.variantSuccess}`]: {
            backgroundColor: '#43a047', // green
            color: '#fff',
        },
        [`.${classes.variantError}`]: {
            backgroundColor: '#d32f2f', // dark red
            color: '#fff',
        },
        [`.${classes.variantInfo}`]: {
            backgroundColor: '#2196f3', // nice blue
            color: '#fff',
        },
        [`.${classes.variantWarning}`]: {
            backgroundColor: '#ff9800', // amber
            color: '#fff',
        },
        [`.${classes.message}`]: {
            display: 'flex',
            alignItems: 'center',
            padding: '8px 0',
        },
        [`.${classes.action}`]: {
            display: 'flex',
            alignItems: 'center',
            marginLeft: 'auto',
            paddingLeft: 16,
            marginRight: -8,
        },
    };
})


const DIRECTION = {
    right: 'left',
    left: 'right',
    bottom: 'up',
    top: 'down',
} as const;
export type DirectionType = typeof DIRECTION[keyof typeof DIRECTION]

export const getTransitionDirection = (anchorOrigin: Snack['anchorOrigin']): DirectionType => {
    if (anchorOrigin.horizontal !== 'center') {
        return DIRECTION[anchorOrigin.horizontal];
    }
    return DIRECTION[anchorOrigin.vertical];
};


const SnackbarItem: React.FC<ISnackbarItemProps> = ({...props}) => {
    const timeout = useRef<ReturnType<typeof setTimeout>>();
    const [collapsed, setCollapsed] = useState(true);

    useEffect(() => (): void => {
        if (timeout.current) {
            clearTimeout(timeout.current);
        }
    }, []);

    const handleClose = createChainedFunction([props.snack.onClose, props.onClose],
        props.snack.key);

    //const handleEntered: TransitionHandlerProps['onEntered'] = () => {
    //    if (props.snack.requestClose) {
    //        handleClose(null, REASONS.INSTRCUTED);
    //    }
    //};

    //const handleExitedScreen = (): void => {
    //    timeout.current = setTimeout(() => {
    //        setCollapsed(!collapsed);
    //    }, 125);
    //};

    const {
        style,
        dense,
        ariaAttributes: otherAriaAttributes,
        className: otherClassName,
        hideIconVariant,
        iconVariant,
        snack,
        action: otherAction,
        content: otherContent,
        TransitionComponent: otherTranComponent,
        TransitionProps: otherTranProps,
        transitionDuration: otherTranDuration,
        onEnter: ignoredOnEnter,
        onEntered: ignoredOnEntered,
        onEntering: ignoredOnEntering,
        onExit: ignoredOnExit,
        onExited: ignoredOnExited,
        onExiting: ignoredOnExiting,
        ...other
    } = props;

    const {
        persist,
        key,
        open,
        entered,
        requestClose,
        className: singleClassName,
        variant,
        content: singleContent,
        action: singleAction,
        ariaAttributes: singleAriaAttributes,
        anchorOrigin,
        message:    snackMessage,
        TransitionComponent: singleTranComponent,
        TransitionProps: singleTranProps,
        transitionDuration: singleTranDuration,
        onEnter,
        onEntered,
        onEntering,
        onExit,
        onExited,
        onExiting,
        ...singleSnackProps
    } = snack;

    const icon = {
        ...defaultIconVariants,
        ...iconVariant,
    }[variant];

    const ariaAttributes = {
        'aria-describedby': 'notistack-snackbar',
        ...objectMerge(singleAriaAttributes, otherAriaAttributes),
    };
    //
    //const TransitionComponent = singleTranComponent || otherTranComponent ||
    //    DEFAULTS.TransitionComponent;
    //const transitionDuration = objectMerge(singleTranDuration, otherTranDuration,
    //    DEFAULTS.transitionDuration);
    //const transitionProps = {
    //    direction: getTransitionDirection(anchorOrigin),
    //    ...objectMerge(singleTranProps, otherTranProps),
    //};

    let action = singleAction || otherAction;
    if (typeof action === 'function') {
        action = action(key);
    }

    let content = singleContent || otherContent;
    if (typeof content === 'function') {
        content = content(key, snack.message);
    }

    // eslint-disable-next-line operator-linebreak
    const callbacks: { [key in keyof TransitionHandlerProps]?: any } =
        ['onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'].reduce(
            (acc, cbName) => ({
                ...acc,
                [cbName]: createChainedFunction([
                    props.snack[cbName as keyof Snack],
                    props[cbName as keyof ISnackbarItemProps],
                ], props.snack.key),
            }), {});

    return (
        <Collapse
            unmountOnExit
            timeout={175}
            in={collapsed}
            onExited={callbacks.onExited}
        >
            <StyledSnackbar
                {...other}
                {...singleSnackProps}
                open={open}
                onClose={handleClose}
            >
                <SnackbarContent
                    {...ariaAttributes}
                    role="alert"
                    style={style}
                    className={clsx(
                        otherClassName,
                        singleClassName,
                    )}
                >
                    <div id={ariaAttributes['aria-describedby']}>
                        {!hideIconVariant ? icon : null}
                        {snackMessage}
                    </div>
                    {action && (
                        <div>{action}</div>
                    )}
                </SnackbarContent>
                {/*<TransitionComponent*/}
                {/*    appear*/}
                {/*    in={open}*/}
                {/*    timeout={transitionDuration}*/}
                {/*    {...transitionProps}*/}
                {/*    onExit={callbacks.onExit}*/}
                {/*    onExiting={callbacks.onExiting}*/}
                {/*    onExited={handleExitedScreen}*/}
                {/*    onEnter={callbacks.onEnter}*/}
                {/*    onEntering={callbacks.onEntering}*/}
                {/*    // order matters. first callbacks.onEntered to set entered: true,*/}
                {/*    // then handleEntered to check if there's a request for closing*/}
                {/*    onEntered={createChainedFunction(*/}
                {/*        [callbacks.onEntered, handleEntered])}*/}
                {/*>*/}
                {/*    /!* @ts-ignore *!/*/}
                {/*    {content || (*/}
                {/*        <SnackbarContent*/}
                {/*            {...ariaAttributes}*/}
                {/*            role="alert"*/}
                {/*            style={style}*/}
                {/*            className={clsx(*/}
                {/*                otherClassName,*/}
                {/*                singleClassName,*/}
                {/*            )}*/}
                {/*        >*/}
                {/*            <div id={ariaAttributes['aria-describedby']}>*/}
                {/*                {!hideIconVariant ? icon : null}*/}
                {/*                {snackMessage}*/}
                {/*            </div>*/}
                {/*            {action && (*/}
                {/*                <div>{action}</div>*/}
                {/*            )}*/}
                {/*        </SnackbarContent>*/}
                {/*    )}*/}
                {/*</TransitionComponent>*/}
            </StyledSnackbar>
        </Collapse>
    );
};

export default SnackbarItem;
