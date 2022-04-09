import * as React from 'react';
import React__default, { useRef, useState, useEffect, Component, useContext } from 'react';
import * as ReactDOM from 'react-dom';
import clsx from 'clsx';
import { styled, SvgIcon, Collapse } from '@mui/material';
import { ClickAwayListener } from '@mui/base';
import { styled as styled$1, emphasize } from '@mui/system';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var SnackbarContext = React.createContext({
    enqueueSnackbar: function () { return -1; },
    closeSnackbar: function () { }
});

var DEFAULTS = {
    maxSnack: 3,
    dense: false,
    hideIconVariant: false,
    variant: 'default',
    autoHideDuration: 5000,
    anchorOrigin: {
        vertical: 'bottom', horizontal: 'left'
    },
    //TransitionComponent: Slide,
    transitionDuration: {
        enter: 225,
        exit: 195,
    },
};
var REASONS = {
    TIMEOUT: 'timeout',
    CLICKAWAY: 'clickaway',
    MAXSNACK: 'maxsnack',
    INSTRUCTED: 'instructed',
};
var numberOrNull = function (numberish) { return (typeof numberish === 'number' ||
    numberish === null); };
// @ts-ignore
var merge = function (options, props, defaults) { return function (name) {
    if (name === 'autoHideDuration') {
        if (numberOrNull(options.autoHideDuration))
            return options.autoHideDuration;
        if (numberOrNull(props.autoHideDuration))
            return props.autoHideDuration;
        return DEFAULTS.autoHideDuration;
    }
    return options[name] || props[name] || defaults[name];
}; };
function objectMerge(options, props, defaults) {
    if (options === void 0) { options = {}; }
    if (props === void 0) { props = {}; }
    if (defaults === void 0) { defaults = {}; }
    return __assign(__assign(__assign({}, defaults), props), options);
}
var capitalise = function (text) { return text.charAt(0).toUpperCase() +
    text.slice(1); };
var originKeyExtractor = function (anchor) { return ("".concat(capitalise(anchor.vertical)).concat(capitalise(anchor.horizontal))); };
var isDefined = function (value) { return (!!value ||
    value === 0); };
var SNACKBAR_INDENTS = {
    view: { default: 20, dense: 4 },
    snackbar: { default: 6, dense: 2 },
};

