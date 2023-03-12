import React from 'react'
import QuestionList from '../components/QuestionList'
import { asyncProgramming } from '../const/questions'

export default function AsyncPage() {
	return (
		<QuestionList questions={asyncProgramming}></QuestionList>
	)
}
