import * as React from "react";
import {StandardProps} from "@mui/material";
import {TransitionProps} from "@mui/material/transitions";
import {ClickAwayListenerProps} from "@mui/base/ClickAwayListener";

export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type ISnackbarMessage = string;
export type ISnackbarKey = | string | number;

export type VariantType = 'default' | 'error' | 'success' | 'warning' | 'info';
export type CloseReason = 'timeout' | 'clickaway' | 'maxsnack' | 'instructed';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TransitionCloseHandler = (event: React.SyntheticEvent<any> | null,
                                      reason: CloseReason, key?: ISnackbarKey) => void;
export type TransitionEnterHandler = (node: HTMLElement, isAppearing: boolean,
                                      key: ISnackbarKey) => void;
export type TransitionHandler = (node: HTMLElement, key: ISnackbarKey) => void;

export type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>;


export type SnackbarAction = React.ReactNode | ((key: ISnackbarKey) => React.ReactNode);

export type SnackbarContentCallback = React.ReactNode | ((key: ISnackbarKey,
                                                          message: ISnackbarMessage) => React.ReactNode);
export type SnackbarClassKey =
    | 'root'
    | 'anchorOriginTopCenter'
    | 'anchorOriginBottomCenter'
    | 'anchorOriginTopRight'
    | 'anchorOriginBottomRight'
    | 'anchorOriginTopLeft'
    | 'anchorOriginBottomLeft';

export type ContainerClassKey =
    | 'containerRoot'
    | 'containerAnchorOriginTopCenter'
    | 'containerAnchorOriginBottomCenter'
    | 'containerAnchorOriginTopRight'
    | 'containerAnchorOriginBottomRight'
    | 'containerAnchorOriginTopLeft'
    | 'containerAnchorOriginBottomLeft';

export type VariantClassKey =
    'variantSuccess'
    | 'variantError'
    | 'variantInfo'
    | 'variantWarning';

export type CombinedClassKey = VariantClassKey | ContainerClassKey | SnackbarClassKey;

export interface SnackbarOrigin {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
}


export interface Snack
    extends RequiredBy<ISnackbarOption, 'key' | 'variant' | 'anchorOrigin'> {
    message: ISnackbarMessage;
    open: boolean;
    entered: boolean;
    requestClose: boolean;
}
/**
 * @category Shared
 */
export interface TransitionHandlerProps {
    /**
     * Callback fired before snackbar requests to get closed.
     * The `reason` parameter can optionally be used to control the response to `onClose`.
     *
     * @param {object} event The event source of the callback
     * @param {string} reason Can be:`"timeout"` (`autoHideDuration` expired) or: `"clickaway"`
     *  or: `"maxsnack"` (snackbar was closed because `maxSnack` has reached) or: `"instructed"`
     * (snackbar was closed programmatically)
     * @param {string|number|undefined} key key of a Snackbar. key will be `undefined` if closeSnackbar
     * is called with no key (user requested all the snackbars to be closed)
     */
    onClose: TransitionCloseHandler;
    /**
     * Callback fired before the transition is entering.
     */
    onEnter: TransitionHandler;
    /**
     * Callback fired when the transition is entering.
     */
    onEntering: TransitionHandler;
    /**
     * Callback fired when the transition has entered.
     */
    onEntered: TransitionEnterHandler;
    /**
     * Callback fired before the transition is exiting.
     */
    onExit: TransitionHandler;
    /**
     * Callback fired when the transition is exiting.
     */
    onExiting: TransitionHandler;
    /**
     * Callback fired when the transition has exited.
     */
    onExited: TransitionHandler;
}

/**
 * @category Shared
 */
export interface SharedProps extends Omit<ISnackbarProps, 'classes'>,
    Partial<TransitionHandlerProps>
{
    /**
     * Used to easily display different variant of snackbars. When passed to `SnackbarProvider`
     * all snackbars inherit the `variant`, unless you override it in `enqueueSnackbar` options.
     * @default default
     */
    variant?: VariantType;
    /**
     * Ignores displaying multiple snackbars with the same `message`
     * @default false
     */
    preventDuplicate?: boolean;
    /**
     * Replace the snackbar. Callback used for displaying entirely customized snackbar.
     * @param {string|number} key key of a snackbar
     */
    content?: SnackbarContentCallback;
    /**
     * Callback used for getting action(s). actions are mostly buttons displayed in Snackbar.
     * @param {string|number} key key of a snackbar
     */
    action?: SnackbarAction;
}

