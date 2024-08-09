import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import rs from 'text-readability';

import { calculateWordCount } from '../../config/utils/calculateWordCount';
import { calculateAverageWordsPerSentence } from '../../config/utils/calculateAverageWordsPerSentence';
import { extractTextFromPdf } from '../../config/utils/extractTextFromPdf';
import { trimExcessWhitespace } from '../../config/utils/trimExcessWhitespace';

import { UploadIcon } from '../../assets/svg/UploadIcon';
import { Box, Button, TextField, Typography } from '@mui/material';

const DocUploader = () => {
	const [fileContent, setFileContent] = useState('');
	const [error, setError] = useState('');
	const [includeWhitespace, setIncludeWhitespace] = useState(false);

	const handleFileUpload = async (event) => {
		console.log('event picked file', { event });

		const file = Array.isArray(event) ? event[0] : event.target.files[0];
		if (file && file.name.endsWith('.docx')) {
			const reader = new FileReader();
			reader.onload = async (e) => {
				const arrayBuffer = e.target.result;
				const result = await window.mammoth.extractRawText({ arrayBuffer });
				console.log({ result });
				setFileContent(result.value);
			};
			reader.readAsArrayBuffer(file);
		} else if (file && file.name.endsWith('.pdf')) {
			const reader = new FileReader();
			reader.onload = async (e) => {
				const pdfBytes = new Uint8Array(e.target.result);
				const text = await extractTextFromPdf(pdfBytes);
				console.log(text);
			};
			reader.readAsArrayBuffer(file);
		} else {
			setError('Please upload a DOCX or PDF file.');
		}
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop: handleFileUpload,
		accept: '.pdf, .docx',
	});

	const rootProps = getRootProps();

	const handleEditFileContent = (e) => {
		setFileContent(e.target.value);
	};

	return (
		<div
			{...rootProps}
			onDrop={() => console.log('Drop in checkered container')}
			onClick={
				!fileContent
					? () => {
							console.log('click the other one');
						}
					: null
			}
			className="min-w-[100px] min-h-[100px] border-1 border-solid text-black"
		>
			{!fileContent ? (
				<div
					onClick={rootProps.onClick}
					onDrop={rootProps.onDrop}
					style={dropzoneStyle}
					className="w-[400px] h-[400px] flex flex-col justify-center items-center gap-5 text-purple-950 mx-auto border-purple-950 border-opacity-20 border-dashed border-4 rounded-lg"
				>
					<input {...getInputProps()} />
					<UploadIcon />
					{isDragActive ? (
						<p>Drop the files here ...</p>
					) : (
						<>
							<Typography className="font-semibold text-sm">
								Drag and drop a PDF or DOCX file here, or click to select one
							</Typography>
							<Typography className="text-xs">
								Limit 200mb per file. PDF | DOCX
							</Typography>
						</>
					)}
				</div>
			) : (
				<>
					<div>
						<Button onClick={() => setFileContent('')}>Upload New</Button>
						<Box className={'flex flex-row gap-5 justify-center'}>
							<h3>Remove Whitespace:</h3>
							<label>
								<input
									type="checkbox"
									value="yes"
									checked={includeWhitespace}
									onChange={() => setIncludeWhitespace(!includeWhitespace)}
								/>
							</label>
						</Box>
					</div>
					<div className="flex flex-1 flex-col w-[100%] gap-5 mt-5">
						<p>
							{`Reading Ease: ${rs.fleschReadingEase(fileContent)},\n
					FleschKincaid Grade: ${rs.fleschKincaidGrade(fileContent)},\n
					Sentence Count: ${rs.sentenceCount(fileContent)},\n
					Average words per sentence: ${calculateAverageWordsPerSentence(fileContent)}, \n
					Word count: ${calculateWordCount(fileContent)}`}
						</p>
						<TextField
							style={preStyle}
							value={
								includeWhitespace
									? trimExcessWhitespace(fileContent)
									: fileContent
							}
							multiline
							onChange={handleEditFileContent}
						/>
					</div>
				</>
			)}
			{error && <div style={{ color: 'red' }}>{error}</div>}
		</div>
	);
};

const preStyle = {
	whiteSpace: 'pre-wrap',
	wordWrap: 'break-word',
	flex: 1,
	boxSizing: 'border-box',
	padding: '10px',
	backgroundColor: '#f4f4f4',
	borderRadius: '5px',
	textAlign: 'left',
};

const dropzoneStyle = {
	padding: '20px',
	textAlign: 'center',
	cursor: 'pointer',
	marginTop: '20px',
};

export default DocUploader;
