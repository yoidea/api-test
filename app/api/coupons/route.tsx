import {NextRequest, NextResponse} from "next/server";

let open: boolean;

export async function POST(
    req: NextRequest
) {
    const data = await req.json()
    if (data['context']['deviceMac'] !== 'E975EADB3C79') {
        return NextResponse.json({ status: 200 });
    }

    const { TOKEN } = process.env
    console.log(TOKEN)
    const response = await fetch('https://api.line.me/v2/bot/message/broadcast', {
            method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`
        },
        body: JSON.stringify({
            'messages': [
                {
                    'type': 'text',
                    'text': '🚨社会の窓が開いているかもしれません'
                }
            ]
        })
    })
    const json = await response.json()
    console.log(josn)

    if (data['context']['openState'] === 'open') {
        open = true;
    } else {
        open = false;
    }

    return NextResponse.json({ status: 200 });
}

export async function GET(
    req: NextRequest
) {
    const { TOKEN } = process.env
    console.log(TOKEN)
    const response = await fetch('https://api.line.me/v2/bot/message/broadcast', {
            method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`
        },
        body: JSON.stringify({
            'messages': [
                {
                    'type': 'text',
                    'text': '🚨社会の窓が開いているかもしれません'
                }
            ]
        })
    })
    const json = await response.json()
    console.log(josn)

    return NextResponse.json({
        open: `${open}`
    }, { status: 200 })
}