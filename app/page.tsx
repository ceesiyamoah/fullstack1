import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function Home() {
	const session = await getServerSession(authOptions);
	return (
		<main className='flex flex-col items-start'>
			<h1>Hello {session?.user?.name || 'world'}</h1>
			<Link href='/users'>Users</Link>
			<button className='btn btn-primary'>Add to cart</button>
		</main>
	);
}
