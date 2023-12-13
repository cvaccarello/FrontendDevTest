import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Search from '../Search/Search';

const ItemList = ({ apiUrl }) => {
	const [ isLoading, setIsLoading ] = useState(true);
	const [ fetchError, setFetchError ] = useState('');
	const [ items, setItems ] = useState([]);
	const [ filteredItems, setFilteredItems ] = useState([]);

	// this gives us a default url to use for fetching items, while optionally allowing an override if needed
	if (!apiUrl) {
		apiUrl = process.env.REACT_APP_API + process.env.REACT_APP_API_ITEMS_PATH;
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(apiUrl);
				let data = await response.json();

				setItems(data);
				setFilteredItems(data);
				setIsLoading(false);
			} catch (error) {
				console.error(error);
				setIsLoading(false);
				setFetchError(error.message);
			}
		};

		fetchData().catch(console.error);
	}, [ apiUrl ]);

	if (isLoading) {
		return (
			<Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
				<Box sx={{ p: 2 }}>Loading...</Box>
			</Box>
		);
	}

	if (fetchError) {
		return (
			<Box sx={{ width: '100%', maxWidth: 360, bgcolor: '#ffcdd2', color: '#aa0000' }}>
				<Box sx={{ p: 2 }}>{fetchError}</Box>
			</Box>
		);
	}

	if (!filteredItems.length) {
		return (
			<Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
				<Search items={items} setFilteredItems={setFilteredItems}></Search>
				<Box sx={{ p: 2 }}>These aren't the droids you're looking for.</Box>
			</Box>
		);
	}

	return (
		<Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
			<Search items={items} setFilteredItems={setFilteredItems}></Search>
			<List>
				{
					filteredItems
						// TODO: cap at 10 for now, but we can add client-side pagination later
						.slice(0, 10)
						.map((item) => (
							<ListItem key={item.id}>{item.title}</ListItem>
						))
				}
			</List>
		</Box>
	);
};

export default ItemList;
