import Link from 'next/link';
import UserTable from './UserTable';

interface Props {
	searchParams: { sortOrder: string };
}

const UsersPage = async ({ searchParams: { sortOrder } }: Props) => {
	return (
		<div>
			<h1>Users</h1>
			<Link href='/users/new' className='btn '>
				NEW USER
			</Link>
			<UserTable sortOrder={sortOrder} />
		</div>
	);
};

export default UsersPage;
