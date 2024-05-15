import React, { CSSProperties } from 'react';
import { Html, Body, Container, Text, Link, Preview, Tailwind } from '@react-email/components';

const WelcomeTemplate = ({ name }: { name: string }) => {
	return (
		<Html>
			<Preview> Welcome to Tracer, {name}</Preview>
			<Tailwind>
				<Body className='bg-blue-200 '>
					<Container>
						<Text className='text-[32px]'>Hello world</Text>
						<Link href='https://google.com'>Google</Link>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

const body: CSSProperties = {
	background: '#fff',
};

const heading: CSSProperties = {
	fontSize: '32px',
};

export default WelcomeTemplate;
