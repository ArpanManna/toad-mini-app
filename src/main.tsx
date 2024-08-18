import React from 'react'
import ReactDOM from 'react-dom/client'
import { TonConnectUIProvider } from "@tonconnect/ui-react"
import App from './App.tsx'
import WebApp from '@twa-dev/sdk'
import eruda from 'eruda'
import './index.css'


WebApp.ready();
eruda.init()

const IPFS_URL = import.meta.env.VITE_IPFS_URL
const manifestUrl = IPFS_URL;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </TonConnectUIProvider>
)
