import { NextRequest, NextResponse } from 'next/server';
import schema from './schema';
import prisma from '@/prisma/client';

export async function GET(req: NextRequest) {
	const products = await prisma.product.findMany({});
	return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
	const body = await req.json();
	const { success, error, data } = schema.safeParse(body);
	if (!success) return NextResponse.json({ error: error.errors }, { status: 400 });
	const product = await prisma.product.create({
		data,
	});

	return NextResponse.json(product, { status: 201 });
}
