import {ReactNode} from "react";
import {
    ISnackbarApiOption,
    ISnackbarOption
} from ".";


interface ISnackbarApi {
    show(message: ReactNode, options?: ISnackbarOption): void

    error(message: ReactNode, options?: ISnackbarOption): void;

    info(message: ReactNode, options?: ISnackbarOption): void;

    warn(message: ReactNode, options?: ISnackbarOption): void;

    success(message: ReactNode, options?: ISnackbarOption): void
}

class SnackbarApi implements ISnackbarApi {
    options: ISnackbarApiOption = {}

    constructor() {
        this.options = {}
    }

    error(message: ReactNode, options?: ISnackbarOption): void {
    }

    info(message: ReactNode, options?: ISnackbarOption): void {
    }

    show(message: ReactNode, options?: ISnackbarOption): void {
    }

    success(message: ReactNode, options?: ISnackbarOption): void {
    }

    warn(message: ReactNode, options?: ISnackbarOption): void {
    }

    config(options: ISnackbarApiOption) {
        this.options = {}
    }


}

const message = new SnackbarApi()
export default message