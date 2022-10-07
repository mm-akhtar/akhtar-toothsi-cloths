import { useContext } from 'react';

import ClothItemForm from './ClothItemForm';
import classes from './ClothItem.module.css';
import CartContext from '../../../store/cart-context';

const ClothItem = (props) => {
	const cartCtx = useContext(CartContext);

	const price = `$${props.price.toFixed(2)}`;

	const addToCartHandler = (amount) => {
		cartCtx.addItem({
			id: props.id,
			name: props.name,
			amount: amount,
			price: props.price,
		});
	};

	return (
		<li className={classes.meal}>
			<div>
				<div>
					<img
						src={props.img}
						style={{
							height: '80px',
							width: '80px',
						}}
						alt='product'
						className={classes.img}
					/>
				</div>
			</div>
			<div className={classes.details}>
				<h3> {props.name} </h3>
				<div className={classes.description}> {props.description} </div>
			</div>
			<div className={classes.description}> {props.size} </div>
			<div className={classes.description}> {props.category} </div>
			<div className={classes.description}> {props.color} </div> <div className={classes.price}> {price} </div>
			<div>
				<ClothItemForm onAddToCart={addToCartHandler} />
			</div>
		</li>
	);
};

export default ClothItem;
