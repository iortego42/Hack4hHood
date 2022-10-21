import React from 'react';

import { Link } from 'react-router-dom';

export const Navbar = () => {
	return (
		<div className="navbar bg-base-100 shadow-md rounded-b-lg">
			<div className="flex-1">
				<Link to={"/"} className="btn btn-ghost normal-case text-xl">Refugiado</Link>
			</div>
			<div className="flex-none gap-2">
				<div className="dropdown dropdown-end">
				<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
					<div className="w-10 rounded-full">
					<img src="https://pbs.twimg.com/media/ElylOxGWkAM06j5.png" />
					</div>
				</label>
				<ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
					<li>
						<Link to="/me">Perfil</Link>
					</li>
					<li>
						<a>Salir</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
	);
};