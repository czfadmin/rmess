import {
    IRmessageConfig,
    IRmessageOption,
    ISnackbarKey,
    ISnackbarMessage,
    SnackbarProvider,
} from "./index";

let messageInstance: SnackbarProvider | null;

let globalConfig: IRmessageConfig;

function getRMessageInstance(
    args: { message: ISnackbarMessage; option?: IRmessageOption },
    callback: (instance: SnackbarProvider) => ISnackbarKey
) {
    if (messageInstance) {
        callback(messageInstance);
        return;
    }

    SnackbarProvider.newInstance(null, (messageIns: SnackbarProvider) => {
        if (messageInstance) {
            callback(messageInstance);
            return;
        }
        messageInstance = messageIns;
        callback(messageInstance);
    });
}

function notify(message: ISnackbarMessage, option?: Partial<IRmessageOption>) {
    getRMessageInstance({ message, option }, (instance: SnackbarProvider) => {
        return instance.show(message, { ...globalConfig, ...option });
    });
}
function config(config: IRmessageConfig) {
    globalConfig = config;
}

const rmessageAPI: any = {
    show: notify,
    config: config,
};


const variantTypeList = ["error", "info", "success", "warning"];

function attachVariantToAPI() {
    variantTypeList.forEach((variant) => {
        rmessageAPI[variant] = (
            message: ISnackbarMessage,
            option: IRmessageOption
        ) =>
            rmessageAPI.show(message, {
                ...option,
                variant,
            } as IRmessageOption);
    });
}

attachVariantToAPI();

export default rmessageAPI
