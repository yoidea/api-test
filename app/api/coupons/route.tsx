import {NextRequest, NextResponse} from "next/server";

let open: boolean;

export async function POST(
    req: NextRequest
) {
    const data = await req.json()
    if (data['context']['deviceMac'] !== 'E9:75:EA:DB:3C:79') {
        return NextResponse.json({ status: 200 });
    }

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
    return NextResponse.json({
        'open': `${open}`
    }, { status: 200 })
}