var collapse = {
    // Material-UI 4.12.x and above uses MuiCollapse-root; earlier versions use
    // Mui-Collapse-container.  https://github.com/mui-org/material-ui/pull/24084
    container: '& > .MuiCollapse-container, & > .MuiCollapse-root',
    wrapper: '& > .MuiCollapse-container > .MuiCollapse-wrapper, & > .MuiCollapse-root > .MuiCollapse-wrapper',
};
var xsWidthMargin = 16;
var componentName$2 = 'SnackbarContainer';
var classes$2 = {
    root: "".concat(componentName$2, "-root"),
    rootDense: "".concat(componentName$2, "-rootDense"),
    top: "".concat(componentName$2, "-top"),
    bottom: "".concat(componentName$2, "-bottom"),
    left: "".concat(componentName$2, "-left"),
    right: "".concat(componentName$2, "-right"),
    center: "".concat(componentName$2, "-center"),
};
var Root = styled('div')(function (_a) {
    var _b, _c, _d, _e, _f, _g;
    var theme = _a.theme;
    return (_b = {},
        _b["&.".concat(classes$2.root)] = (_c = {
                boxSizing: 'border-box',
                display: 'flex',
                maxHeight: '100%',
                position: 'fixed',
                zIndex: theme.zIndex.snackbar,
                height: 'auto',
                width: 'auto',
                transition: 'top 300ms ease 0ms, right 300ms ease 0ms, bottom 300ms ease 0ms, left 300ms ease 0ms, margin 300ms ease 0ms, max-width 300ms ease 0ms',
                // container itself is invisible and should not block clicks, clicks should be passed to its children
                pointerEvents: 'none'
            },
            _c[collapse.container] = {
                pointerEvents: 'all',
            },
            _c[collapse.wrapper] = {
                padding: "".concat(SNACKBAR_INDENTS.snackbar.default, "px 0px"),
                transition: 'padding 300ms ease 0ms',
            },
            _c.maxWidth = "calc(100% - ".concat(SNACKBAR_INDENTS.view.default * 2, "px)"),
            _c[theme.breakpoints.down('sm')] = {
                width: '100%',
                maxWidth: "calc(100% - ".concat(xsWidthMargin * 2, "px)"),
            },
            _c),
        _b["&.".concat(classes$2.rootDense)] = (_d = {},
            _d[collapse.wrapper] = {
                padding: "".concat(SNACKBAR_INDENTS.snackbar.dense, "px 0px"),
            },
            _d),
        _b["&.".concat(classes$2.top)] = {
            top: SNACKBAR_INDENTS.view.default - SNACKBAR_INDENTS.snackbar.default,
            flexDirection: 'column',
        },
        _b["&.".concat(classes$2.bottom)] = {
            bottom: SNACKBAR_INDENTS.view.default - SNACKBAR_INDENTS.snackbar.default,
            flexDirection: 'column-reverse',
        },
        _b["&.".concat(classes$2.left)] = (_e = {
                left: SNACKBAR_INDENTS.view.default
            },
            _e[theme.breakpoints.up('sm')] = {
                alignItems: 'flex-start',
            },
            _e[theme.breakpoints.down('sm')] = {
                left: "".concat(xsWidthMargin, "px"),
            },
            _e),
        _b["&.".concat(classes$2.right)] = (_f = {
                right: SNACKBAR_INDENTS.view.default
            },
            _f[theme.breakpoints.up('sm')] = {
                alignItems: 'flex-end',
            },
            _f[theme.breakpoints.down('sm')] = {
                right: "".concat(xsWidthMargin, "px"),
            },
            _f),
        _b["&.".concat(classes$2.center)] = (_g = {
                left: '50%',
                transform: 'translateX(-50%)'
            },
            _g[theme.breakpoints.up('sm')] = {
                alignItems: 'center',
            },
            _g),
        _b);
});
// Snackbar容器
var SnackbarContainer = function (props) {
    var _a;
    var className = props.className, anchorOrigin = props.anchorOrigin, dense = props.dense, other = __rest(props, ["className", "anchorOrigin", "dense"]);
    var combinedClassname = clsx(classes$2[anchorOrigin.vertical], classes$2[anchorOrigin.horizontal], (_a = {}, _a[classes$2.rootDense] = dense, _a), classes$2.root, // root should come after others to override maxWidth
    className);
    return (React.createElement(Root, __assign({ className: combinedClassname }, other)));
};
var SnackbarContainer$1 = React.memo(SnackbarContainer);

/**
 * @link https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/utils/useEventCallback.js
 */

const useEnhancedEffect =
    typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

function useEventCallback(fn) {
    const ref = React.useRef(fn);
    useEnhancedEffect(() => {
        ref.current = fn;
    });
    return React.useCallback((...args) => (0, ref.current)(...args), []);
}

