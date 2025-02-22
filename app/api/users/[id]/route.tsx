import { NextRequest, NextResponse } from 'next/server';
import schema from '../schema';
import prisma from '@/prisma/client';

interface Props {
	params: {
		id: string;
	};
}

export async function GET(request: NextRequest, { params: { id } }: Props) {
	const user = await prisma.user.findUnique({ where: { id: id } });
	if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

	return NextResponse.json(user);
}

export async function PATCH(request: NextRequest, { params: { id } }: Props) {
	const body = await request.json();
	const validation = schema.safeParse(body);
	if (!validation.success) return NextResponse.json({ error: validation.error.errors }, { status: 400 });

	const user = await prisma.user.findUnique({ where: { id: id } });

	if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
	const updatedUser = await prisma.user.update({
		where: { id: user.id },
		data: {
			name: body.name,
			email: body.email,
		},
	});

	return NextResponse.json(updatedUser);
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
	const user = await prisma.user.findUnique({ where: { id: id } });

	if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

	await prisma.user.delete({ where: { id: user.id } });
	// if (id > 10) return NextResponse.json({ error: 'User not found' }, { status: 404 });
	return NextResponse.json({}, { status: 202 });
}
