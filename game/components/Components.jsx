import React from 'react'
import QRConnection from "./QRConnection";
import AppDownloadQR from "./AppDownloadQR";


export default function Components() {
    return (
        <div style={{
            position: "fixed",
            zIndex: 100,
            left: 10,
            top: 10,
            display: 'flex'
        }}>
          <div style={{padding: 10}}>
            <AppDownloadQR></AppDownloadQR>
          </div>
          <div style={{padding: 10}}>
            <QRConnection></QRConnection>
          </div>
        </div>
    )
}