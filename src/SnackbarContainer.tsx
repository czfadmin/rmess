import * as React from "react";
import {ISnackbarProviderProps} from ".";
import clsx from "clsx";
import {SNACKBAR_INDENTS} from "./utils/constrants";
import {styled} from "@mui/material";

const collapse = {
    // Material-UI 4.12.x and above uses MuiCollapse-root; earlier versions use
    // Mui-Collapse-container.  https://github.com/mui-org/material-ui/pull/24084
    container: '& > .MuiCollapse-container, & > .MuiCollapse-root',
    wrapper: '& > .MuiCollapse-container > .MuiCollapse-wrapper, & > .MuiCollapse-root > .MuiCollapse-wrapper',
};

const xsWidthMargin = 16;

const componentName = 'SnackbarContainer';

const classes = {
    root: `${componentName}-root`,
    rootDense: `${componentName}-rootDense`,
    top: `${componentName}-top`,
    bottom: `${componentName}-bottom`,
    left: `${componentName}-left`,
    right: `${componentName}-right`,
    center: `${componentName}-center`,
};

const Root = styled('div')(({theme}: any) => ({
    [`&.${classes.root}`]: {
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: "column",
        maxHeight: '100%',
        position: 'fixed',
        zIndex: theme.zIndex.snackbar,
        height: 'auto',
        width: 'auto',
        transition: 'top 300ms ease 0ms, right 300ms ease 0ms, bottom 300ms ease 0ms, left 300ms ease 0ms, margin 300ms ease 0ms, max-width 300ms ease 0ms',
        // container itself is invisible and should not block clicks, clicks should be passed to its children
        pointerEvents: 'none',
        [collapse.container]: {
            pointerEvents: 'all',
        },
        [collapse.wrapper]: {
            padding: `${SNACKBAR_INDENTS.snackbar.default}px 0px`,
            transition: 'padding 300ms ease 0ms',
        },
        maxWidth: `calc(100% - ${SNACKBAR_INDENTS.view.default * 2}px)`,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            maxWidth: `calc(100% - ${xsWidthMargin * 2}px)`,
        },
    },
    [`&.${classes.rootDense}`]: {
        [collapse.wrapper]: {
            padding: `${SNACKBAR_INDENTS.snackbar.dense}px 0px`,
        },
    },
    [`&.${classes.top}`]: {
        top: SNACKBAR_INDENTS.view.default - SNACKBAR_INDENTS.snackbar.default,
        flexDirection: 'column',
    },
    [`&.${classes.bottom}`]: {
        bottom: SNACKBAR_INDENTS.view.default - SNACKBAR_INDENTS.snackbar.default,
        flexDirection: 'column-reverse',
    },
    [`&.${classes.left}`]: {
        left: SNACKBAR_INDENTS.view.default,
        [theme.breakpoints.up('sm')]: {
            alignItems: 'flex-start',
        },
        [theme.breakpoints.down('sm')]: {
            left: `${xsWidthMargin}px`,
        },
    },
    [`&.${classes.right}`]: {
        right: SNACKBAR_INDENTS.view.default,
        [theme.breakpoints.up('sm')]: {
            alignItems: 'flex-end',
        },
        [theme.breakpoints.down('sm')]: {
            right: `${xsWidthMargin}px`,
        },
    },
    [`&.${classes.center}`]: {
        left: '50%',
        transform: 'translateX(-50%)',
        [theme.breakpoints.up('sm')]: {
            alignItems: 'center',
        },
    },
}));

interface ISnackbarContainerProps {
    children: JSX.Element | JSX.Element[];
    className?: string;
    dense: ISnackbarProviderProps['dense'];
    anchorOrigin: NonNullable<ISnackbarProviderProps['anchorOrigin']>;
}

// Snackbar容器
const SnackbarContainer: React.FC<ISnackbarContainerProps> = (props) => {
    const {className, anchorOrigin, dense, ...other} = props;

    // 配置容器显示位置
    const combinedClassname = clsx(
        classes[anchorOrigin.vertical],
        classes[anchorOrigin.horizontal],
        {[classes.rootDense]: dense},
        classes.root, // root should come after others to override maxWidth
        className,
    );

    return (
        <Root className={combinedClassname} {...other} />
    );
};

export default React.memo(SnackbarContainer);
