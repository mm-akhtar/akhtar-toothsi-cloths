import classes from './Order.module.css';
import { NavLink } from 'react-router-dom';

const Order = () => {
	return (
		<section className={classes.summary}>
			<h2>Thank You for your order</h2>
			<p>Please Go Back to home page by clicking</p>
			<p>This Button</p>
			<NavLink to='/home'>
				<button className={classes.button}>Home</button>
			</NavLink>
		</section>
	);
};

export default Order;
