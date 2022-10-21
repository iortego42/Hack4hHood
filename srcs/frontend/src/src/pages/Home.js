import { SearchBar } from '../components/SearchBar';
import { Offer } from '../components/Offer';

import { IoFilterSharp } from 'react-icons/io5';

export const Home = () => {
	let array = [{}, {}, {}, {}];

	return (
		<div className="w-3/4 m-auto">
			<div className='flex mx-auto mt-4'>
				<div className="dropdown dropdown-hover">
					<label tabIndex={0} className="btn mr-2"><IoFilterSharp/></label>
					<ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 gap-1">
						<li><a>Trabajo</a></li>
						<li><a className='bg-gray-200'>Comida</a></li>
					</ul>
				</div>
				<SearchBar />
				<button className="btn btn-primary ml-2 text-md">Crear oferta</button>
			</div>
			{array.map((e) => {
				return <Offer />
			})}
		</div>
	)
};