interface ISnackbarProps
    extends StandardProps<React.HTMLAttributes<HTMLDivElement>, SnackbarClassKey> {
    /**
     * The anchor of the `Snackbar`.
     * @default { horizontal: left, vertical: bottom }
     */
    anchorOrigin?: SnackbarOrigin;
    /**
     * The number of milliseconds to wait before automatically calling the
     * `onClose` function. By default snackbars get closed after 5000 milliseconds.
     * Set autoHideDuration to 'null' if you don't want snackbars to automatically close.
     * Alternatively pass `persist: true` in the options parameter of enqueueSnackbar.
     * @default 5000
     */
    autoHideDuration?: number | null;
    /**
     * @ignore
     * Properties applied to ClickAwayListener component
     */
    ClickAwayListenerProps?: Partial<ClickAwayListenerProps>;
    /**
     * Aria attributes applied to snackbar's content component
     */
    ariaAttributes?: React.AriaAttributes;
    /**
     * If `true`, the `autoHideDuration` timer will expire even if the window is not focused.
     * @default false
     */
    disableWindowBlurListener?: boolean;
    /**
     * The number of milliseconds to wait before dismissing after user interaction.
     * If `autoHideDuration` property isn't specified, it does nothing.
     * If `autoHideDuration` property is specified but `resumeHideDuration` isn't,
     * we use the default value.
     * @default autoHideDuration / 2 ms.
     */
    resumeHideDuration?: number;
    /**
     * The component used for the transition. (e.g. Slide, Grow, Zoom, etc.)
     * @default Slide
     */
    TransitionComponent?: React.ComponentType<TransitionProps>;
    /**
     * The duration for the transition, in milliseconds.
     * You may specify the duration with an object in the following shape:
     * ```js
     * transitionDuration={{ enter: 300, exit: 500 }}
     * ```
     * @default { enter: 225, exit: 195 }
     */
    transitionDuration?: { appear?: number; enter?: number; exit?: number };
    /**
     * Properties applied to Transition component (e.g. Slide, Grow, Zoom, etc.)
     */
    TransitionProps?: TransitionProps;
}




/**
 * @category Enqueue
 */
export interface ISnackbarOption extends SharedProps {
    /**
     * Unique identifier to reference a snackbar.
     * @default random unique string
     */
    key?: ISnackbarKey;
    /**
     * Snackbar stays on the screen, unless it is dismissed (programmatically or through user interaction).
     * @default false
     */
    persist?: boolean;
}


export interface IconVariant {
    /**
     * Icon displayed when variant of a snackbar is set to `default`.
     */
    default: React.ReactNode;
    /**
     * Icon displayed when variant of a snackbar is set to `error`.
     */
    error: React.ReactNode;
    /**
     * Icon displayed when variant of a snackbar is set to `success`.
     */
    success: React.ReactNode;
    /**
     * Icon displayed when variant of a snackbar is set to `warning`.
     */
    warning: React.ReactNode;
    /**
     * Icon displayed when variant of a snackbar is set to `info`.
     */
    info: React.ReactNode;
}

/**
 * All material-ui props, including class keys for notistack and material-ui with additional notistack props
 * @category Provider
 */
export interface ISnackbarProviderProps extends SharedProps {
    /**
     * Most of the time this is your App. every component from this point onward
     * will be able to show snackbars.
     */
    children: React.ReactNode | React.ReactNode[];
    /**
     * Denser margins for snackbars. Recommended to be used on mobile devices.
     * @default false
     */
    dense?: boolean;
    /**
     * Maximum snackbars that can be stacked on top of one another.
     * @default 3
     */
    maxSnack?: number;
    /**
     * Hides iconVariant if set to `true`.
     * @default false
     */
    hideIconVariant?: boolean;
    /**
     * Valid and exist HTML Node element, used to target `ReactDOM.createPortal`
     */
    domRoot?: HTMLElement;
    /**
     * Override or extend the styles applied to the container component or Snackbars.
     */
    classes?: Partial<ClassNameMap<CombinedClassKey>>;
    /**
     * Little icon that is displayed at left corner of a snackbar.
     */
    iconVariant?: Partial<IconVariant>;
    /**
     * @ignore
     * SnackbarProvider's ref
     */
    ref?: React.Ref<SnackbarProvider>;
}

export interface ISnackbarApiOption {
    delay?: number;
}

export class SnackbarProvider extends React.Component<ISnackbarProviderProps> {
    enqueueSnackbar: IProviderContext['enqueueSnackbar'];
    closeSnackbar: IProviderContext['closeSnackbar'];
}


export interface IProviderContext {
    enqueueSnackbar: (message: ISnackbarMessage, option: ISnackbarOption) => ISnackbarKey;
    closeSnackbar: (key?: ISnackbarKey) => void;
}


export declare const SnackbarContent: React.ComponentType<ISnackbarContentProps & React.RefAttributes<HTMLDivElement>>;

export function useSnackbar(): IProviderContext;



