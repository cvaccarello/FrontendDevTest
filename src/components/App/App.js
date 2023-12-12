import './App.css';
import logo from '../../assets/images/logo.svg';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ItemList from '../ItemList/ItemList';

function App() {
	return (
		<Container className="app" maxWidth="xl">
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					flexDirection: "column",
					alignItems: "center",
					minHeight: "100vh"
				}}
			>
				<header className="app-header">
					<nav>
						<img src={logo} alt="tmp"/>
					</nav>
				</header>

				<ItemList></ItemList>
			</Box>
		</Container>
	);
}

export default App;
