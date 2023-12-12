import { render, fireEvent } from '@testing-library/react';
import Search from './Search';

it('search input contains correct entered value', () => {
	const items = [
		{ id: 1, title: 'Item 1' },
		{ id: 2, title: 'Item 2' },
	];
	const setFilteredItems = jest.fn((items) => items);

	const { container } = render(<Search items={items} setFilteredItems={setFilteredItems} />);
	// TODO: implemented this way to show it can be done other ways than how ItemList is testing things, can easily change this to any number of approaches for consistency
	// eslint-disable-next-line testing-library/no-node-access,testing-library/no-container
	const searchInput = container.querySelector('input');

	fireEvent.change(searchInput, { target: { value: 'item' } })

	expect(searchInput.value).toBe('item');
});

it('search input sets correct filtered items on input change', () => {
	const items = [
		{ id: 1, title: 'Item 1' },
		{ id: 2, title: 'Item 2' },
	];
	const setFilteredItems = jest.fn((items) => items);

	const { container } = render(<Search items={items} setFilteredItems={setFilteredItems} />);
	// TODO: implemented this way to show it can be done other ways than how ItemList is testing things, can easily change this to any number of approaches for consistency
	// eslint-disable-next-line testing-library/no-node-access,testing-library/no-container
	const searchInput = container.querySelector('input');

	fireEvent.change(searchInput, { target: { value: '1' } })

	expect(setFilteredItems).toHaveBeenCalledWith([items[0]]);
});
