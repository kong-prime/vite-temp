import { PDFDocument } from 'pdf-lib';

export const extractTextFromPdf = async (pdfBytes) => {
	const pdfDoc = await PDFDocument.load(pdfBytes);
	const pages = pdfDoc.getPages();
	const textPromises = pages.map((page) => page.getTextContent());
	const textContents = await Promise.all(textPromises);

	return textContents
		.map((tc) => tc.items.map((item) => item.str).join(' '))
		.join('\n');
};