var Snackbar = React.forwardRef(function (props, ref) {
    var children = props.children, autoHideDuration = props.autoHideDuration, ClickAwayListenerProps = props.ClickAwayListenerProps, _a = props.disableWindowBlurListener, disableWindowBlurListener = _a === void 0 ? false : _a, onClose = props.onClose, onMouseEnter = props.onMouseEnter, onMouseLeave = props.onMouseLeave, open = props.open, resumeHideDuration = props.resumeHideDuration, other = __rest(props, ["children", "autoHideDuration", "ClickAwayListenerProps", "disableWindowBlurListener", "onClose", "onMouseEnter", "onMouseLeave", "open", "resumeHideDuration"]);
    var timerAutoHide = React.useRef();
    var handleClose = useEventCallback(function (args) {
        if (onClose) {
            onClose.apply(void 0, args);
        }
    });
    var setAutoHideTimer = useEventCallback(function (autoHideDurationParam) {
        if (!onClose || autoHideDurationParam == null) {
            return;
        }
        clearTimeout(timerAutoHide.current);
        timerAutoHide.current = setTimeout(function () {
            handleClose(null, REASONS.TIMEOUT);
        }, autoHideDurationParam);
    });
    React.useEffect(function () {
        if (open) {
            setAutoHideTimer(autoHideDuration);
        }
        return function () {
            clearTimeout(timerAutoHide.current);
        };
    }, [open, autoHideDuration, setAutoHideTimer]);
    /**
     * Pause the timer when the user is interacting with the Snackbar
     * or when the user hide the window.
     */
    var handlePause = function () {
        clearTimeout(timerAutoHide.current);
    };
    /**
     * Restart the timer when the user is no longer interacting with the Snackbar
     * or when the window is shown back.
     */
    var handleResume = React.useCallback(function () {
        if (autoHideDuration != null) {
            setAutoHideTimer(resumeHideDuration != null ? resumeHideDuration :
                autoHideDuration * 0.5);
        }
    }, [autoHideDuration, resumeHideDuration, setAutoHideTimer]);
    var handleMouseEnter = function (event) {
        if (onMouseEnter) {
            onMouseEnter(event);
        }
        handlePause();
    };
    var handleMouseLeave = function (event) {
        if (onMouseLeave) {
            onMouseLeave(event);
        }
        handleResume();
    };
    var handleClickAway = function (event) {
        if (onClose) {
            onClose(event, REASONS.CLICKAWAY);
        }
    };
    React.useEffect(function () {
        if (!disableWindowBlurListener && open) {
            window.addEventListener('focus', handleResume);
            window.addEventListener('blur', handlePause);
            return function () {
                window.removeEventListener('focus', handleResume);
                window.removeEventListener('blur', handlePause);
            };
        }
        return undefined;
    }, [disableWindowBlurListener, handleResume, open]);
    return (React.createElement(ClickAwayListener, __assign({ onClickAway: handleClickAway }, ClickAwayListenerProps),
        React.createElement("div", __assign({ onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, ref: ref }, other), children)));
});

/**
 * @link https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/utils/createChainedFunction.js
 */
function createChainedFunction(funcs, extraArg) {
    return funcs.reduce((acc, func) => {
        if (func == null) return acc;

        if (process.env.NODE_ENV !== 'production') {
            if (typeof func !== 'function') {
                // eslint-disable-next-line no-console
                console.error('Invalid Argument Type. must only provide functions, undefined, or null.');
            }
        }

        return function chainedFunction(...args) {
            const argums = [...args];
            if (extraArg && argums.indexOf(extraArg) === -1) {
                argums.push(extraArg);
            }
            acc.apply(this, argums);
            func.apply(this, argums);
        };
    }, () => { });
}

var iconStyles = {
    fontSize: 20,
    marginInlineEnd: 8,
};
var CheckIcon = function (props) { return (React__default.createElement(SvgIcon, __assign({}, props),
    React__default.createElement("path", { d: "M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41\n        10.59L10 14.17L17.59 6.58L19 8L10 17Z" }))); };
var WarningIcon = function (props) { return (React__default.createElement(SvgIcon, __assign({}, props),
    React__default.createElement("path", { d: "M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z" }))); };
var ErrorIcon = function (props) { return (React__default.createElement(SvgIcon, __assign({}, props),
    React__default.createElement("path", { d: "M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,\n        6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,\n        13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" }))); };
var InfoIcon = function (props) { return (React__default.createElement(SvgIcon, __assign({}, props),
    React__default.createElement("path", { d: "M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,\n        0 22,12A10,10 0 0,0 12,2Z" }))); };
