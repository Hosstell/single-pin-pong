import React, {useEffect, useState} from 'react'
import data from "../data";
import ExpandMoreOutlined from '@material-ui/icons/ExpandMoreOutlined';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import QRCode from "qrcode"
import axios from 'axios'

export default function AppDownloadQR() {
  const [open, setOpen] = useState(true)
  const [qrCodeImage, setQRCodeImage] = useState(null)
  const [url, setUrl] = useState(null)

  useEffect(() => {
    axios.get(`${data.backendUrl}download-app`).then(res => res.data).then(setUrl)
  }, [])

  useEffect(() => {
    if (url) {
      QRCode.toDataURL(url).then(setQRCodeImage)
    }
  }, [url])

  return (
    <div style={{
      backgroundColor: "white",
      borderRadius: "10px",
      width: "200px"
    }}>
      <div style={{paddingTop: 5, paddingBottom: 5, display: 'flex', margin: "auto", width: "50%"}}>
        Download APK
        <div style={{top: -10}}>
          {open ? (
            <ExpandLessIcon fontSize="small" style={{cursor: "pointer"}} onClick={() => setOpen(false)}/>
          ):(
            <ExpandMoreOutlined fontSize="small" style={{cursor: "pointer"}} onClick={() => setOpen(true)}/>
          )}
        </div>
      </div>
      {open && (
        <div style={{textAlign: 'center'}}>
          {qrCodeImage && <img src={qrCodeImage} style={{}}/>}
        </div>
      )}
    </div>
  )
}