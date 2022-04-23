import * as React from "react";
import {
    AlertProps,
    InternalStandardProps as StandardProps,
    SnackbarContentProps,
    Theme,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { ClickAwayListenerProps } from "@mui/base/ClickAwayListener";
import { SnackbarContentClasses } from "./SnackbarContent";
import { SnackbarClasses } from "./Snackbar";
import { SxProps } from "@mui/system";
import { ISnackbarItemProps } from "./Snackbar/SnackbarItem";

export type RequiredBy<T, K extends keyof T> = Omit<T, K> &
    Required<Pick<T, K>>;

export type ISnackbarMessage = string;
export type ISnackbarKey = string | number;

export type VariantType = "default" | "error" | "success" | "warning" | "info";
export type SnackbarCloseReason =
    | "timeout"
    | "clickaway"
    | "maxsnack"
    | "instructed"
    | "escapeKeyDown";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TransitionCloseHandler = (
    event: React.SyntheticEvent<any> | null,
    reason: SnackbarCloseReason,
    key?: ISnackbarKey
) => void;
export type TransitionEnterHandler = (
    node: HTMLElement,
    isAppearing: boolean,
    key: ISnackbarKey
) => void;
export type TransitionHandler = (node: HTMLElement, key: ISnackbarKey) => void;

export type ClassNameMap<ClassKey extends string = string> = Record<
    ClassKey,
    string
>;

export type SnackbarAction =
    | React.ReactNode
    | ((key: ISnackbarKey) => React.ReactNode);

export type ISnackbarContentCallback =
    | React.ReactNode
    | ((
          key: ISnackbarKey,
          message: ISnackbarMessage,
          variant: VariantType
      ) => React.ReactNode);
export type SnackbarClassKey =
    | "root"
    | "anchorOriginTopCenter"
    | "anchorOriginBottomCenter"
    | "anchorOriginTopRight"
    | "anchorOriginBottomRight"
    | "anchorOriginTopLeft"
    | "anchorOriginBottomLeft";

export type ContainerClassKey =
    | "containerRoot"
    | "containerAnchorOriginTopCenter"
    | "containerAnchorOriginBottomCenter"
    | "containerAnchorOriginTopRight"
    | "containerAnchorOriginBottomRight"
    | "containerAnchorOriginTopLeft"
    | "containerAnchorOriginBottomLeft";

export type VariantClassKey =
    | "variantSuccess"
    | "variantError"
    | "variantInfo"
    | "variantWarning";

export type CombinedClassKey =
    | VariantClassKey
    | ContainerClassKey
    | SnackbarClassKey;

export interface SnackbarOrigin {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
}

export interface Snack
    extends RequiredBy<
        ISnackbarOption,
        "key" | "variant" | "anchorOrigin" | "contentProps"
    > {
    message: ISnackbarMessage;
    open: boolean;
    entered: boolean;
    requestClose: boolean;
    // 用来覆盖全局的hideIconVariant
    hideIconVariant?: boolean;
    [key: string]: any;
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

export interface ISnackbarProps
    extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
    /**
     * The action to display. It renders after the message, at the end of the snackbar.
     */
    action?: SnackbarContentProps["action"];
    /**
     * The anchor of the `Snackbar`.
     * On smaller screens, the component grows to occupy all the available width,
     * the horizontal alignment is ignored.
     * @default { vertical: 'bottom', horizontal: 'left' }
     */
    anchorOrigin?: SnackbarOrigin;

    /**
     * Aria attributes applied to snackbar's content component
     */
    ariaAttributes?: React.AriaAttributes;

    /**
     * The number of milliseconds to wait before automatically calling the
     * `onClose` function. `onClose` should then set the state of the `open`
     * prop to hide the Snackbar. This behavior is disabled by default with
     * the `null` value.
     * @default null
     */
    autoHideDuration?: number | null;
    /**
     * Replace the `SnackbarContent` component.
     */
    children?: React.ReactElement<any, any>;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<SnackbarClasses>;
    /**
     * Props applied to the `ClickAwayListener` element.
     */
    ClickAwayListenerProps?: Partial<ClickAwayListenerProps>;
    /**
     * Props applied to the [`SnackbarContent`](/material-ui/api/snackbar-content/) element.
     */
    ContentProps?: Partial<Omit<ISnackbarContentProps, "action">>;
    /**
     * If `true`, the `autoHideDuration` timer will expire even if the window is not focused.
     * @default false
     */
    disableWindowBlurListener?: boolean;
    /**
     * When displaying multiple consecutive Snackbars from a parent rendering a single
     * <Snackbar/>, add the key prop to ensure independent treatment of each message.
     * e.g. <Snackbar key={message} />, otherwise, the message may update-in-place and
     * features such as autoHideDuration may be canceled.
     */
    key?: any;
    /**
     * The message to display.
     */
    message?: SnackbarContentProps["message"];
    /**
     * Callback fired when the component requests to be closed.
     * Typically `onClose` is used to set state in the parent component,
     * which is used to control the `Snackbar` `open` prop.
     * The `reason` parameter can optionally be used to control the response to `onClose`,
     * for example ignoring `clickaway`.
     *
     * @param {React.SyntheticEvent<any> | Event} event The event source of the callback.
     * @param {string} reason Can be: `"timeout"` (`autoHideDuration` expired), `"clickaway"`, or `"escapeKeyDown"`.
     */
    onClose?: (
        event: React.SyntheticEvent<any> | Event | null,
        reason: SnackbarCloseReason,
        key?: ISnackbarKey
    ) => void;
    /**
     * If `true`, the component is shown.
     */
    open?: boolean;
    /**
     * The number of milliseconds to wait before dismissing after user interaction.
     * If `autoHideDuration` prop isn't specified, it does nothing.
     * If `autoHideDuration` prop is specified but `resumeHideDuration` isn't,
     * we default to `autoHideDuration / 2` ms.
     */
    resumeHideDuration?: number;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
    /**
     * The component used for the transition.
     * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
     * @default Grow
     */
    TransitionComponent?: React.JSXElementConstructor<
        TransitionProps & { children: React.ReactElement<any, any> }
    >;
    /**
     * The duration for the transition, in milliseconds.
     * You may specify a single timeout for all transitions, or individually with an object.
     * @default {
     *   enter: theme.transitions.duration.enteringScreen,
     *   exit: theme.transitions.duration.leavingScreen,
     * }
     */
    transitionDuration?: TransitionProps["timeout"];
    /**
     * Props applied to the transition element.
     * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
     * @default {}
     */
    TransitionProps?: TransitionProps;

    content?: ISnackbarContentCallback;

    /**
     * 设置是否显示图标
     */
    hideIconVariant?: boolean;

    /**
     *     显示关闭按钮
     */
    closeable?: boolean;
}

export interface ISnackbarContentProps
    extends StandardProps<AlertProps, "children"> {
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
    role?: AlertProps["role"];
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;

    ownerState?: any;
}

/**
 * @category Shared
 */
export interface SharedProps
    extends Omit<ISnackbarProps, "classes">,
        Partial<TransitionHandlerProps> {
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
    content?: ISnackbarContentCallback;
    /**
     * Callback used for getting action(s). actions are mostly buttons displayed in Snackbar.
     * @param {string|number} key key of a snackbar
     */
    action?: SnackbarAction;

    /**
     * 配置SnackbarContent的Props
     */
    contentProps?: Partial<ISnackbarContentProps>;

    /**
     *     显示关闭按钮
     */
    closeable?: boolean;
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

    // 是否显示snackbar图标，用于覆盖全局的配置
    hideIconVariant?: boolean;
}

/**
 * 全局的SnackbarIcon
 */
export interface IconMapping {
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
    children?: React.ReactNode | React.ReactNode[];
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
    iconMapping?: Partial<IconMapping>;
    /**
     * @ignore
     * SnackbarProvider's ref
     */
    ref?: React.Ref<SnackbarProvider>;

    /**
     * 重新ShardedProps中的contentProps，避免在Provider中使用iconMapping和title
     */
    contentProps?: Partial<
        Exclude<ISnackbarContentProps, "iconMapping" | "title">
    >;

    /**
     *
     * Snackbar 主题样式
     *
     */
    theme?: Partial<Theme> | ((outerTheme: Theme) => Theme);

    [key: string]: any;
}

/**
 * Rmessage 配置
 */
export interface IRmessageConfig
    extends Pick<
        ISnackbarProviderProps,
        | "dense"
        | "maxSnack"
        | "hideIconVariant"
        | "domRoot"
        | "iconMapping"
        | "contentProps"
        | "theme"
    > {}

export interface IRmessageOption extends Partial<ISnackbarOption> {}

export interface IRmessageAPI {
    config(config: IRmessageConfig): void;
    show(message: ISnackbarMessage, option?: ISnackbarOption): ISnackbarKey;

    error(message: ISnackbarMessage, option?: ISnackbarOption): ISnackbarKey;

    info(message: ISnackbarMessage, option?: ISnackbarOption): ISnackbarKey;

    success(message: ISnackbarMessage, option?: ISnackbarOption): ISnackbarKey;

    warning(message: ISnackbarMessage, option?: ISnackbarOption): ISnackbarKey;
    [key: string]: any;
}

export class SnackbarProvider extends React.Component<ISnackbarProviderProps> {
    enqueueSnackbar: IProviderContext["enqueueSnackbar"];
    closeSnackbar: IProviderContext["closeSnackbar"];
    static newInstance: (
        container: any,
        callback: (ins: SnackbarProvider) => void,
        options?: ISnackbarOption
    ) => void;

    show: (
        message: ISnackbarMessage,
        option: ISnackbarOption & {
            theme?: Partial<Theme> | ((outerTheme: Theme) => Theme);
        }
    ) => ISnackbarKey;
}

export interface IProviderContext {
    enqueueSnackbar: (
        message: ISnackbarMessage,
        option: ISnackbarOption
    ) => ISnackbarKey;
    closeSnackbar: (key?: ISnackbarKey) => void;
}

export declare const SnackbarItem: React.ComponentType<ISnackbarItemProps>;
export declare const Snackbar: React.ComponentType<ISnackbarProps>;
export declare const SnackbarContent: React.ComponentType<
    ISnackbarContentProps & React.RefAttributes<HTMLDivElement>
>;

export declare function useSnackbar(): IProviderContext;

export declare const rmessageAPI: IRmessageAPI;
