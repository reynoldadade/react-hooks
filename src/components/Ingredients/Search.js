import React, { useState, useEffect, useRef } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
	const [enteredFilter, setEnteredFilter] = useState("");
	const { onLoadIngredients } = props;
	const inputRef = useRef();
	useEffect(() => {
		const timer = setTimeout(() => {
			if (enteredFilter === inputRef.current.value) {
				const query =
					enteredFilter.length === 0
						? ""
						: `?orderby="title"&equalTo="${enteredFilter}`;
				fetch(
					"https://react-hooks-update-1bae1.firebaseio.com/ingredients.json" +
						query
				)
					.then((response) => response.json())
					.then((responseData) => {
						const loadedIngredients = [];
						for (const key in responseData) {
							loadedIngredients.push({
								id: key,
								title: responseData[key].title,
								amount: responseData[key].amount,
							});
						}
						onLoadIngredients(loadedIngredients);
					});
			}
		}, 500);
		return () => {
			clearTimeout(timer);
		};
	}, [enteredFilter, onLoadIngredients]);
	return (
		<section className="search">
			<Card>
				<div className="search-input">
					<label>Filter by Title</label>
					<input
						type="text"
						ref={inputRef}
						value={enteredFilter}
						onChange={(event) =>
							setEnteredFilter(event.target.value)
						}
					/>
				</div>
			</Card>
		</section>
	);
});

export default Search;
