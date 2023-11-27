import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './store';
import { Provider } from 'react-redux';
// import { DataContextProvider } from './context/DataContext'
// import { AuthContextProvider } from './context/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <React.StrictMode>
      {/* <AuthContextProvider> */}
        {/* <DataContextProvider> */}
          <App />
        {/* </DataContextProvider> */}
      {/* </AuthContextProvider> */}
    </React.StrictMode>
  </Provider>
)
