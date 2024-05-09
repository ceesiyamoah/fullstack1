'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const Navbar = () => {
	const { status, data: session } = useSession();
	return (
		<div className='flex bg-slate-700 p-5 text-white'>
			<Link href='/' className='mr-5'>
				Next.js
			</Link>
			<Link href='/users'>Users</Link>
			{status === 'authenticated' && (
				<div className='ml-auto'>
					{session.user!.name}
					<Link href='/api/auth/signout' className='ml-2 hover:text-blue-500'>
						Sign Out
					</Link>
				</div>
			)}
			{status === 'unauthenticated' && (
				<Link href='/api/auth/signin' className='ml-auto'>
					Login{' '}
				</Link>
			)}
		</div>
	);
};

export default Navbar;
