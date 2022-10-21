import React from 'react';

import { CiLocationOn } from 'react-icons/ci';

export const Offer = () => {
	return (
		<div className="card bg-white shadow-md">
			<div className="card-body">
				<div className='inline-flex items-center justify-between'>
					<h2 className="card-title text-2xl">Camarero</h2>
					<div className="badge badge-success p-4">Trabajo</div>
				</div>
				<h3 className="text-gray-500 text-sm inline-flex items-center"><CiLocationOn className='mr-1'/>Madrid, Comunidad de Madrid</h3>
				<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
				<hr className='my-2'></hr>
				<h4 className='text-md font-medium'>Proveedor</h4>
				<div className='ml-2'>
					<p>Adrian Nicusor Pavel</p>
					<p>+34 648 888 138</p>
					<a href='mailto:bidijoe45@gmail.com'>bidijoe45@gmail.com</a>
				</div>
			</div>
		</div>
	);
};