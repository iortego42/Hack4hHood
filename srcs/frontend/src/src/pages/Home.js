import React, { useEffect, useState } from 'react';

import { SearchBar } from '../components/SearchBar';
import { Offer } from '../components/Offer';

import { IoFilterSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

import { getTagsData } from '../utils/Tags';
import { getOffers } from '../utils/Offers';

export const Home = () => {
	let [offers, setOffers] = useState([]);

	let [tags, setTags] = useState([]);
	let [selectedTag, setSelectedTag] = useState([]);

	useEffect(() => {
		getTagsData({ setTags });
		getOffers({ setOffers });
	}, []);

	return (
		<div className="w-3/4 m-auto">
			<div className='flex mx-auto mt-4'>
				<div className="dropdown dropdown-hover">
					<label tabIndex={0} className="btn mr-2"><IoFilterSharp/></label>
					<ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 gap-1">
						{tags.length != 0 && tags.map((e) => {
							return <li className={selectedTag === e.name ? 'bg-gray-200' : ''} onClick={(ev) => setSelectedTag(e.name)} key={e.id}><a>{e.name}</a></li>
						})}
					</ul>
				</div>
				<SearchBar />
				{ localStorage.getItem('token') !== null && <Link className="btn btn-primary ml-2 text-md" to={"/offer/create"}>Crear oferta</Link>}
			</div>
			<div className='mt-4'>
				{offers && offers.map((e) => {
					return (
						<div className='my-4'><Offer data={e} /></div>
					)
				})}
			</div>
		</div>
	)
};