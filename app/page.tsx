import Link from 'next/link';

export default function Home() {
	return (
		<main className='flex flex-col items-start'>
			<h1>helloworld</h1>
			<Link href='/users'>Users</Link>
			<button className='btn btn-primary'>Add to cart</button>
		</main>
	);
}
