import React from 'react';

export const Register = () => {
	return (
		<div className="m-auto w-1/3 mt-12 form-control shadow-xl p-4">
			<h1 className='text-4xl font-medium'>Registro</h1>
			<hr className='mt-2'></hr>
			<div className='flex gap-2 mt-4'>
				<div className='w-1/3'>
					<label className="label">
						<span className="label-text">Nombre</span>
					</label>
					<input type="text" placeholder="" className="input input-bordered w-full" />
				</div>
				<div className='flex-1'>
					<label className="label">
						<span className="label-text">Apellidos</span>
					</label>
					<input type="text" placeholder="" className="input input-bordered w-full" />
				</div>
			</div>
			<label className="label">
				<span className="label-text">Email</span>
			</label>
			<input type="email" placeholder="" className="input input-bordered" />
			<label className="label">
				<span className="label-text">Contraseña</span>
			</label>
			<input type="password" placeholder="" className="input input-bordered" />
			<label className="label">
				<span className="label-text">Confirma tu contraseña</span>
			</label>
			<input type="password" placeholder="" className="input input-bordered" />
			<button className='btn btn-success mt-4'>Registrarse</button>
		</div>
	)
};