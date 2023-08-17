import React, {useEffect, useState} from 'react'
import data from "../data";
import ExpandMoreOutlined from '@material-ui/icons/ExpandMoreOutlined';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import QRCode from "qrcode"
import axios from 'axios'

export default function QRConnection() {
  const [open, setOpen] = useState(true)
  const [qrCodeImage, setQRCodeImage] = useState(null)

  useEffect(() => {
    if (data.gameId) {
      const dataUrl = `${data.backendUrl}|${data.gameId}`
      QRCode.toDataURL(dataUrl).then(setQRCodeImage)
    }
  }, [data.gameId])

  return (
    <div style={{
      backgroundColor: "white",
      borderRadius: "10px",
      width: "168px"
    }}>
      <div style={{paddingTop: 5, paddingBottom: 5, display: 'flex', margin: "auto", width: "50%"}}>
        Connection
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