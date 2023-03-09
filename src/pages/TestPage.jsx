import React from 'react'
import QuestionList from '../components/QuestionList';
import { tests } from '../const/questions';

export default function TestPage() {
	return <QuestionList questions={tests}></QuestionList>
}
