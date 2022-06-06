import cryto from 'crypto'

const channelSecret = '7389145c98382243c9bd0b5bc1d1fa89'

export default function handler(req, res) {
    const body = JSON.stringify(req.body)
    const signature = cryto.createHmac("SHA256", channelSecret).update(body).digest("base64")
    
    for (var i=0; i<req.body.events.length; ++i) {
        const event = req.body.events[i]
        if (event["type"] != "message") continue

        const init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer nTAeNhhXiTtlJSbNpe8NgSlIa1efSN13zE9VG8G2PaqdV/TTR9ph481iaeB4pwrlJ/0Qi+BsTDGXybKUthOj14XOtp1SclDK/QR8wSAF3Y5cDXHs/fG3qM4+rQDEvCprzIzSa3rsR4Fg6wkz+Tgk1AdB04t89/1O/w1cDnyilFU="
            },
            body: {
                "replyToken": event["replyToken"],
                "messages": [
                    {
                        "type":"text",
                        "text":"Hello, user"
                    }
                ]
            }
        }

        fetch("https://api.line.me/v2/bot/message/reply", init).then(() => {
            console.log("success")
        }).catch(() => {
            console.log("failed")
        })
    }
    res.status(200).json({ processed: 'done' })
}