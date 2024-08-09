export const calculateAverageWordsPerSentence = (text: string) => {
	const sentences = text.split(/[.!?]+/).filter(Boolean);
	const totalWords = sentences.reduce(
		(sum, sentence) => sum + sentence.split(/\s+/).filter(Boolean).length,
		0
	);
	return sentences.length ? totalWords / sentences.length : 0;
};
