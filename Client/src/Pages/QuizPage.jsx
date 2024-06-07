import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import MyModal from "../cards/CourseDetailsCard"
import { url } from '../Utilities/serverUrl'
const QuizPage = () => {
    const [quizzes, setQuizzes] = useState([])
    const user = JSON.parse(localStorage.getItem("user"))
    let [calculatedPercentage, setCalculated] = useState(0);
    const [loading, setLoading] = useState(false)
    const [modelOpen, setModealOpen] = useState(false)
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
    const [start, setStart] = useState(false)
    const { id } = useParams()
    const [answer, setAnswer] = useState({})

    const [ansarr, setAns] = useState([])
    useEffect(() => {
        const getQuizzes = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get(`${url}/course/quiz/${id}`)
                setQuizzes(data?.quiz)
            } catch (error) {
                console.log('error', error)
            }
            setLoading(false)
        }

        getQuizzes()
    }, [id])
    const handleSubmit = async () => {
        const calculateMark = quizzes.reduce((accumulator, quiz, index) => {
            // Check if the submitted answer is correct
            const submittedAnswer = answer[index];
            console.log('submittedAnswer', submittedAnswer)
            console.log('first', answer)
            if (submittedAnswer && submittedAnswer === quiz.answer) {
                // Increase the accumulator by 1 for each correct answer
                return accumulator + 1;
            } else {
                return accumulator;
            }
        }, 0);
        setCalculated(Number(calculateMark) * 100 / quizzes?.length)
        if (Math.floor(Number(calculateMark) * 100 / quizzes?.length) > 40) {
            try {
                const { data } = await axios.put(`${url}/user/updatecourse`, {
                    mark: Number(calculateMark) * 100 / quizzes?.length,
                    user: user?._id,
                    courseId: quizzes?.[0]?.course?._id
                })
                if (data?.success) {
                    toast.success("qualified successfully")
                }
            } catch (error) {
                console.log('error', error)
            }
        }
        setModealOpen(true)
    }
    const handleNext = () => {
        setCurrentQuizIndex(prevIndex => prevIndex + 1)
    }

    const handlePrevious = () => {
        setCurrentQuizIndex(prevIndex => prevIndex - 1)
    }


    const handleChange = (e, ans) => {
        setAns(prev => ([...prev, ans]

        ))
        const { name, value } = e.target;

        setAnswer(prev => ({
            ...prev,
            [name]: value
        }));
    };

    console.log(ansarr)
    console.log(answer)
    const currentQuiz = quizzes[currentQuizIndex]
    console.log('currentQuiz', currentQuiz)
    return (
        <div className='w-full h-screen p-4 flex justify-center'>
            <MyModal visible={modelOpen} user={user} quizzes={quizzes} calculatedPercentage={calculatedPercentage} onClose={() => setModealOpen(false)} />
            {!start && currentQuiz ? (
                <div className='w-[50%] flex flex-col gap-2 justify-center items-center h-[50%]'>
                    <span className='text-base'>Quiz title: <span className='font-bold'>{currentQuiz?.course?.name}</span></span>
                    <span className='text-base'>Number of questions: <span className='font-bold'>{quizzes.length}</span></span>
                    <button onClick={() => setStart(true)} className='px-6 py-2 text-white bg-cyan-500 font-bold rounded-sm' type="button">Start Quiz</button>
                </div>
            ) : (
                <div className=' w-full md:w-[50%] flex flex-col gap-2 border border-gray-900 mt-20 justify-center items-center h-fit p-4 md:h-[50%]'>
                    <span className=' text-sm md:text-base'>Question {currentQuizIndex + 1}: {currentQuiz?.name}</span>

                    <div key={currentQuiz?._id} className='flex  flex-col h-fit text-xs md:text-base md:h-60 w-full '>
                        {currentQuiz?.options.map((option, index) => (
                            <div key={index} className=' w-full flex gap-2 border items-center p-4  justify-start '>
                               
                                <input type='radio' onChange={(e) => handleChange(e, (option?.option))} name={currentQuizIndex} key={index} checked={answer[currentQuizIndex]===option?.option}  className='h-4 border-t flex items-center p-2 w-20 border-gray-900' value={option?.option} />

                                <span className=''>{option?.option}</span>
                            </div>
                        ))}
                    </div>

                    <div className='flex gap-4'>
                        <button onClick={handlePrevious} disabled={currentQuizIndex === 0} className='px-4 py-2 text-white text-sm md:text-base bg-gray-500 font-bold rounded-sm' type="button">Previous</button>
                        {currentQuizIndex === quizzes.length - 1 ? <button onClick={handleSubmit} className='px-4 py-2 text-white bg-red-500 font-bold rounded-sm'>submit</button>
                            : <button onClick={handleNext} disabled={currentQuizIndex === quizzes.length - 1} className='px-4 py-2 text-sm md:text-base text-white bg-cyan-500 font-bold rounded-sm' type="button">Next</button>}
                    </div>
                </div>
            )}
        </div>
    )
}

export default QuizPage
