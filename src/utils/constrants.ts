import {
    CloseReason,
    ContainerClassKey,
    Snack,
    SnackbarClassKey,
    SnackbarOrigin,
    VariantType
} from "../.";
import {Slide} from "@mui/material";


export const allClasses: {
    mui: Record<SnackbarClassKey, {}>;
    container: Record<ContainerClassKey, {}>;
} = {
    mui: {
        root: {},
        anchorOriginTopCenter: {},
        anchorOriginBottomCenter: {},
        anchorOriginTopRight: {},
        anchorOriginBottomRight: {},
        anchorOriginTopLeft: {},
        anchorOriginBottomLeft: {},
    },
    container: {
        containerRoot: {},
        containerAnchorOriginTopCenter: {},
        containerAnchorOriginBottomCenter: {},
        containerAnchorOriginTopRight: {},
        containerAnchorOriginBottomRight: {},
        containerAnchorOriginTopLeft: {},
        containerAnchorOriginBottomLeft: {},
    },
};

export const DEFAULTS = {
    maxSnack: 3,
    dense: false,
    hideIconVariant: false,
    variant: 'default' as VariantType,
    autoHideDuration: 5000,
    anchorOrigin: {
        vertical: 'bottom', horizontal: 'left'
    } as SnackbarOrigin,
    TransitionComponent: Slide,
    transitionDuration: {
        enter: 225,
        exit: 195,
    },
};

export const REASONS: { [key: string]: CloseReason } = {
    TIMEOUT: 'timeout',
    CLICKAWAY: 'clickaway',
    MAXSNACK: 'maxsnack',
    INSTRUCTED: 'instructed',
};

const numberOrNull = (numberish?: number | null) => (typeof numberish === 'number' ||
    numberish === null);

// @ts-ignore
export const merge = (options, props, defaults) => (name: keyof Snack): any => {
    if (name === 'autoHideDuration') {
        if (numberOrNull(options.autoHideDuration)) return options.autoHideDuration;
        if (numberOrNull(props.autoHideDuration)) return props.autoHideDuration;
        return DEFAULTS.autoHideDuration;
    }

    // 处理Bool类型的情况
    if (typeof options[name] === 'boolean' || props[name] === 'boolean') {
        return options[name] !== undefined ? options[name] : props[name];
    }
    return options[name] || props[name] || defaults[name];
};

export function objectMerge(options = {}, props = {}, defaults = {}) {
    return {
        ...defaults, ...props, ...options,
    };
}

export const capitalise = (text: string): string => text.charAt(0).toUpperCase() +
    text.slice(1);


export const originKeyExtractor = (anchor: Snack['anchorOrigin']): string => (
    `${capitalise(anchor.vertical)}${capitalise(anchor.horizontal)}`
);

export const isDefined = (value: string | null | undefined | number): boolean => (!!value ||
    value === 0);


export const SNACKBAR_INDENTS = {
    view: {default: 20, dense: 4},
    snackbar: {default: 6, dense: 2},
};