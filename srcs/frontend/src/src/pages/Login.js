import React, { useState } from 'react';
import jwt_decode from "jwt-decode";

import { useNavigate } from 'react-router-dom';

export const Login = () => {
	let [email, setEmail] = useState("");
	let [password, setPassword] = useState("");
	let [error, setError] = useState(false);
	let [errorMessage, setErrorMessage] = useState("");

	const navigate = useNavigate();

	const loginUser = async (e) => {
		e.preventDefault();

		let response = await fetch("http://10.13.1.4:3000/auth", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				password: password
			}),
		});

		let data = await response.json();

		if (response.status === 403) {
			setError(true);
			setErrorMessage("Invalid username or password.");
			return;
		}

		localStorage.setItem('token', data["token"]);
		localStorage.setItem('user', JSON.stringify(jwt_decode(data["token"])));

		navigate("/");
	};
	return (
		<div className="m-auto w-1/3 mt-12 form-control shadow-xl p-4">
			<h1 className='text-4xl font-medium'>Login</h1>
			<hr className='mt-2'></hr>
			<label className="label">
				<span className="label-text">Email</span>
			</label>
			<input autoComplete='on' value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="" className="input input-bordered" />
			<label className="label">
				<span className="label-text">Contraseña</span>
			</label>
			<input autoComplete='on' value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="" className="input input-bordered" />
			{error && (
				<div className="alert alert-error shadow-lg mt-4 rounded-xl">
					<span>{errorMessage}</span>
				</div>
			)}
			<button onClick={loginUser} className='btn btn-success mt-4'>Entrar</button>
		</div>
	);
};