import React, {useEffect, useRef, useState} from "react";
import {Collapse, useThemeProps} from "@mui/material";
import {
    ISnackbarProps,
    RequiredBy,
    SharedProps,
    Snack,
    TransitionHandlerProps
} from "../index";
import createChainedFunction from "../utils/createChainedFunction";
import Snackbar from "./Snackbar";
import {DEFAULTS, objectMerge, REASONS} from "../utils/constrants";
import {ISnackbarContentProps} from "../index";

type RemovedProps =
    | 'variant' // the one received from Provider is processed and passed to snack prop
    | 'anchorOrigin' // same as above
    | 'autoHideDuration' // same as above
    | 'preventDuplicate' // the one recevied from enqueueSnackbar is processed in provider, therefore shouldn't be passed to SnackbarItem */


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


// @ts-ignore
export interface ISnackbarItemProps
    extends RequiredBy<Omit<SharedProps, RemovedProps>, 'onEntered' | 'onExited' | 'onClose'> {
    snack: Snack,
    onClose: TransitionHandlerProps['onClose'],
    onExited: TransitionHandlerProps['onExited'],
    onEntered: TransitionHandlerProps['onEntered']
}


const SnackbarItem: React.FC<ISnackbarItemProps> = React.forwardRef(
    function SnackbarItem(inProps: ISnackbarItemProps, ref: any) {
        const timeout = useRef<ReturnType<typeof setTimeout>>();
        const props = useThemeProps({props: inProps, name: 'SnackbarItem'})
        const {
            TransitionComponent: otherTranComponent,
            content: otherContent,
            action: otherAction,
            TransitionProps: otherTranProps,
            transitionDuration: otherTranDuration,
            ariaAttributes: otherAriaAttributes,
            snack,
        } = props;

        const {
            persist,
            entered,
            requestClose,
            closeable,
            hideIconVariant: singleHideIconVariant,
            className: singleClassName,
            content: singleContent,
            ariaAttributes: singleAriaAttributes,
            TransitionComponent: singleTranComponent,
            TransitionProps: singleTranProps,
            transitionDuration: singleTranDuration,
            action: singleAction,
            onEnter,
            onEntered,
            onEntering,
            onExit,
            onExited,
            onExiting,
            contentProps: ContentProps,
            ...singleSnackProps
        } = snack;


        // 配置内部Snackbar的props属性
        const TransitionComponent = singleTranComponent || otherTranComponent ||
            DEFAULTS.TransitionComponent;
        const transitionDuration = objectMerge(singleTranDuration, otherTranDuration,
            DEFAULTS.transitionDuration,);
        const transitionProps = {
            direction: getTransitionDirection(snack.anchorOrigin),
            ...objectMerge(singleTranProps, otherTranProps),
        };

        // 合并SingleAction
        let action = singleAction || otherAction;
        if (typeof action === 'function') {
            action = action(snack.key);
        }


        let content = singleContent || otherContent;
        if (typeof content === 'function') {
            content = content(snack.key, snack.message, snack.variant);
        }

        const ariaAttributes = {
            'aria-describedby': 'rmess-snackbar',
            ...objectMerge(singleAriaAttributes, otherAriaAttributes),
        };

        // Transition Callback
        const callbacks: { [key in keyof TransitionHandlerProps]?: any } =
            ['onEnter',
                'onEntering',
                'onEntered',
                'onExit',
                'onExiting',
                'onExited'].reduce((acc, cbName) => ({
                ...acc,
                [cbName]: createChainedFunction([
                    props.snack[cbName as keyof Snack],
                    props[cbName as keyof ISnackbarItemProps],
                ], props.snack.key),
            }), {});


        const handleClose = createChainedFunction(
            [snack.onClose, props.onClose], snack.key);

        const [collapsed, setCollapsed] = useState(true);

        useEffect(() => (): void => {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
        }, [])


        const handleEntered: TransitionHandlerProps['onEntered'] = () => {
            if (props.snack.requestClose) {
                handleClose(null, REASONS.INSTRCUTED);
            }
        };

        const handleExitedScreen = (): void => {
            timeout.current = setTimeout(() => {
                setCollapsed(!collapsed);
            }, 125);
        };

        // ContentProps
        const contentProps: Partial<ISnackbarContentProps> = {
            ...ContentProps,
            severity: !ContentProps?.severity ?
                snack.variant === 'default' ? 'info' : snack.variant :
                ContentProps.severity,
        }

        // Single Snackbar Props
        // @ts-ignore
        const snackbarProps: Partial<ISnackbarProps> = {
            ...singleSnackProps,
            action,
            content,
            TransitionComponent,
            transitionDuration,
            role: 'alert'
        }

        // Transition Props
        const TransitionProps = {
            ...transitionProps,
            onEnter: callbacks.onEnter,
            onEntered: createChainedFunction([callbacks.onEntered, handleEntered]),
            onEntering: callbacks.onEntering,
            onExit: callbacks.onExiting,
            onExited: handleExitedScreen,
            onExiting: callbacks.onExiting,
        }


        // ClickAwayListenerProps
        const ClickAwayListenerProps = {}

        return (
            <Collapse unmountOnExit
                      timeout={175}
                      in={collapsed}
                      onExited={callbacks.onExited}>

                <Snackbar {...snackbarProps}
                          {...ariaAttributes}
                          closeable={closeable}
                          hideIconVariant={singleHideIconVariant}
                          className={singleClassName}
                          onClose={handleClose}
                          ClickAwayListenerProps={ClickAwayListenerProps}
                          ContentProps={contentProps}
                          TransitionProps={TransitionProps}
                />
            </Collapse>
        )

    }
)

export default SnackbarItem