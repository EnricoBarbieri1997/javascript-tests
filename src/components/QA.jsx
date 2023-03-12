import React, { useState } from 'react'
import { useAnswers } from '../context/Answers'
import { getQuestion } from '../helpers/question'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism.css'
import Editor from 'react-simple-code-editor'
import { Button } from 'flowbite-react'
import { ArrowSmallUpIcon, PlayIcon } from '@heroicons/react/24/solid'
import Prism from "prismjs"
import { dynamicImport } from '../helpers/import'

export default function QA({className, namespace, question}) {
	const [result, setResult] = useState()
	const questionObject = getQuestion(namespace, question)

	const {getAnswer, setAnswer} = useAnswers()

	const answer = getAnswer(questionObject) ?? ""

	const formatDescription = () =>
	{
		if(questionObject.snippets === undefined || questionObject.snippets.length === 0) return questionObject.description
		let snippetBase = 0
		let description = questionObject.description
		let newDescritpion = description
		do {
			newDescritpion = newDescritpion.replace("SNIPPET", "<span class='whitespace-pre-wrap'>" + Prism.highlight(questionObject.snippets[snippetBase], Prism.languages.javascript, "javascript")) + "</span>"
			snippetBase++
		} while (newDescritpion !== description && snippetBase < questionObject.snippets.length)

		return newDescritpion.trim()
	}

	const testQuestion = async () =>
	{
		try
		{
			setResult(await questionObject.test(questionObject.import ? await dynamicImport(answer) : answer))
		}
		catch(e)
		{
			console.log("catched")
			console.error(e)
			setResult(false)
		}
	}
	return (
		<div className={className}>
			<div className="flex justify-between">
				<div>
					<div className="flex items-baseline">
						<h2 className='text-3xl mb-4 mr-2'>{questionObject.title}</h2>
						{questionObject.import && <ArrowSmallUpIcon className='h-5 w-5' color='#1a56db'></ArrowSmallUpIcon>}
					</div>
					<p className='mb-4' dangerouslySetInnerHTML={{__html: formatDescription()}}></p>
				</div>
				<div className='flex'>
					<Button onClick={testQuestion}>
						<PlayIcon className='h-4 w-4'></PlayIcon>
					</Button>
				</div>
			</div>
			<Editor
				value={answer}
				onValueChange={code => setAnswer(question, code)}
				highlight={code => highlight(code, languages.javascript, "javascript")}
				padding={10}
				className="border-2 mb-2"
			/>
			<div className="text-right text-lg">
				{result === true && <p className='text-success'>Great!</p>}
				{result === false && <p className='text-failure'>No no</p>}
				{result === undefined && <pre className='text-failure'> </pre>}
			</div>
		</div>
	)
}
