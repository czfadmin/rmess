import {IRmessageAPI, IRmessageOption, ISnackbarKey, ISnackbarMessage,} from "./index";
import {Rmessage} from "./Rmessage";


let messageInstance: Rmessage | null


function getRMessageInstance(args: { message: ISnackbarMessage, option?: IRmessageOption },
                             callback: (instance: Rmessage) => ISnackbarKey) {

    if (messageInstance) {
        callback(messageInstance)
        return
    }

    Rmessage.newInstance(null, (messageIns: Rmessage) => {
        if (messageInstance) {
            callback(messageInstance)
            return
        }
        messageInstance = messageIns
        callback(messageInstance)
    })
}

function notify(message: ISnackbarMessage, option?: Partial<IRmessageOption>) {
    getRMessageInstance({message, option}, (instance: Rmessage) => {
        return instance.show(message, option || {})
    })
}


const rmessageAPI: any = {
    show: notify
}
const variantTypeList = ["error", "info", "success", "warning"]

function attachVariantToAPI() {
    variantTypeList.forEach(variant => {
        rmessageAPI[variant] =
            (message: ISnackbarMessage, option: IRmessageOption) => rmessageAPI.show(message, {
                    ...option,
                    variant
                } as IRmessageOption)

    })
}


attachVariantToAPI()

export default rmessageAPI as IRmessageAPI