import './index.css';
import React, { useEffect, useState } from 'react';
// import './App.css';
import FrlLanding from './sandboxes/FRL';
import DocxUploader from './sandboxes/OCM';
import CSVReader from './sandboxes/CSVReader';
import DocUploader from './screens/UploadFile';
import InAppSpy from 'inapp-spy';
import { Typography } from '@mui/material';
import ViteView from './sandboxes/Vite';



function App() {
	const { isInApp, appKey, appName, ...rest } = InAppSpy();
	
	console.log({isInApp, appKey, appName, rest})
	
	const [inAppState, setInAppState] = useState({})
	
	useEffect(()=>{
		
		alert('is in app' + JSON.stringify({isInApp, appName,appKey}))
		
		setInAppState({ isInApp, appName, appKey, ...rest });
		
	}, [isInApp, appName, appKey])
	
	
	return <>
	<Typography className='text-black'>
		{JSON.stringify(inAppState)}
	</Typography>
	<ViteView />
	</>
	// return <DocxUploader />;
	// return <CSVReader />;
	// return <FrlLanding />;
}

export default App;
