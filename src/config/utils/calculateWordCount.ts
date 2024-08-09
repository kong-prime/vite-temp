export const calculateWordCount = (text: string) => {
	return text.split(/\s+/).filter(Boolean).length;
};
