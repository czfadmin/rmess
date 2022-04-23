import "./App.css";
import { rmessageAPI } from "rmess";
import { useTheme } from "@emotion/react";
import { createTheme } from "@mui/material";

function App() {

    const darkTheme = createTheme({
        palette: {
            mode: "dark",
            primary:{
                main:'#33333',
                dark:'true',
            }
        },
    });
    rmessageAPI.config({ theme: darkTheme });

    const handleShowSnackbar = (variant: string) => {
        const _key = rmessageAPI[variant]("Hello World" + Math.random(), {
            anchorOrigin: {
                vertical: "top",
                horizontal: "left",
            },
            contentProps: {},
            preventDuplicate: false,
            hideIconVariant: false,
            closeable: true,
        });
    };
    const variantTypeList = ["error", "info", "success", "warning"];
    return (
        <div className="App">
            {variantTypeList.map((variant) => (
                <button
                    key={variant}
                    onClick={() => handleShowSnackbar(variant)}
                >
                    {variant}
                </button>
            ))}
        </div>
    );
}

export default App;
