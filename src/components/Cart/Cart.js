import React, { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';
import { NavLink } from 'react-router-dom';

const Cart = (props) => {
	const cartCtx = useContext(CartContext);
	const [isCheckout, setIsCheckout] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDIdSubmit] = useState(false);

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	const hasItems = cartCtx.items.length > 0;

	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};

	const cartItemAddHandler = (item) => {
		cartCtx.addItem(item);
	};

	const orderHandler = () => {
		setIsCheckout(true);
	};

	const submitOrderHandler = async (userData) => {
		setIsSubmitting(true);
		await fetch('https://react-http-70780-default-rtdb.firebaseio.com/orders.json', {
			method: 'POST',
			body: JSON.stringify({
				user: userData,
				orderdItems: cartCtx.items,
			}),
		});
		setIsSubmitting(false);
		setDIdSubmit(true);
		cartCtx.clearCart();
	};

	const cartItems = (
		<ul className={classes['cart-items']}>
			{cartCtx.items.map((item) => (
				<CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)} />
			))}
		</ul>
	);

	const modelActions = (
		<div className={classes.actions}>
			<NavLink to='/home'>
				<button className={classes['button--alt']} onClick={props.onClose}>
					Back
				</button>
			</NavLink>
			{hasItems && (
				<NavLink to='/order'>
					<button className={classes.button} onClick={() => cartCtx.clearCart()}>
						Order
					</button>
				</NavLink>
			)}
		</div>
	);

	const cartModelContet = (
		<React.Fragment>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{!isCheckout && modelActions}
		</React.Fragment>
	);

	return <Modal onClose={props.onClose}>{cartModelContet}</Modal>;
};

export default Cart;
