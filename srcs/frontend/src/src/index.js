import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navbar } from './components/Navbar';

import './index.css';

import { Home } from './pages/Home';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<div className="w-2/3 m-auto">
			<Navbar />
			<Home />
		</div>
	</React.StrictMode>
);