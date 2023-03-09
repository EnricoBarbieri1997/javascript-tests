import React from 'react'
import QA from './QA'

export default function QuestionList({questions}) {
	return <>
		{questions.map(q => <QA key={q.id} className="mb-6" namespace={questions} question={q}></QA>)}
	</>
}
