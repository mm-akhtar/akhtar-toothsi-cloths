import React, { useState, useEffect } from 'react';
import Card from '../UI/Card';
import ClothItem from './ClothItem/ClothItem';
import classes from './AvailableCloths.module.css';

const AvailableCloths = () => {
	const [cloths, setCloths] = useState([]);
	const [isloading, setIsLoading] = useState(true);
	const [httpError, setHttpError] = useState(null);
	const [allRowData, setAllRowData] = useState([]);
	const [search, setSearch] = useState('');

	useEffect(() => {
		const fetchCloths = async () => {
			const response = await fetch('https://react-http-70780-default-rtdb.firebaseio.com/cloths.json');

			if (!response.ok) {
				throw new Error('Something is wrong');
			}
			const responseData = await response.json();
			console.log(responseData);

			const loadedCloths = [];
			for (const key in responseData) {
				loadedCloths.push({
					id: key,
					name: responseData[key].name,
					description: responseData[key].description,
					price: responseData[key].price,
					img: responseData[key].img,
					size: responseData[key].size,
					category: responseData[key].category,
					color: responseData[key].color,
				});
			}
			setCloths(loadedCloths);
			setAllRowData(loadedCloths);
			setIsLoading(false);
		};

		fetchCloths().catch((error) => {
			setIsLoading(false);
			setHttpError(error.message);
		});
	}, []);

	const [productValue, setProductValue] = useState('All');
	const handleSelect = (e) => {
		e = e.target.value;
		setSearch('');
		setProductValue(e);
		if (brandValue === 'All') {
			if (e === 'All') {
			} else {
				const tempRowData = allRowData.filter((data) => data?.size === e);

				setCloths(tempRowData);
			}
		} else {
			if (e === 'All') {
				const tempRowData = allRowData.filter((data) => data?.category === brandValue);
				setCloths(tempRowData);
			} else {
				const tempRowData = allRowData.filter((data) => data.category === brandValue).filter((data) => data?.size === e);

				setCloths(tempRowData);
			}
		}
	};
	const [brandValue, setBrandtValue] = useState('All');

	const handleBrandSelect = (e) => {
		e = e.target.value;
		setSearch('');
		setBrandtValue(e);
		if (productValue === 'All') {
			if (e === 'All') {
				// getRowData();
			} else {
				const tempRowData = allRowData.filter((data) => data?.category === e);
				setCloths(tempRowData);
			}
		} else {
			if (e === 'All') {
				const tempRowData = allRowData.filter((data) => data?.size === productValue);
				setCloths(tempRowData);
			} else {
				const tempRowData = allRowData.filter((data) => data.size === productValue).filter((data) => data?.category === e);
				console.log(tempRowData);
				setCloths(tempRowData);
			}
		}
	};

	if (httpError) {
		return (
			<section className={classes.MealsError}>
				<p>{httpError}</p>
			</section>
		);
	}

	const clothsList = cloths.map((cloth) => (
		<ClothItem key={cloth.id} id={cloth.id} name={cloth.name} description={cloth.description} img={cloth.img} size={cloth.size} category={cloth.category} color={cloth.color} price={cloth.price} />
	));

	const performSearch = () => {
		if (search.length > 0) {
			const tempRow = allRowData.filter((row) => row.name.toLowerCase().includes(search.toLocaleLowerCase()));
			setCloths(tempRow);
		} else {
			setCloths(allRowData);
		}
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
		}, 100);
	};

	return (
		<section className={classes.cloths}>
			<Card>
				<ul className={classes.head}>
					<div className={classes.filter}>
						{!isloading && (
							<div className='select-dropdown'>
								<select onChange={handleBrandSelect}>
									<option readOnly style={{ display: 'none' }}>
										Category
									</option>
									<option value='hoodie'>hoodie</option>
									<option value='shirt'>shirt</option>
									<option value='t-shirt'>t-shirt</option>
									<option value='polo'>polo</option>
								</select>
							</div>
						)}
						{!isloading && (
							<div className='select-dropdown'>
								<select onChange={handleSelect}>
									<option readOnly style={{ display: 'none' }}>
										Size
									</option>
									<option value='S'>S</option>
									<option value='M'>M</option>
									<option value='L'>L</option>
									<option value='XL'>XL</option>
								</select>
							</div>
						)}
						<span
							className='reset'
							onClick={() => {
								setIsLoading(true);
								setCloths(allRowData);
								setTimeout(() => {
									setIsLoading(false);
								}, 100);
							}}>
							Reset filter
						</span>
					</div>
					<div>
						<input id='search' type='search' placeHolder='Global Search' className={classes.input} value={search} onChange={(e) => setSearch(e.target.value)} />
						<label for='search' className={classes.button} onClick={performSearch}>
							Search
						</label>
					</div>
				</ul>
			</Card>
			<hr></hr>
			<Card>
				<ul>
					<li className={classes.head}>
						<div>Product</div>
						<div className={classes.description}>Description</div>
						<div>Size</div>
						<div>Category</div>
						<div>Color</div>
						<div>Price</div>
						<div>Buy</div>
					</li>
				</ul>
				<ul>{clothsList}</ul>
			</Card>
		</section>
	);
};

export default AvailableCloths;
