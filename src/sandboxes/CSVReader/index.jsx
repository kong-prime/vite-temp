import React, { useState } from 'react';
import Papa from 'papaparse';

//https://docs.google.com/spreadsheets/d/1jAGBwR2sNkE5vFaUexhy0y6C-FKS6FxWJahd9rbyDI8/edit?usp=sharing
const CSVReader = () => {
	const [questions, setQuestions] = useState([]);

	const handleFileChange = (event) => {
		console.log({ event });
		const file = event.target.files[0];
		console.log({ file });
		if (file) {
			Papa.parse(file, {
				header: true,
				complete: (results) => {
					console.log({ results });
					const formattedQuestions = results.data.map((row) => ({
						query: row.Query,
						answer: row.Answer,
						options: row.Options.split(','),
					}));
					setQuestions(formattedQuestions);
				},
			});
		}
	};

	return (
		<div className="border-1 border-solid border-red-700">
			<input type="file" accept=".csv" onChange={handleFileChange} />
			<pre>{JSON.stringify(questions, null, 2)}</pre>
		</div>
	);
};

export default CSVReader;
