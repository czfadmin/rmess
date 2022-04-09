import {styled} from "@mui/system";

import clsx from "clsx";
import React from "react";
import {ISnackbarContentProps} from "index";




const componentName = "SnackbarContent";
const classes = {
    root: `${componentName}-root`,
};
const ContentRoot = styled("div")(({theme}: any) => ({
    [`&.${classes.root}`]: {
        display: "flex",
        flexWrap: "wrap",
        flexGrow: 1,
        [theme.breakpoints.up("sm")]: {
            flexGrow: "initial",
            minWidth: 288,
        },
    },
}));

const SnackbarContent: React.FC<ISnackbarContentProps> = (
    props: ISnackbarContentProps
) => {
    const {className} = props;
    return <ContentRoot className={clsx(classes.root, className)}/>;
};

export default SnackbarContent;
