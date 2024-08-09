export const trimExcessWhitespace = (text: string) => {
	return text.replace(/\n\s*\n\s*\n\s*\n\s*/g, '\n');
};
