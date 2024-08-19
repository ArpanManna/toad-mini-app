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
const newManifestUrl = "https://f583-2405-201-8010-d99d-8409-69b3-1af6-3ab0.ngrok-free.app/"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </TonConnectUIProvider>
)
