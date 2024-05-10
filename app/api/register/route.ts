import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

import { z } from 'zod';
const schema = z.object({
	email: z.string().email(),
	password: z.string().min(5),
});

export async function POST(req: NextRequest) {
	const body = await req.json();
	const { success, data, error } = schema.safeParse(body);
	if (!success) return NextResponse.json({ error: error.errors }, { status: 400 });
	const user = await prisma.user.findUnique({
		where: {
			email: data.email,
		},
	});
	if (user) return NextResponse.json({ message: 'User already exists' }, { status: 400 });

	const hashedPasswordFromUser = await bcrypt.hash(data.password, 10);
	const { hashedPassword, ...newUser } = await prisma.user.create({
		data: {
			email: data.email,
			hashedPassword: hashedPasswordFromUser,
		},
	});

	return NextResponse.json(newUser);
}
