import React, {useEffect, useState} from 'react'
import data from "../data";
import ExpandMoreOutlined from '@material-ui/icons/ExpandMoreOutlined';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import QRCode from "qrcode"
import axios from 'axios'

export default function AppDownloadQR() {
  const [open, setOpen] = useState(true)
  const [qrCodeImage, setQRCodeImage] = useState(null)

  useEffect(() => {
    QRCode.toDataURL(`${window.location.href}app.apk`).then(setQRCodeImage)
  }, [])

  return (
    <div style={{
      backgroundColor: "white",
      borderRadius: "10px",
      width: "168px"
    }}>
      <div style={{
        paddingTop: 5,
        paddingBottom: open ? 1 : 5,
        display: 'flex',
        margin: "auto",
        position: "relative"
      }}>
        <div style={{whiteSpace: "nowrap", width: "100%", textAlign: "center"}}>
          Download APK
        </div>
        <div style={{position: "absolute", right: 6}}>
          {open ? (
            <ExpandLessIcon fontSize="small" style={{cursor: "pointer"}} onClick={() => setOpen(false)}/>
          ):(
            <ExpandMoreOutlined fontSize="small" style={{cursor: "pointer"}} onClick={() => setOpen(true)}/>
          )}
        </div>
      </div>
      {open && (
        <div style={{textAlign: 'center'}}>
          {qrCodeImage && <img src={qrCodeImage} style={{width: "98%"}}/>}
        </div>
      )}
    </div>
  )
}