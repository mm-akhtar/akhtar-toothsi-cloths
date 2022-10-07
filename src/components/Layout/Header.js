import { Fragment } from 'react';

import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../assets/cloths.jpeg';
import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
	return (
		<Fragment>
			<header className={classes.header}>
				<h1>ReactCloths</h1>
				<NavLink to='/cart'>
					<HeaderCartButton />
				</NavLink>
			</header>
			<div className={classes['main-image']}>
				<img src={mealsImage} alt='A table full of delicious food!' />
			</div>
		</Fragment>
	);
};

export default Header;
