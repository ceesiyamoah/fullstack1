import prisma from '@/prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcrypt';

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: 'jwt',
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
		Credentials({
			name: 'Crendentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'example@gmail.com',
				},
				password: { label: 'Password', type: 'password', placeholder: 'password' },
				name: { label: 'Nme' },
			},
			async authorize(credentials, req) {
				if (!credentials?.email || !credentials?.password) return null;

				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email,
					},
				});
				if (!user) return null;
				const validPassword = await bcrypt.compare(credentials.password, user.hashedPassword!);
				return validPassword ? user : null;
			},
		}),
	],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
