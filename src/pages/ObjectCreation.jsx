import React from 'react'
import QuestionList from '../components/QuestionList'
import { objectCreation } from '../const/questions'

export default function ObjectCreation() {
	return (
		<QuestionList questions={objectCreation}></QuestionList>
	)
}
