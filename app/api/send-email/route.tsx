import WelcomeTemplate from '@/emails/WelcomeTemplate';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
	await resend.emails.send({
		from: 'order@cyrilyamoah.com',
		subject: 'Welcome Aboard',
		to: 'ccyamoah@gmail.com',
		react: <WelcomeTemplate name={'Cyril'} />,
	});

	return NextResponse.json({});
}
