import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import MainPage from './components/MainPage/MainPage';

function App() {
	const [auth, setAuth] = useState(false);

	const handleAuth = () => {
		setAuth(true);
	};

  return (
    <div className="App">
		<BrowserRouter>
			<Header auth={handleAuth} />
			{auth && <MainPage/>}
		</BrowserRouter>
    </div>
  );
}

export default App;
