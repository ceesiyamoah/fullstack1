import { NextRequest, NextResponse } from 'next/server';

export function GET(request: NextRequest) {
	return NextResponse.json([
		{ id: 1, name: 'Cyril' },
		{ id: 2, name: 'Kwasi' },
	]);
}

export async function POST(request: NextRequest) {
	const body = await request.json();
	// const validation
	return NextResponse.json(body);
}
