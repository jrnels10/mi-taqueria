import QRCode from 'qrcode'

// With promises
// QRCode.toDataURL('I am a pony!')
//     .then(url => {
//         console.log(url)
//     })
//     .catch(err => {
//         console.error(err)
//     })

// With async/await
export const generateQR = async text => {
    try {
        return await QRCode.toDataURL(text)
    } catch (err) {
        console.error(err)
    }
}


export function titleCase(string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
}
