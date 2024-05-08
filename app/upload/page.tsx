'use client';
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import React, { useState } from 'react';

interface cloudinaryResult {
	public_id: string;
}

const Upload = () => {
	const [publicId, setPublicId] = useState('');

	return (
		<>
			{publicId && <CldImage src={publicId} alt='me' width={700} height={300} />}
			<CldUploadWidget
				uploadPreset='fja6nslf'
				onSuccess={(result, widget) => {
					if (result.event !== 'success') return;
					const info = result.info as cloudinaryResult;
					setPublicId(info.public_id);
				}}
			>
				{({ open }) => (
					<button className='btn btn-primary mt-2' onClick={() => open()}>
						Upload
					</button>
				)}
			</CldUploadWidget>
		</>
	);
};

export default Upload;
