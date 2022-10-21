import React from 'react';

import { Link, useNavigate } from 'react-router-dom';

export const Navbar = () => {
	const navigator = useNavigate();

	const logoutUser = () => {
		if (localStorage.getItem('token') !== null) {
			localStorage.clear();

			navigator(0);
		}
	};

	return (
		<div className="navbar bg-base-100 shadow-md rounded-b-lg">
			<div className="flex-1">
				<Link to={"/"} className="btn btn-ghost normal-case text-xl">Hombel</Link>
			</div>
			<div className="flex-none gap-2">
				<div className="dropdown dropdown-end">
				<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
					<div className="w-10 rounded-full">
					<img src="https://www.pngmart.com/files/21/Account-Avatar-Profile-PNG-Clipart.png" />
					</div>
				</label>
				<ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
					{localStorage.getItem("token") !== null &&
					<>
					<li>
						<Link to="/me">Perfil</Link>
					</li>
					<li className='mt-1'>
						<a onClick={logoutUser}>Salir</a>
					</li>
					</>}
					{localStorage.getItem("token") === null &&
					<>
					<li>
						<Link to="/login">Login</Link>
					</li>
					<li className='mt-1'>
						<Link to="/register">Register</Link>
					</li>
					</>}
				</ul>
			</div>
		</div>
	</div>
	);
};