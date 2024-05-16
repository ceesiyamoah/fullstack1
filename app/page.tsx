import { getServerSession } from 'next-auth';
import Link from 'next/link';
import Image from 'next/image';
import { authOptions } from './api/auth/authOptions';

export default async function Home() {
	const session = await getServerSession(authOptions);
	return (
		<main className='flex flex-col items-start relative h-screen'>
			<h1>Hello {session?.user?.name || 'world'}</h1>
			<Link href='/users'>Users</Link>
			<button className='btn btn-primary'>Add to cart</button>
			<Image
				src='https://bit.ly/react-cover'
				alt='cover'
				fill
				className='object-contain'
				sizes='(max-width:480px) 100vw, (max-width:768px) 50vw, (max-width:1200px) 30vw'
				quality={100}
				priority
			/>
		</main>
	);
}
