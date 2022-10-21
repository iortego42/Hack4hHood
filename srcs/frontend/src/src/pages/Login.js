import React from 'react';

export const Login = () => {
	return (
		<div className="m-auto w-1/3 mt-12 form-control shadow-xl p-4">
			<h1 className='text-4xl font-medium'>Login</h1>
			<hr className='mt-2'></hr>
			<label className="label">
				<span className="label-text">Email</span>
			</label>
			<input type="email" placeholder="" className="input input-bordered" />
			<label className="label">
				<span className="label-text">Contraseña</span>
			</label>
			<input type="password" placeholder="" className="input input-bordered" />
			<button className='btn btn-success mt-4'>Entrar</button>
		</div>
	);
};