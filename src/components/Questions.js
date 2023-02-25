import React from "react"
import {nanoid} from "nanoid"
export default function Questions(){

    const [allQuestions, setAllQuestions] = React.useState([])
    const [questions, setQuestions] = React.useState([])

    React.useEffect(function(){
        fetch("https://opentdb.com/api.php?amount=10&category=18&type=multiple")
        .then(res => res.json())
        .then(data => setAllQuestions(data.results))

        console.log("allquestions : "+allQuestions)

        setQuestions(allQuestions.map(question => {
            const options = question.incorrect_answers
            const correct_ans_index = Math.floor(Math.random() * 4)
            console.log(options)
            console.log(correct_ans_index)
            return(
                <div className="question" key={nanoid()} >
                    <h4>{question.question}</h4>
                    {/* {options.map(option => {
                        return (
                            <div className="option">
                                {option}
                            </div>    
                        )
                    })} */}
                </div>
            )
    }))},[])
    // console.log(allQuestions)
    console.log(questions)
    return(
        <div>
            {questions}
        </div>
    )

}