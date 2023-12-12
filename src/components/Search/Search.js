import React, { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const ariaLabel = { 'aria-label': 'search list' };

const Search = ({ items, setFilteredItems }) => {
	const [ searchTerm, setSearchTerm ] = useState('');

	useEffect(() => {
		const filteredList = items.filter((item) =>
			item.title.toLowerCase().includes(searchTerm.toLowerCase())
		);

		setFilteredItems(filteredList);
	}, [ items, searchTerm, setFilteredItems ]);

	return (
		<FormControl fullWidth variant="filled">
			<InputLabel htmlFor="standard-adornment-search">Search Items</InputLabel>
			<FilledInput
				id="standard-adornment-search"
				inputProps={ariaLabel}
				onChange={(e) => {
					setSearchTerm(e.target.value);
				}}
				endAdornment={
					<InputAdornment position="end">
						<SearchIcon />
					</InputAdornment>
				}
			/>
		</FormControl>
	);
};

export default Search;
