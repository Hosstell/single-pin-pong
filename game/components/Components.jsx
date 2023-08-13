import React from 'react'
import QRConnection from "./QRConnection";


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
                <QRConnection></QRConnection>
            </div>
        </div>
    )
}