import { createContext, useContext, useEffect, useState } from "react"
import { questionId } from "../helpers/question"

const QAContext = createContext([])
const answersKey = "answers"

export function useAnswers()
{
	return useContext(QAContext)
}

function initialAnswerState()
{
	const answers = localStorage.getItem(answersKey)
  return answers ? JSON.parse(answers) : ({})
}

export function AnswersProvider({children})
{
	const [answers, setAnswers] = useState(initialAnswerState)
	function setAnswer(id, value)
	{
		setAnswers(Object.assign({}, answers, {[questionId(id)]: value}))
	}
	function getAnswer(indexer)
	{
		return answers[typeof indexer === "object" ? indexer.id : indexer]
	}

	useEffect(() =>
	{
		localStorage.setItem(answersKey, JSON.stringify(answers))
	}, [answers])

	return <QAContext.Provider value={{answers, setAnswer, getAnswer}}>
		{children}
	</QAContext.Provider>
}