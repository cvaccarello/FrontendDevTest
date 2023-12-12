import './App.css';
import logo from '../../assets/images/logo.svg';
import Container from '@mui/material/Container';
import ItemList from '../ItemList/ItemList';

function App() {
	return (
		<Container className="app" maxWidth="xl">
			<header className="app-header">
				<nav>
					<img src={logo} alt="tmp"/>
				</nav>
			</header>

			<ItemList></ItemList>
		</Container>
	);
}

export default App;
