import React, { useState } from 'react';

import { Offer } from '../components/Offer';

export const Profile = () => {
	let [name, setName] = useState("Adrián");
	let [lastName, setLastName] = useState("Pavel");
	let [number, setNumber] = useState("+34 688 888 138");
	let [email, setMail] = useState("bidijoe45@gmail.com");

	let [activeTab, setActiveTab] = useState("offers");

	const saveUser = (e) => {

	};

	return (
		<div className='flex mt-4 gap-2'>
			<div className='w-1/4'>
				<ul className="menu bg-base-100 roundedr-xl shadow-md">
					<li className={activeTab == "offers" ? "bordered" : ""} onClick={(e) => setActiveTab("offers")}><a>Tus ofertas</a></li>
					<li className={activeTab == "settings" ? "bordered" : ""} onClick={(e) => setActiveTab("settings")}><a>Ajustes</a></li>
				</ul>
			</div>
			<div className='w-3/4'>
				{ activeTab == "offers" && ( <Offer /> ) }
				{ activeTab == "settings" && (
					<div className="card bg-white shadow-md">
						<div className="card-body pb-4">
							<div className='flex gap-2'>
								<div className='flex-1'>
									<label className="label">
										<span className="label-text">Nombre</span>
									</label>
									<input type="text" value={name} placeholder="" onChange={(e) => setName(e.target.value)} className="input input-bordered w-full" />
								</div>
								<div className='flex-1'>
									<label className="label">
										<span className="label-text">Apellidos</span>
									</label>
									<input type="text" value={lastName} placeholder="" onChange={(e) => setLastName(e.target.value)} className="input input-bordered w-full" />
								</div>
							</div>
							<div className='flex gap-2'>
								<div className='flex-1'>
									<label className="label">
										<span className="label-text">Teléfono</span>
									</label>
									<input type="text" value={number} placeholder="" onChange={(e) => setNumber(e.target.value)} className="input input-bordered w-full" />
								</div>
								<div className='flex-1'>
									<label className="label">
										<span className="label-text">Email</span>
									</label>
									<input type="text" value={email} placeholder="" onChange={(e) => setMail(e.target.value)} className="input input-bordered w-full" />
								</div>
							</div>
							<button className='btn btn-success btn-outline w-24 self-end' onClick={saveUser}>Guardar</button>
						</div>
					</div>
				) }
			</div>
		</div>
	);
};