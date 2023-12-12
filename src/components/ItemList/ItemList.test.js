import { render, screen, waitForElementToBeRemoved, fireEvent } from '@testing-library/react';
import ItemList from './ItemList';

it('renders loading message initially', () => {
	render(<ItemList />);
	expect(screen.getByText('Loading...')).toBeInTheDocument();
});

it('data fetched from API', async () => {
	// mock the fetch API call, so we're not making extra calls to a source we don't control and to avoid any instability or changes in the server-side API (ideally server-side covers itself with it's own tests)
	jest.spyOn(global, 'fetch').mockResolvedValue({
		json: () => ([
			{ id: 1, title: 'Item 1' },
			{ id: 2, title: 'Item 2' },
		]),
	});

	render(<ItemList />);

	await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));

	// expect loading message to be gone and items to be rendered
	expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
	expect(screen.getByText('Item 1')).toBeInTheDocument();
	expect(screen.getByText('Item 2')).toBeInTheDocument();
});

it('renders item list from the API', async () => {
	// mock the fetch API call, so we're not making extra calls to a source we don't control and to avoid any instability or changes in the server-side API (ideally server-side covers itself with it's own tests)
	jest.spyOn(global, 'fetch').mockResolvedValue({
		json: () => ([
			{ id: 1, title: 'Item 1' },
			{ id: 2, title: 'Item 2' },
		]),
	});

	render(<ItemList />);

	await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));

	expect(screen.getByText('Item 1')).toBeInTheDocument();
	expect(screen.getByText('Item 2')).toBeInTheDocument();
});

it('renders 1st of 2 items after search terms entered', async () => {
	// mock the fetch API call, so we're not making extra calls to a source we don't control and to avoid any instability or changes in the server-side API (ideally server-side covers itself with it's own tests)
	jest.spyOn(global, 'fetch').mockResolvedValue({
		json: () => ([
			{ id: 1, title: 'Item 1' },
			{ id: 2, title: 'Item 2' },
		]),
	});

	render(<ItemList />);

	await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));

	const searchInput = screen.getByLabelText('Search Items');

	fireEvent.change(searchInput, { target: { value: '1' } })

	expect(screen.getByText('Item 1')).toBeInTheDocument();
	expect(screen.queryByText('Item 2')).not.toBeInTheDocument();
});
