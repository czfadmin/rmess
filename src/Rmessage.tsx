import {
    IRmessageOption,
    IRmessageProps,
    ISnackbarKey,
    ISnackbarMessage,
    ISnackbarOption,
    SnackbarProvider
} from "./index";
import ReactDOM from "react-dom";
import React from "react";


export class Rmessage extends SnackbarProvider {
    static newInstance: (container: any, callback: (ins: Rmessage) => void,
                         option?: IRmessageOption) => void

    constructor(props: IRmessageProps) {
        super(props);
    }

    public show(message: ISnackbarMessage, option: ISnackbarOption): ISnackbarKey {
        return this.enqueueSnackbar(message, option)
    }

}


Rmessage.newInstance =
    (container: any, callback: (ins: Rmessage) => void, option?: IRmessageOption
    ) => {
        let domRoot = container
        if (domRoot) {
            document.body.appendChild(container)
        } else {
            domRoot = document.createElement("div")
            domRoot.setAttribute("id", "snackbar-container")
            document.body.appendChild(domRoot)
        }
        function ref(messageInstance: Rmessage){
            if (!messageInstance) {
                return
            }
            callback(messageInstance)
        }
        ReactDOM.render(<Rmessage ref={ref}/>, domRoot)
    }