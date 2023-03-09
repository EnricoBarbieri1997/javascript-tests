import React from 'react'
import QuestionList from "../components/QuestionList"
import { typeCoercion } from '../const/questions'

export default function TypeCoercionPage() {
	return (
		<QuestionList questions={typeCoercion}></QuestionList>
	)
}
