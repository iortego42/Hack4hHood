import React, { useState } from 'react';

import { CiLocationOn } from 'react-icons/ci';

export const CreateOffer = () => {
	let [title, setTitle] = useState("Escribe un título");
	let [location, setLocation] = useState("Escribe una localicación");
	let [description, setDescription] = useState("Escribe una descripción");

	// TODO: API CAMBIAR TAG tags.map();
	let [tag, setTag] = useState(null);

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
					<h4 className='text-md font-medium'>Proveedor</h4>
					<div className='ml-2'>
						<p>Adrian Nicusor Pavel</p>
						<p>+34 648 888 138</p>
						<a href='mailto:bidijoe45@gmail.com'>bidijoe45@gmail.com</a>
					</div>
				</div>
			</div>
		</div>
	);
};