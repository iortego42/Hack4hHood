import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Offer } from '../components/Offer';

export const Profile = () => {
	let navigator = useNavigate();

	let [name, setName] = useState(null);
	let [lastName, setLastName] = useState(null);
	let [number, setNumber] = useState(null);
	let [email, setMail] = useState(null);

	let [activeTab, setActiveTab] = useState("offers");

	const saveUser = async (e) => {
		if (localStorage.getItem('user') !== null) {
			let response = await fetch(`http://10.13.1.4:3000/user/${JSON.parse(localStorage.getItem('user'))["id"]}`, {
				method: 'PATCH',
				headers: {
					'Authorization': localStorage.getItem('token'),
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: name,
					last_name: lastName,
					phone: number,
					email: email
				}),
			});

			if (response.status === 401 || response.status === 403) {
				navigator("/login");
			}
		} else {
			navigator("/login");
		}
	};

	useEffect(() => {
		const getUserData = async () => {
			let response = await fetch(`http://10.13.1.4:3000/user/${JSON.parse(localStorage.getItem('user'))["id"]}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (response.status === 401 || response.status === 403) {
				navigator("/login");
				return;
			}

			let data = await response.json();

			setName(data["name"]);
			setLastName(data["last_name"]);
			setNumber(data["phone"]);
			setMail(data["email"]);
		};

		getUserData();
	}, []);

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
									{name && <input type="text" value={name} placeholder="" onChange={(e) => setName(e.target.value)} className="input input-bordered w-full" />}
								</div>
								<div className='flex-1'>
									<label className="label">
										<span className="label-text">Apellidos</span>
									</label>
									{lastName && <input type="text" value={lastName} placeholder="" onChange={(e) => setLastName(e.target.value)} className="input input-bordered w-full" />}
								</div>
							</div>
							<div className='flex gap-2'>
								<div className='flex-1'>
									<label className="label">
										<span className="label-text">Teléfono</span>
									</label>
									{number && <input type="text" maxLength={16} value={number} placeholder="" onChange={(e) => setNumber(e.target.value)} className="input input-bordered w-full" />}
								</div>
								<div className='flex-1'>
									<label className="label">
										<span className="label-text">Email</span>
									</label>
									{email && <input type="text" value={email} placeholder="" onChange={(e) => setMail(e.target.value)} className="input input-bordered w-full" />}
								</div>
							</div>
							<button onClick={saveUser} className='btn btn-success btn-outline w-24 self-end'>Guardar</button>
						</div>
					</div>
				) }
			</div>
		</div>
	);
};