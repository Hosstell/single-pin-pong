
export function createQRCodeURL(data) {
  return 'https://api.qrserver.com/v1/create-qr-code/?size=200&data=' + data
}
