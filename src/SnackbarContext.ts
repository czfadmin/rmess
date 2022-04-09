import * as  React from 'react'
import {IProviderContext} from ".";

const SnackbarContext = React.createContext<IProviderContext>({
    enqueueSnackbar: () => -1,
    closeSnackbar: () => {}
})


export default SnackbarContext