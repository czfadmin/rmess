import {useState} from 'react'
import './App.css'
import {ISnackbarKey, useSnackbar} from "react-message";

function App() {
    const {enqueueSnackbar, closeSnackbar} = useSnackbar()
    const [key, setKey] = useState<ISnackbarKey>()
    const handleShowSnackbar = () => {
        const _key = enqueueSnackbar("Hello World"+Math.random(), {
            variant: "success",
            anchorOrigin: {
                vertical: "top",
                horizontal: 'right'
            }
        })
        setKey(_key)
    }
    return (
        <div className="App">
            <button onClick={handleShowSnackbar}> Show Snackbar</button>
            <button onClick={() => closeSnackbar(key)}>Close</button>
        </div>
    )
}

export default App
