import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';

import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { CreateOffer } from './pages/CreateOffer';
import { Profile } from './pages/Profile';
import { Register } from './pages/Register';
import { Login } from './pages/Login';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<div className="w-2/3 m-auto">
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />}/>
					<Route path='/register' element={<Register />}/>
					<Route path='/login' element={<Login />}/>
					<Route path='/me' element={<Profile />}/>
					<Route path='/offer/create' element={<CreateOffer />}/>
				</Routes>
			</div>
		</BrowserRouter>
	</React.StrictMode>
);