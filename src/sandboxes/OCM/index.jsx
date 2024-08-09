import { PDFDocument } from 'pdf-lib';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import rs from 'text-readability';

// Function to read and extract text from a PDF
const extractTextFromPdf = async (pdfBytes) => {
	const pdfDoc = await PDFDocument.load(pdfBytes);
	const pages = pdfDoc.getPages();
	const textPromises = pages.map((page) => page.getTextContent());
	const textContents = await Promise.all(textPromises);

	return textContents
		.map((tc) => tc.items.map((item) => item.str).join(' '))
		.join('\n');
};

const calculateAverageWordsPerSentence = (text) => {
	const sentences = text.split(/[.!?]+/).filter(Boolean);
	const totalWords = sentences.reduce(
		(sum, sentence) => sum + sentence.split(/\s+/).filter(Boolean).length,
		0
	);
	return sentences.length ? totalWords / sentences.length : 0;
};

const calculateWordCount = (text) => {
	return text.split(/\s+/).filter(Boolean).length;
};

const testData = `
      Playing games has always been thought to be important to 
      the development of well-balanced and creative children; 
      however, what part, if any, they should play in the lives 
      of adults has never been researched that deeply. I believe 
      that playing games is every bit as important for adults 
      as for children. Not only is taking time out to play games 
      with our children and other adults valuable to building 
      interpersonal relationships but is also a wonderful way 
      to release built up tension. `;

console.log({
	readingEase: rs.fleschReadingEase(testData),
	kc: rs.fleschKincaidGrade(testData),
	sc: rs.sentenceCount(testData),
	avgsc: calculateAverageWordsPerSentence(testData),
	wc: calculateWordCount(testData),
});

const trimExcessWhitespace = (text) => {
	return text
		.replace(/\s{2,}/g, ' ') // Replace multiple spaces with a single space
		.replace(/\n{2,}/g, '\n\n') // Replace multiple newlines with two newlines (paragraph separator)
		.trim(); // Trim leading and trailing whitespace
};

const DocxUploader = () => {
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

	return (
		<div
			{...rootProps}
			onDrop={() => console.log('Drop in checkered container')}
			onClick={() => {
				console.log('click the other one');
			}}
			className="min-w-[100px] min-h-[100px] border-1 border-solid text-black"
		>
			<div
				onClick={rootProps.onClick}
				onDrop={rootProps.onDrop}
				style={dropzoneStyle}
			>
				<input {...getInputProps()} />
				{isDragActive ? (
					<p>Drop the files here ...</p>
				) : (
					<>
						<p>Drag and drop a PDF or DOCX file here, or click to select one</p>
						<p>Limit 200mb per file. PDF | DOCX</p>
					</>
				)}
			</div>
			<div>
				<h3>Remove Whitespace:</h3>
				<label>
					<input
						type="checkbox"
						value="yes"
						checked={includeWhitespace}
						onChange={() => setIncludeWhitespace(!includeWhitespace)}
					/>
				</label>
			</div>
			{error && <div style={{ color: 'red' }}>{error}</div>}
			<div className="flex flex-1 flex-col w-[100%]">
				<h3>File Content:</h3>
				<p style={preStyle}>
					{includeWhitespace ? trimExcessWhitespace(fileContent) : fileContent}
				</p>
			</div>
		</div>
	);
};

const preStyle = {
	whiteSpace: 'pre-wrap',
	wordWrap: 'break-word',
	overflow: 'auto',
	maxWidth: '100%',
	padding: '10px',
	backgroundColor: '#f4f4f4',
	borderRadius: '5px',
	textAlign: 'left',
};

const dropzoneStyle = {
	border: '2px dashed #cccccc',
	borderRadius: '5px',
	padding: '20px',
	textAlign: 'center',
	cursor: 'pointer',
	marginTop: '20px',
};

export default DocxUploader;
