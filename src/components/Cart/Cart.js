import React, { useContext} from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import { NavLink } from 'react-router-dom';

const Cart = (props) => {
	const cartCtx = useContext(CartContext);

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	const hasItems = cartCtx.items.length > 0;

	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};

	const cartItemAddHandler = (item) => {
		cartCtx.addItem(item);
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
			{modelActions}
		</React.Fragment>
	);

	return <Modal onClose={props.onClose}>{cartModelContet}</Modal>;
};

export default Cart;
