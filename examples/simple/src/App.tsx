import {useState} from 'react'
import './App.css'
import {ISnackbarKey, useSnackbar} from "rmess";

function App() {
    const {enqueueSnackbar, closeSnackbar} = useSnackbar()
    const [key, setKey] = useState<ISnackbarKey>()
    const handleShowSnackbar = () => {
        const _key = enqueueSnackbar("Hello World", {
            variant: "warning",
            anchorOrigin: {
                vertical: "bottom",
                horizontal: 'left'
            },
            contentProps: {},
            preventDuplicate: false,
            hideIconVariant: false,
            closeable: true
        })
    }
    return (
        <div className="App">
            <button onClick={handleShowSnackbar}> Show Snackbar</button>
            <button onClick={() => closeSnackbar(key)}>Close</button>
        </div>
    )
}

export default App
