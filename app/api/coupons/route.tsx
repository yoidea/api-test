import {NextRequest, NextResponse} from "next/server";

let open: boolean;

export async function POST(
    req: NextRequest
) {
    const { TOKEN } = process.env
    const data = await req.json()
    if (data['context']['deviceMac'] !== 'E975EADB3C79') {
        return NextResponse.json({ status: 200 });
    }

    if (data['context']['openState'] === 'open') {
        open = true;
        await fetch('https://api.line.me/v2/bot/message/broadcast', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            },
            body: JSON.stringify({
                'messages': [
                    {
                        'type': 'text',
                        'text': '🚨社会の窓が開いたままかもしれません'
                    }
                ]
            })
        })
    } else {
        open = false;
    }

    return NextResponse.json({ status: 200 });
}

export async function GET(
    req: NextRequest
) {
    return NextResponse.json({
        open: `${open}`
    }, { status: 200 })
}