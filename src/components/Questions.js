import React from "react"
import { nanoid } from "nanoid"
import Question from "./Question"
import Parser from "html-react-parser"
export default function Questions() {
    const [checkAnswers, setCheckAnswers] = React.useState(false)
    const [allQuestions, setAllQuestions] = React.useState([])
    const [highScore, setHighScore] = React.useState(
        () => JSON.parse(localStorage.getItem("TriviahighScore")) || 0
    )
    const [questions, setQuestions] = React.useState()
    const [finalOptions, setFinalOptions] = React.useState([])
    const [score, setScore] = React.useState(0)
    const [answers, setAnswers] = React.useState()
    const [showOptions, setShowOptions] = React.useState(false)
    console.log(finalOptions)

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&category=18&type=multiple")
            .then(res => res.json())
            .then(data => setAllQuestions(data.results))
    }, [])

    function select(val) {
        setFinalOptions(prevState => {
            const s = prevState.filter(item => item.question !== val.question)
            s.push(val)            
            return s
        })
    }

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
                    questionNo={questionNo++}
                    id={id}
                    item={item}
                    options={incorrect_answers}
                    answer_index={index}
                    selected_option={(val) => select(val)}
                />
            )
        }))
    }, [allQuestions])

    // React.useEffect(() => {
        
    // }, [checkAnswers])
    const sorter = (a, b) => a.qNo > b.qNo ? 1 : -1;
    function calcScore() {
        finalOptions.map(option => {
            if (option.choosen == option.correct) {
                setScore(prevScore => prevScore + 1)
            }
            return option
        })
        setCheckAnswers(true)
        setFinalOptions(prevState => {
            let a = prevState
            a.sort(sorter)
            return a
        })
        
    }

    function checkOptions(){
        setShowOptions(prevState => !prevState)
        setAnswers(finalOptions.map(item => {
            return (
                <div>
                    <p className="q" >{item.qNo}. {Parser(item.question)}</p>
                    <div className="options">
                        <div id={`${item.id}00`} className="button"  >a).{Parser(item.options[0])}</div>
                        <div id={`${item.id}10`} className="button"  >b).{Parser(item.options[1])}</div>
                        <div id={`${item.id}20`} className="button"  >c).{Parser(item.options[2])}</div>
                        <div id={`${item.id}30`} className="button"  >d).{Parser(item.options[3])}</div>
                    </div>
                </div>
            )
        }))
    }

    React.useEffect(()=>{
        finalOptions.map(item => {    
            if(item.choosen !== ""){
                document.getElementById(`${item.id+item.correct}0`).classList.add("correct")
                document.getElementById(`${item.id+item.choosen}0`).classList.add("choosen")
            }                
            else{
                document.getElementById(`${item.id+item.correct}0`).classList.add("correct-notchoosen")
            }
    })
    },[answers])


    function restart() {
        window.location.reload()
    }

    React.useEffect(() => {
        if (checkAnswers && highScore < score) {
            localStorage.setItem("TriviahighScore", JSON.stringify(score))
            setHighScore(score)
        }
    }, [checkAnswers])



    return (
        <div>
            {checkAnswers && <div className="score-page">
                <h1 className="score">Score : {score}</h1>
                <h1 className="score">highScore : {highScore}</h1>
                {!showOptions && <button className="button" onClick={checkOptions}>Check Answers</button>}

                <button className="button" onClick={restart}>Restart</button>
                {showOptions && answers}
            </div>}
            {!checkAnswers && <div className="questions-page">
                {questions}
                <button className="button checkAns" onClick={calcScore}>Check Answers</button>
            </div>}
        </div>
    )

}