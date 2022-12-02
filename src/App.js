import './App.css'
import AnswersSection from './components/AnswersSection';
import {ArrowLeftIcon, ArrowRightIcon, XMarkIcon, CheckBadgeIcon} from "@heroicons/react/20/solid"
import { useState } from 'react';
import { Modal } from './components/Modal/Modal';

const QuestionAndOptions = [
  {
    question: 'Who is the Prime Minister of India?',
    options: [
      'Narendra Modi',
      'Rahul Gandhi',
      'Manmohan Singh',
      'Sonia Gandhi'
    ],
    answer: 'Narendra Modi'
  },
  {
    question: 'Who went to moon first?',
    options: [
      'Yuri Gagarin',
      'Neil Armstrong',
      'Buzz Aldrin',
      'Alan Shepard'
    ],
    answer: 'Neil Armstrong'
  },
  {
    question: 'When is Independence Day of India?',
    options: [
      '15th August',
      '26th January',
      '26th December',
      '2nd October'
    ],
    answer: '15th August'
  },
]


function App() {

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showScore, setShowScore] = useState(false)
  const [score, setScore] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [selectedAnswerOptions, setSelectedAnswerOptions] = useState({})
  const [showModal, setShowModal] = useState(false)

  const onLeftClick = () => {
    setSelectedAnswer(null)
    if(currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const onRightClick = () => {
    setSelectedAnswer(null)
    if(currentQuestion < QuestionAndOptions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const setSelectedOption = (i) => {
    setSelectedAnswerOptions({
      ...selectedAnswerOptions,
      [currentQuestion]: QuestionAndOptions[currentQuestion].options[i]
    })
  }

  const onSubmit = () => {
    if(selectedAnswer === null) {
      return
    }

    setSelectedAnswerOptions({
      ...selectedAnswerOptions,
      [currentQuestion]: QuestionAndOptions[currentQuestion].options[selectedAnswer]
    })
    
    if (currentQuestion === QuestionAndOptions.length - 1) {
      generateScore()
      return
    }
    setSelectedAnswer(null)
    setCurrentQuestion(currentQuestion + 1)

  }

  const generateScore = () => {
    let score = 0
    for(let i = 0; i < QuestionAndOptions.length; i++) {
      if(QuestionAndOptions[i].answer === selectedAnswerOptions[i]) {
        score++
      }
    }
  
    setScore(score)
    setShowScore(true)
  }

  const reset = () => {
    setShowScore(false)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setSelectedAnswerOptions({})
  }

  return (
    <div className="flex items-end py-[10vh] justify-center App min-h-screen h-full sm:space-x-8 px-4">
      <Modal isVisible={showScore} >
        <div className='text-black space-y-4'>
        <CheckBadgeIcon className='w-20 h-20 text-green-400 mx-auto' />
          <XMarkIcon className="h-8 w-8 absolute right-3 top-3 text-gray-500 cursor-pointer" onClick={() => setShowScore(false)} />
          <h1 className='text-2xl font-bold text-center'>
            Result
          </h1>
          <div className='text-center text-xl'>
              Score : {score} / {QuestionAndOptions.length}
          </div>
          <div className='flex justify-center'>
            <button
            onClick={() => setShowScore(false)}
            type='button'
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
            <button className='ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={reset}>
              Reset
            </button>
          </div>
        </div>
      </Modal>
      <AnswersSection options={selectedAnswerOptions} />
      <div className='flex flex-col gap-6 max-w-4xl w-full '>
        <div className='flex w-full justify-between py-2'>
          {
            currentQuestion > 0 && (
            <div onClick={onLeftClick} className='border-4 border-red-600 px-2 bg-red-300 bg-opacity-60 cursor-pointer'>
              <ArrowLeftIcon className='w-8 h-8' />
            </div>
            )
          }
          {
            currentQuestion < QuestionAndOptions.length - 1 && (
            <div onClick={onRightClick} className='border-4 ml-auto border-red-600 px-2 bg-red-300 bg-opacity-60 cursor-pointer'>
              <ArrowRightIcon className='w-8 h-8' />
            </div>
            )
          }
        </div>
        <div className='w-full border-[6px] border-white py-3 px-6 text-2xl font-semibold bg-gray-400 bg-opacity-60'>
          {QuestionAndOptions[currentQuestion].question}
        </div>
        <div className='flex justify-between flex-wrap w-full gap-6'>
          {/* options */}
          {
            QuestionAndOptions[currentQuestion].options.map((_, i) => (
              <div 
              onClick={() => {
                setSelectedAnswer(i)
                setSelectedOption(i)
              }}
              className={`max-w-full cursor-pointer w-full sm:w-[45%] px-6 h-20 border-[6px] flex items-center text-2xl ${selectedAnswerOptions[currentQuestion] == _ ? 'border-fuchsia-600 bg-fuchsia-300 ': 'border-white bg-gray-400 '} bg-opacity-60 font-semibold hover:bg-fuchsia-300 hover:bg-opacity-60 hover:border-fuchsia-600`}>
                {i + 1}. {_}
              </div>

            ))

          }
        </div>
        <button 
        onSubmit={onSubmit}
        onClick={() => onSubmit()}
        // disabled={selectedAnswer === null}
        type="submit"
        className='border-4 border-yellow-600 px-2 text-xl font-bold bg-yellow-300 py-2 cursor-pointer'>
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;
