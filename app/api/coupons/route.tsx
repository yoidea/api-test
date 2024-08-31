import {NextRequest, NextResponse} from "next/server"

let open: boolean = false
let previousSendTime = new Date().getTime()

export async function POST(
    req: NextRequest
) {
    const notify = (text: string) => {
        const { TOKEN } = process.env
        fetch('https://api.line.me/v2/bot/message/broadcast', {
                method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            },
            body: JSON.stringify({
                'messages': [
                    {
                        'type': 'text',
                        text
                    }
                ]
            })
        })
    }

    const data = await req.json()
    if (data['context']['deviceMac'] !== 'E975EADB3C79') {
        return NextResponse.json({ status: 200 })
    }

    if (data['context']['openState'] === 'open') {
        open = true
        if (new Date().getTime() - previousSendTime > 5000) {
            notify("🚨社会の窓が開いています")
            previousSendTime = new Date().getTime()
        }
    } else {
        open = false
        if (new Date().getTime() - previousSendTime > 5000) {
            notify("✅社会の窓が閉まりました")
            previousSendTime = new Date().getTime()
        }
    }

    return NextResponse.json({ status: 200 })
}

export async function GET(
    req: NextRequest
) {
    return NextResponse.json({
        open: `${open}`
    }, { status: 200 })
}