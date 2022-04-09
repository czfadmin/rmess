import SnackbarContext from "SnackbarContext";
import {useContext} from "react";
import {IProviderContext} from "index";

const useSnackbar = (): IProviderContext => useContext(SnackbarContext)
export default useSnackbar