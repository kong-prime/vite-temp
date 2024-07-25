import './index.css';
import { useState } from 'react';
import React from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
// import './App.css';
import { Landing } from './screens/Landing';
import { Box, Button, TextField, Typography } from '@mui/material';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { SaveIcon } from './assets/svg/SaveIcon';
import { GenerateIcon } from './assets/svg/GenerateIcon';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

function CustomTabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			className="flex-1"
			{...other}
		>
			{value === index && (
				<Box className="py-3 flex flex-col gap-7 flex-1 justify-between h-full h-full">
					{children}
				</Box>
			)}
		</div>
	);
}

function App() {
	const [count, setCount] = useState(0);
	const [value, setValue] = useState(0);

	// useEffect(() => {
	// 	if (!count) {
	// 		setCount(count + 1);
	// 	}
	// }, []);

	// const Header = styled(Box)``

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Box
			className={
				'border-1 border-solid border-red-600 w-ful p-5 flex flex-col flex-1 h-full'
			}
		>
			<Box className="justify-between flex flex-row pb-3">
				<Box className="flex flex-col items-start">
					<Typography className="text-4xl text-gray-800">
						Final Response Letter
					</Typography>
					<TextField
						size="small"
						placeholder="Enter Case Reference number"
						label="Case Reference"
						className="my-3 overflow-hidden"
						InputProps={{ sx: { borderRadius: 3, background: '#f2f2f2' } }}
					/>
					<Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
						<Tabs
							value={value}
							onChange={handleChange}
							aria-label="basic tabs example"
						>
							<Tab label="Issue One" {...a11yProps(0)} />
							<Tab label="Issue Two" {...a11yProps(1)} />
							<Tab label="Issue Three" {...a11yProps(2)} />
						</Tabs>
					</Box>
				</Box>
				<Box className="rounded-[30px] bg-purple-500 w-[100px] h-[100px]"></Box>
			</Box>
			<Box className="flex flex-col justify-between flex-1 overflow-scroll">
				<CustomTabPanel value={value} index={0}>
					<Box className="flex flex-col gap-7 ">
						<TextField
							id="standard-textarea"
							multiline
							placeholder="Enter Issue Details"
							className="w-full border-0"
							label="Issue Details"
							rows={4}
							InputProps={{
								sx: {
									borderRadius: 3,
									background: '#f2f2f2',
									border: '0px solid black',
								},
							}}
							variant="outlined"
						/>
						<TextField
							id="standard-textarea"
							multiline
							placeholder="Enter Consumer desired outcome"
							className="w-full border-0"
							label="Consumer Desired Outcome"
							rows={4}
							InputProps={{ sx: { borderRadius: 3, background: '#f2f2f2' } }}
						/>
						<TextField
							id="standard-textarea"
							multiline
							placeholder="Enter Investigation Notes"
							className="w-full border-0"
							label="Investigation Notes"
							rows={4}
							InputProps={{ sx: { borderRadius: 3, background: '#f2f2f2' } }}
						/>
						<TextField
							id="standard-textarea"
							multiline
							placeholder="Enter Issue Decision"
							className="w-full border-0"
							label="Issue Decision"
							rows={4}
							InputProps={{ sx: { borderRadius: 3, background: '#f2f2f2' } }}
						/>
					</Box>
				</CustomTabPanel>
				<CustomTabPanel value={value} index={1}>
					Issue Two
				</CustomTabPanel>
				<CustomTabPanel value={value} index={2}>
					Issue Three
				</CustomTabPanel>
			</Box>
			<Box className="flex flex-col gap-3 items-start pt-3">
				<Button
					startIcon={<GenerateIcon />}
					className="text-gray-800 border-1 border-solid border-gray-800"
					variant="outlined"
				>
					<Typography>Save</Typography>
				</Button>
				<Button
					startIcon={<SaveIcon />}
					className="text-gray-800 border-1 border-solid border-gray-800"
					variant="outlined"
				>
					<Typography>Generate</Typography>
				</Button>
			</Box>
		</Box>
	);

	return <Landing />;

	return (
		<>
			<div className="bg-red-600">
				<a href="https://vitejs.dev" target="_blank" rel="noreferrer">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank" rel="noreferrer">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1 className="text-black">Vite + React!</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
}

export default App;
