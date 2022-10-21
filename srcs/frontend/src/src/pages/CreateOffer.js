import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CiLocationOn } from 'react-icons/ci';

export const CreateOffer = () => {
	let navigator = useNavigate();

	let [title, setTitle] = useState("Escribe un título");
	let [location, setLocation] = useState("Escribe una localicación");
	let [description, setDescription] = useState("Escribe una descripción");

	let [loading, setLoading] = useState(true);

	let [name, setName] = useState(null);
	let [lastName, setLastName] = useState(null);
	let [phone, setPhone] = useState(null);
	let [email, setEmail] = useState(null);

	useEffect(() => {
		const getData = async () => {
			let response = await fetch(`http://10.13.1.4:3000/user/${JSON.parse(localStorage.getItem('user'))["id"]}`, {
				method: 'GET',
				headers: {
					'Authorization': localStorage.getItem('token')
				},
			});

			let data = await response.json();

			if (response.status === 401 || response.status === 403) {
				navigator("/login");
				return;
			}

			setName(data["name"]);
			setLastName(data["last_name"]);
			setPhone(data["phone"]);
			setEmail(data["email"]);

			setLoading(false);
		};

		getData();
	}, []);

	return (
		<div className="w-3/4 m-auto">
			<div className="form-control mt-4">
				<div className='flex items-end justify-between'>
					<div className='flex gap-2 items-end'>
						<div>
							<label className="label">
								<span className="label-text">Título</span>
							</label>
							<input type="text" placeholder="" value={title} onChange={(e) => {setTitle(e.target.value)}} className="input input-bordered w-full" />
						</div>
						<div>
							<label className="label">
								<span className="label-text">Ubicación</span>
							</label>
							<input type="text" placeholder="" value={location} onChange={(e) => {setLocation(e.target.value)}} className="input input-bordered w-full" />
						</div>
						<div className="dropdown dropdown-hover">
							<label tabIndex={0} className="btn btn-outline mr-2 normal-case font-normal">Categoría</label>
							<ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 gap-1">
								<li><a>Trabajo</a></li>
								<li><a className='bg-gray-200'>Comida</a></li>
							</ul>
						</div>
					</div>
					<div>
						<button className='btn btn-outline btn-success'>CREAR</button>
					</div>
				</div>
				<div>
					<label className="label">
						<span className="label-text">Descripción</span>
					</label>
					<textarea type="text" value={description} onChange={(e) => {setDescription(e.target.value)}} placeholder="" className="input input-bordered w-full p-2" />
				</div>
			</div>
			<div className="card bg-white shadow-md my-4">
				<div className="card-body">
					<div className='inline-flex items-center justify-between'>
						<h2 className="card-title text-2xl">{title}</h2>
						<div className="badge badge-success p-4">Trabajo</div>
					</div>
					<h3 className="text-gray-500 text-sm inline-flex items-center"><CiLocationOn className='mr-1'/>{location}</h3>
					<p>{description}</p>
					<hr className='my-2'></hr>
					{!loading && <h4 className='text-md font-medium'>Proveedor</h4>}
					{!loading && 
						<div className='ml-2'>
							<p>{name} {lastName}</p>
							<p>{phone}</p>
							<a href={`mailto:${email}`}>{email}</a>
						</div>
					}
				</div>
			</div>
		</div>
	);
};