var defaultIconVariants = {
    default: undefined,
    success: React__default.createElement(CheckIcon, { style: iconStyles }),
    warning: React__default.createElement(WarningIcon, { style: iconStyles }),
    error: React__default.createElement(ErrorIcon, { style: iconStyles }),
    info: React__default.createElement(InfoIcon, { style: iconStyles }),
};

var componentName$1 = "SnackbarContent";
var classes$1 = {
    root: "".concat(componentName$1, "-root"),
};
var ContentRoot = styled$1("div")(function (_a) {
    var _b, _c;
    var theme = _a.theme;
    return (_b = {},
        _b["&.".concat(classes$1.root)] = (_c = {
                display: "flex",
                flexWrap: "wrap",
                flexGrow: 1
            },
            _c[theme.breakpoints.up("sm")] = {
                flexGrow: "initial",
                minWidth: 288,
            },
            _c),
        _b);
});
var SnackbarContent = function (props) {
    var className = props.className;
    return React__default.createElement(ContentRoot, { className: clsx(classes$1.root, className) });
};

var componentName = 'SnackbarItem';
var classes = {
    contentRoot: "".concat(componentName, "-contentRoot"),
    lessPadding: "".concat(componentName, "-lessPadding"),
    variantSuccess: "".concat(componentName, "-variantSuccess"),
    variantError: "".concat(componentName, "-variantError"),
    variantInfo: "".concat(componentName, "-variantInfo"),
    variantWarning: "".concat(componentName, "-variantWarning"),
    message: "".concat(componentName, "-message"),
    action: "".concat(componentName, "-action"),
    wrappedRoot: "".concat(componentName, "-wrappedRoot"),
};
var StyledSnackbar = styled(Snackbar)(function (_a) {
    var _b;
    var theme = _a.theme;
    var mode = theme.palette.mode || theme.palette.type;
    var backgroundColor = emphasize(theme.palette.background.default, mode === 'light' ? 0.8 : 0.98);
    return _b = {},
        _b["&.".concat(classes.wrappedRoot)] = {
            position: 'relative',
            transform: 'translateX(0)',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        },
        _b[".".concat(classes.contentRoot)] = __assign(__assign({}, theme.typography.body2), { backgroundColor: backgroundColor, color: theme.palette.getContrastText(backgroundColor), alignItems: 'center', padding: '6px 16px', borderRadius: '4px', boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)' }),
        _b[".".concat(classes.lessPadding)] = {
            paddingLeft: 8 * 2.5,
        },
        _b[".".concat(classes.variantSuccess)] = {
            backgroundColor: '#43a047',
            color: '#fff',
        },
        _b[".".concat(classes.variantError)] = {
            backgroundColor: '#d32f2f',
            color: '#fff',
        },
        _b[".".concat(classes.variantInfo)] = {
            backgroundColor: '#2196f3',
            color: '#fff',
        },
        _b[".".concat(classes.variantWarning)] = {
            backgroundColor: '#ff9800',
            color: '#fff',
        },
        _b[".".concat(classes.message)] = {
            display: 'flex',
            alignItems: 'center',
            padding: '8px 0',
        },
        _b[".".concat(classes.action)] = {
            display: 'flex',
            alignItems: 'center',
            marginLeft: 'auto',
            paddingLeft: 16,
            marginRight: -8,
        },
        _b;
});
var SnackbarItem = function (_a) {
    var props = __rest(_a, []);
    var timeout = useRef();
    var _b = useState(true), collapsed = _b[0]; _b[1];
    useEffect(function () { return function () {
        if (timeout.current) {
            clearTimeout(timeout.current);
        }
    }; }, []);
    var handleClose = createChainedFunction([props.snack.onClose, props.onClose], props.snack.key);
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
    var style = props.style; props.dense; var otherAriaAttributes = props.ariaAttributes, otherClassName = props.className, hideIconVariant = props.hideIconVariant, iconVariant = props.iconVariant, snack = props.snack, otherAction = props.action, otherContent = props.content; props.TransitionComponent; props.TransitionProps; props.transitionDuration; props.onEnter; props.onEntered; props.onEntering; props.onExit; props.onExited; props.onExiting; var other = __rest(props, ["style", "dense", "ariaAttributes", "className", "hideIconVariant", "iconVariant", "snack", "action", "content", "TransitionComponent", "TransitionProps", "transitionDuration", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting"]);
    snack.persist; var key = snack.key, open = snack.open; snack.entered; snack.requestClose; var singleClassName = snack.className, variant = snack.variant, singleContent = snack.content, singleAction = snack.action, singleAriaAttributes = snack.ariaAttributes; snack.anchorOrigin; var snackMessage = snack.message; snack.TransitionComponent; snack.TransitionProps; snack.transitionDuration; snack.onEnter; snack.onEntered; snack.onEntering; snack.onExit; snack.onExited; snack.onExiting; var singleSnackProps = __rest(snack, ["persist", "key", "open", "entered", "requestClose", "className", "variant", "content", "action", "ariaAttributes", "anchorOrigin", "message", "TransitionComponent", "TransitionProps", "transitionDuration", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting"]);
    var icon = __assign(__assign({}, defaultIconVariants), iconVariant)[variant];
    var ariaAttributes = __assign({ 'aria-describedby': 'notistack-snackbar' }, objectMerge(singleAriaAttributes, otherAriaAttributes));
    //
    //const TransitionComponent = singleTranComponent || otherTranComponent ||
    //    DEFAULTS.TransitionComponent;
    //const transitionDuration = objectMerge(singleTranDuration, otherTranDuration,
    //    DEFAULTS.transitionDuration);
    //const transitionProps = {
    //    direction: getTransitionDirection(anchorOrigin),
    //    ...objectMerge(singleTranProps, otherTranProps),
    //};
    var action = singleAction || otherAction;
    if (typeof action === 'function') {
        action = action(key);
    }
    var content = singleContent || otherContent;
    if (typeof content === 'function') {
        content = content(key, snack.message);
    }
    // eslint-disable-next-line operator-linebreak
    var callbacks = ['onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'].reduce(function (acc, cbName) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[cbName] = createChainedFunction([
            props.snack[cbName],
            props[cbName],
        ], props.snack.key), _a)));
    }, {});
    return (React__default.createElement(Collapse, { unmountOnExit: true, timeout: 175, in: collapsed, onExited: callbacks.onExited },
        React__default.createElement(StyledSnackbar, __assign({}, other, singleSnackProps, { open: open, onClose: handleClose }),
            React__default.createElement(SnackbarContent, __assign({}, ariaAttributes, { role: "alert", style: style, className: clsx(otherClassName, singleClassName) }),
                React__default.createElement("div", { id: ariaAttributes['aria-describedby'] },
                    !hideIconVariant ? icon : null,
                    snackMessage),
                action && (React__default.createElement("div", null, action))))));
};

//  Snackbar Provider 用于管理Snackbar
var SnackbarProvider = /** @class */ (function (_super) {
    __extends(SnackbarProvider, _super);
    function SnackbarProvider(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Set the entered state of the snackbar with the given key.
         */
        _this.handleEnteredSnack = function (node, isAppearing, key) {
            if (!isDefined(key)) {
                throw new Error('handleEnteredSnack Cannot be called with undefined key');
            }
            _this.setState(function (_a) {
                var snacks = _a.snacks;
                return ({
                    snacks: snacks.map(function (item) { return (item.key === key ? __assign(__assign({}, item), { entered: true }) : __assign({}, item)); }),
                });
            });
        };
        /**
         * Hide a snackbar after its timeout.
         */
        _this.handleCloseSnack = function (event, reason, key) {
            if (_this.props.onClose) {
                _this.props.onClose(event, reason, key);
            }
            if (reason === REASONS.CLICKAWAY) {
                return;
            }
            var shouldCloseAll = key === undefined;
            _this.setState(function (_a) {
                var snacks = _a.snacks, queue = _a.queue;
                return ({
                    snacks: snacks.map(function (it) {
                        if (!shouldCloseAll && it.key !== key) {
                            return it;
                        }
                        return it.entered ? __assign(__assign({}, it), { open: false }) : __assign(__assign({}, it), { requestClose: true });
                    }),
                    queue: queue.filter(function (item) { return item.key !== key; })
                });
            });
        };
        /**
         * Close snackbar with the given key
         */
        _this.closeSnackbar = function (key) {
            var toBeClosed = _this.state.snacks.find(function (item) { return item.key === key; });
            if (isDefined(key) && toBeClosed && toBeClosed.onClose) {
                toBeClosed.onClose(null, REASONS.INSTRUCTED, key);
            }
            _this.handleCloseSnack(null, REASONS.INSTRUCTED, key);
        };
        /**
         * When we set open attribute of a snackbar to false (i.e. after we hide a snackbar),
         * it leaves the screen and immediately after leaving animation is done, this method
         * gets called. We remove the hidden snackbar from state and then display notifications
         * waiting in the queue (if any). If after this process the queue is not empty, the
         * oldest message is dismissed.
         */
        // @ts-ignore
        _this.handleExitedSnack = function (event, key1, key2) {
            var key = key1 || key2;
            if (!isDefined(key)) {
                throw new Error('handleExitedSnack Cannot be called with undefined key');
            }
            _this.setState(function (state) {
                var newState = _this.processQueue(__assign(__assign({}, state), { snacks: state.snacks.filter(function (item) { return item.key !== key; }) }));
                if (newState.queue.length === 0) {
                    return newState;
                }
                return _this.handleDismissOldest(newState);
            });
        };
        /**
         * Reducer: Display items (notifications) in the queue if there's space for them.
         */
        _this.processQueue = function (state) {
            var queue = state.queue, snacks = state.snacks;
            if (queue.length > 0) {
                return __assign(__assign({}, state), { snacks: __spreadArray(__spreadArray([], snacks, true), [queue[0]], false), queue: queue.slice(1, queue.length) });
            }
            return state;
        };
        /**
         * Reducer: Hide oldest snackbar on the screen because there exists a new one which we have to display.
         * (ignoring the one with 'persist' flag. i.e. explicitly told by user not to get dismissed).
         *
         * Note 1: If there is already a message leaving the screen, no new messages are dismissed.
         * Note 2: If the oldest message has not yet entered the screen, only a request to close the
         *         snackbar is made. Once it entered the screen, it will be immediately dismissed.
         */
        _this.handleDismissOldest = function (state) {
            if (state.snacks.some(function (item) { return !item.open || item.requestClose; })) {
                return state;
            }
            var persistentCount = state.snacks.reduce(function (acc, current) { return (acc + (current.open && current.persist ? 1 : 0)); }, 0);
            if (persistentCount === _this.maxSnack) ;
            var snacks = state.snacks.map(function (item) {
                return __assign({}, item);
            });
            return __assign(__assign({}, state), { snacks: snacks });
        };
        _this.state = {
            snacks: [],
            queue: [],
            contextValue: {
                enqueueSnackbar: _this.enqueueSnackbar.bind(_this),
                closeSnackbar: _this.closeSnackbar.bind(_this),
            },
        };
        _this.handleCloseSnack.bind(_this);
        return _this;
    }
    Object.defineProperty(SnackbarProvider.prototype, "maxSnack", {
        get: function () {
            return this.props.maxSnack || DEFAULTS.maxSnack;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Adds a new snackbar to the queue to be presented.
     * Returns generated or user defined key referencing the new snackbar or null
     * 向容器中添加一个新的snackbar
     */
    SnackbarProvider.prototype.enqueueSnackbar = function (message, option) {
        var _this = this;
        var key = option.key, preventDuplicate = option.preventDuplicate, opt = __rest(option, ["key", "preventDuplicate"]);
        var hasSpecifiedKey = isDefined(key);
        var id = hasSpecifiedKey ? key :
            new Date().getTime() + Math.random();
        var merger = merge(option, this.props, DEFAULTS);
        var snack = {
            key: id,
            message: message,
            open: true,
            entered: false,
            requestClose: false,
            variant: merger('variant'),
            anchorOrigin: merger('anchorOrigin'),
            autoHideDuration: merger('autoHideDuration')
        };
        if (opt.persist) {
            snack.autoHideDuration = undefined;
        }
        this.setState(function (state) {
            if (preventDuplicate === undefined || preventDuplicate) {
                var compareFunction = function (item) { return (hasSpecifiedKey ? item.key === key : item.message === message); };
                var inQueue = state.queue.findIndex(compareFunction) > -1;
                var inView = state.snacks.findIndex(compareFunction) > -1;
                if (inQueue || inView) {
                    return state;
                }
            }
            return _this.handleDisplaySnack(__assign(__assign({}, state), { queue: __spreadArray(__spreadArray([], state.queue, true), [
                    snack
                ], false) }));
        });
        return id;
    };
    /**
     * Reducer: Display snack if there's space for it. Otherwise, immediately
     * begin dismissing the oldest message to start showing the new one.
     */
    SnackbarProvider.prototype.handleDisplaySnack = function (state) {
        var snacks = state.snacks;
        if (snacks.length >= this.maxSnack) {
            return this.handleDismissOldest(state);
        }
        return this.processQueue(state);
    };
    SnackbarProvider.prototype.render = function () {
        var _this = this;
        var _a = this.props, children = _a.children, domRoot = _a.domRoot; _a.preventDuplicate; _a.variant; _a.anchorOrigin; var hideIconVariant = _a.hideIconVariant, iconVariant = _a.iconVariant, dense = _a.dense; _a.maxSnack; var props = __rest(_a, ["children", "domRoot", "preventDuplicate", "variant", "anchorOrigin", "hideIconVariant", "iconVariant", "dense", "maxSnack"]);
        var contextValue = this.state.contextValue;
        var categ = this.state.snacks.reduce(function (acc, current) {
            var _a;
            var category = originKeyExtractor(current.anchorOrigin);
            var existingOfCategory = acc[category] || [];
            return __assign(__assign({}, acc), (_a = {}, _a[category] = __spreadArray(__spreadArray([], existingOfCategory, true), [current], false), _a));
        }, {});
        var snackbars = Object.keys(categ).map(function (origin) {
            var snacks = categ[origin];
            console.log(snacks);
            return (React__default.createElement(SnackbarContainer$1, { key: origin, dense: dense, anchorOrigin: snacks[0].anchorOrigin }, snacks.map(function (snack) { return (React__default.createElement(SnackbarItem, __assign({}, props, { key: snack.key, snack: snack, dense: dense, iconVariant: iconVariant, hideIconVariant: hideIconVariant, onClose: _this.handleCloseSnack, onExited: createChainedFunction([_this.handleExitedSnack, _this.props.onExited]), onEntered: createChainedFunction([_this.handleEnteredSnack, _this.props.onEntered]) }))); })));
        });
        return (React__default.createElement(SnackbarContext.Provider, { value: contextValue },
            children,
            domRoot ? ReactDOM.createPortal(snackbars, domRoot) : snackbars));
    };
    return SnackbarProvider;
}(Component));

var useSnackbar = function () { return useContext(SnackbarContext); };

export { SnackbarContent, SnackbarProvider, useSnackbar };
//# sourceMappingURL=index.esm.js.map
