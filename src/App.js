import { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Header from './components/Layout/Header';
import Cloths from './components/Cloths/Cloths';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';
import Order from './components/Order/Order';

function App() {
	const [cartIsShown, setCartIsShown] = useState(false);

	const showCartHandler = () => {
		setCartIsShown(true);
	};

	const hideCartHandler = () => {
		setCartIsShown(false);
	};

	return (
		<CartProvider>
			{cartIsShown && <Cart onClose={hideCartHandler} />}
			<Header onShowCart={showCartHandler} />
			<main>
				<Routes>
					<Route path='/' element={<Navigate to='/home' />}></Route>
					<Route path='/home' element={<Cloths />}></Route>
					<Route path='/cart' element={<Cart />}></Route>
					<Route path='/order' element={<Order />}></Route>
				</Routes>
			</main>
		</CartProvider>
	);
}

export default App;
