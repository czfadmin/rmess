import './App.css'
import {rmessageAPI} from "rmess";

function App() {
    const handleShowSnackbar = (variant: string) => {
        const _key = rmessageAPI[variant]("Hello World", {
            anchorOrigin: {
                vertical: "top",
                horizontal: 'left'
            },
            contentProps: {},
            preventDuplicate: false,
            hideIconVariant: false,
            closeable: true
        })
    }
    const variantTypeList = ["error", "info", "success", "warning"]
    return (
        <div className="App">
            {variantTypeList.map(variant => (
                <button onClick={() => handleShowSnackbar(variant)}>{variant}</button>))}

        </div>
    )
}

export default App
