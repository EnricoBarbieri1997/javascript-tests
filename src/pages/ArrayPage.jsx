import React from 'react'
import QuestionList from '../components/QuestionList';
import { arrays } from '../const/questions';

export default function ArrayPage() {
	return <QuestionList questions={arrays}></QuestionList>
}
