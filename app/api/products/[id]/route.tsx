import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import schema from '../schema';

interface Props {
	params: {
		id: string;
	};
}

export async function GET(req: NextRequest, { params: { id } }: Props) {
	const product = await prisma.product.findUnique({
		where: { id: +id },
	});
	if (!product) {
		return NextResponse.json({ error: 'No product found' }, { status: 200 });
	}
	return NextResponse.json(product);
}

export async function PATCH(req: NextRequest, { params: { id } }: Props) {
	const body = req.json();
	const { success, error, data } = schema.safeParse(body);
	if (!success) {
		return NextResponse.json({ error: error.errors }, { status: 400 });
	}
	const product = await prisma.product.findUnique({
		where: { id: +id },
	});
	if (!product) {
		return NextResponse.json({ error: 'No product found' }, { status: 200 });
	}

	const updatedProduct = await prisma.product.update({
		where: {
			id: +id,
		},
		data,
	});

	return NextResponse.json(updatedProduct);
}

export async function DELETE(req: NextRequest, { params: { id } }: Props) {
	const body = req.json();
	const { success, error, data } = schema.safeParse(body);
	if (!success) {
		return NextResponse.json({ error: error.errors }, { status: 400 });
	}
	const product = await prisma.product.findUnique({
		where: { id: +id },
	});
	if (!product) {
		return NextResponse.json({ error: 'No product found' }, { status: 200 });
	}

	await prisma.product.delete({
		where: {
			id: +id,
		},
	});
	return NextResponse.json({});
}
