'use client';

interface Props {
	error: Error;
	reset: () => void;
}

const ErrorPage = ({ error, reset }: Props) => {
	console.log(error);
	return (
		<>
			<div>An Error occurred.</div>
			<button className='btn' onClick={() => reset()}>
				Retry
			</button>
		</>
	);
};

export default ErrorPage;
