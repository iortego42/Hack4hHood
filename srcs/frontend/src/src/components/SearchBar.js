import React from 'react';

import { AiOutlineSearch } from 'react-icons/ai';

export const SearchBar = () => {
	return (
		<div className='relative w-full'>
			<input type="text" placeholder="Introduce aquí tu búsqueda..." className="input input-bordered w-full" />
			<AiOutlineSearch className='text-2xl absolute top-3 right-3 text-gray-500'/>
		</div>
	);
};