import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {SnackbarProvider} from "react-message";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

ReactDOM.render(<React.StrictMode>
    <SnackbarProvider
        maxSnack={4}
        contentProps={{
            variant: 'outlined'
        }}
        iconMapping={{
            success: <CheckCircleOutlineIcon fontSize="inherit"/>,
        }}
        hideIconVariant={false}
        closeable={false}
    >
        <App/>
    </SnackbarProvider>
</React.StrictMode>, document.getElementById('root'))
