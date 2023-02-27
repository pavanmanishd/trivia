import React from "react"
import { nanoid } from "nanoid"
import Question from "./Question"

export default function Questions() {
    const [checkAnswers, setCheckAnswers] = React.useState(false)
    const [allQuestions, setAllQuestions] = React.useState([])
    const [highScore, setHighScore] = React.useState(
        () => JSON.parse(localStorage.getItem("highScore")) || 0
    )

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&category=18&type=multiple")
            .then(res => res.json())
            .then(data => setAllQuestions(data.results))
    }, [])

    const [finalOptions, setFinalOptions] = React.useState([])
    console.log("finalOptions");
    console.log(finalOptions)
    function select(val) {
        setFinalOptions(prevState => {
            const s = prevState.filter(item => item.question !== val.question)
            s.push(val)
            return s
        })
    }
    const [questions, setQuestions] = React.useState()

    React.useEffect(() => {
        let questionNo = 1
        setQuestions(allQuestions.map(item => {
            const id = nanoid()
            const incorrect_answers = item.incorrect_answers
            const correct_answer = item.correct_answer

            const index = Math.floor(Math.random() * 4)
            incorrect_answers.splice(index, 0, correct_answer)
            return (
                <Question
                    key={id}
                    questionNo = {questionNo++}
                    id={id}
                    item={item}
                    options={incorrect_answers}
                    answer_index={index}
                    selected_option={(val) => select(val)}
                />
            )
        }))
    }, [allQuestions])
    const [score, setScore] = React.useState(0)
    function calcScore() {
        finalOptions.map(option => {
            if (option.choosen == option.correct) {
                setScore(prevScore => prevScore + 1)
            }
            return option
        })
        setCheckAnswers(true)
    }

    function restart() {
        window.location.reload()
    }

    React.useEffect(() => {
        if (checkAnswers && highScore < score) {
            localStorage.setItem("highScore", JSON.stringify(score))
            setHighScore(score)
            //   setScore(0)
        }
    }, [checkAnswers])

    return (
        <div>
            {!checkAnswers && <div className="questions-page">
                {questions}
                <button className="button checkAns" onClick={calcScore}>Check Answers</button>
            </div>}
            {checkAnswers && <div className="score-page">
                <h1 className="score">Score : {score}</h1>
                <h1 className="score">highScore : {highScore}</h1>
                <button className="button" onClick={restart}>Restart</button>
            </div>}
        </div>
    )

}