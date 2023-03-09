export function getQuestion(namespace, question)
{
	return typeof question === "object" ? question : namespace.find(q => q.id === question)
}

export function questionId(indexer)
{
	return typeof indexer === "object" ? indexer.id : indexer
}