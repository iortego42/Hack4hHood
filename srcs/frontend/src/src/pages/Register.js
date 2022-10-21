import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

export const Register = () => {
	let [error, setError] = useState(false);
	let [errorMessage, setErrorMessage] = useState(null);
	let [name, setName] = useState("");
	let [lastName, setLastName] = useState("");
	let [email, setEmail] = useState("");
	let [phone, setPhone] = useState("");
	let [password, setPassword] = useState("");
	let [confPassword, setConfPassword] = useState("");

	const navigate = useNavigate();

	const registerUser = async (e) => {
		e.preventDefault();

		if (password !== confPassword) {
			setError(true);
			setErrorMessage("Password and confirm password don't match.")
			return;
		}

		let response = await fetch("http://10.13.1.4:3000/user", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: name,
				last_name: lastName,
				email: email,
				phone: phone,
				password: password
			}),
		});

		let data = await response.json();

		if (response.status === 403) {
			setError(true);
			setErrorMessage(data['error']);
			return;
		}

		navigate("/login");
	};

	return (
		<form className="m-auto w-1/3 mt-12 form-control shadow-xl p-4">
			<h1 className='text-4xl font-medium'>Registro</h1>
			<hr className='mt-2'></hr>
			<div className='flex gap-2 mt-4'>
				<div className='w-1/3'>
					<label className="label">
						<span className="label-text">Nombre</span>
					</label>
					<input value={name} onChange={(e) => setName(e.target.value)} type="text" required placeholder="" className="input input-bordered w-full" />
				</div>
				<div className='flex-1'>
					<label className="label">
						<span className="label-text">Apellidos</span>
					</label>
					<input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" required placeholder="" className="input input-bordered w-full" />
				</div>
			</div>
			<label className="label">
				<span className="label-text">Email</span>
			</label>
			<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="" className="input input-bordered" />
			<label className="label">
				<span className="label-text">Número de teléfono</span>
			</label>
			<input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" required placeholder="" className="input input-bordered" />
			<label className="label">
				<span className="label-text">Contraseña</span>
			</label>
			<input value={password} autoComplete="on" onChange={(e) => setPassword(e.target.value)} type="password" required placeholder="" className="input input-bordered" />
			<label className="label">
				<span className="label-text">Confirma tu contraseña</span>
			</label>
			<input value={confPassword} autoComplete="on" onChange={(e) => setConfPassword(e.target.value)} type="password" required placeholder="" className="input input-bordered" />
			{error && (
				<div className="alert alert-error shadow-lg mt-4 rounded-xl">
					<span>{errorMessage}</span>
				</div>
			)}
			<button onClick={registerUser} className='btn btn-success mt-4'>Registrarse</button>
		</form>
	)
};