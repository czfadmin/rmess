import {useContext} from "react";
import SnackbarContext from "./SnackbarContext";
import {IProviderContext} from ".";

const useSnackbar = (): IProviderContext => useContext(SnackbarContext)
export default useSnackbar