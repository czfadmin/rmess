import React, {useEffect, useRef, useState} from "react";
import {Collapse, useThemeProps} from "@mui/material";
import {RequiredBy, SharedProps, Snack, TransitionHandlerProps} from "../index";
import createChainedFunction from "../utils/createChainedFunction";
import Snackbar from "./Snackbar";
import {REASONS} from "../utils/constrants";
import {ISnackbarProps} from "./index";


type RemovedProps =
    | 'variant' // the one received from Provider is processed and passed to snack prop
    | 'anchorOrigin' // same as above
    | 'autoHideDuration' // same as above
    | 'preventDuplicate' // the one recevied from enqueueSnackbar is processed in provider, therefore shouldn't be passed to SnackbarItem */


export interface ISnackbarItemProps
    extends RequiredBy<Omit<SharedProps, RemovedProps>, 'onEntered' | 'onExited' | 'onClose'> {
    snack: Snack,
    onClose: TransitionHandlerProps['onClose'],
    onExited: TransitionHandlerProps['onExited'],
    onEntered: TransitionHandlerProps['onEntered']
}


const SnackbarItem: React.FC<ISnackbarItemProps> = React.forwardRef(
    function SnackbarItem(inProps: ISnackbarItemProps, ref) {
        const timeout = useRef<ReturnType<typeof setTimeout>>();
        const props = useThemeProps({props: inProps, name: 'SnackbarItem'})
        const {
            snack
        } = props;

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


        const handleClose = createChainedFunction([props.snack.onClose, props.onClose],
            props.snack.key);

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
        const contentProps = {}

        // Snackbar Props
        // @ts-ignore
        const snackbarProps: Partial<ISnackbarProps> = {
            ...snack,
            role: 'alert'
        }

        const TransitionProps = {
            onEnter: callbacks.onEnter,
            onEntered: createChainedFunction([callbacks.onEntered, handleEntered]),
            onEntering: callbacks.onEntering,
            onExit: callbacks.onExiting,
            onExited: handleExitedScreen,
            onExiting: callbacks.onExiting,
        }


        // ClickAwayListenerProps
        const ClickAwayListenerProps = {}


        console.log(snack)

        return <Collapse unmountOnExit
                         timeout={175}
                         in={collapsed}
                         onExited={callbacks.onExited}>
            <div>
                <Snackbar {...snackbarProps}
                          onClose={handleClose}
                          ClickAwayListenerProps={ClickAwayListenerProps}
                          ContentProps={contentProps}
                          TransitionProps={TransitionProps}
                />
            </div>


        </Collapse>

    }
)

export default SnackbarItem