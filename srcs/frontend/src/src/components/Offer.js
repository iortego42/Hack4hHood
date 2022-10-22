import React, { useEffect, useState } from 'react';

import { CiLocationOn } from 'react-icons/ci';
import { getTagData } from '../utils/Tags';
import { getLocationData } from '../utils/Locations';
import { getUserData } from '../utils/Users';

export const Offer = ({data}) => {
	let [tag, setTag] = useState(null);
	let [location, setLocation] = useState(null);
	let [provider, setProvider] = useState(null);

	useEffect(() => {
		getTagData(setTag, data.tag_id);
		getLocationData(setLocation, data.location_id);
		getUserData(setProvider, data.user_id);
	}, []);

	if (!provider || !location || !tag || !data)
		return <></>;

	return (
		<div className="card bg-base-100 shadow-md">
			<div className="card-body">
				<div className='inline-flex items-center justify-between'>
					<h2 className="card-title text-2xl">{data.title}</h2>
					<div className="badge badge-success p-4">{tag && tag.name}</div>
				</div>
				<h3 className="text-gray-500 text-sm inline-flex items-center"><CiLocationOn className='mr-1'/>{location.name}</h3>
				<p>{data.description}</p>
				<hr className='my-2'></hr>
				<h4 className='text-md font-medium'>Proveedor</h4>
				<div className='ml-2'>
					<p>{provider.name} {provider.last_name}</p>
					<p>{provider.phone}</p>
					<a href={`mailto:${provider.email}`}>{provider.email}</a>
				</div>
			</div>
		</div>
	);
};