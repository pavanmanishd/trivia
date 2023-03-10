import Parser from "html-react-parser"
import React from "react"

export default function Question(props) {

    const [selected, setSelected] = React.useState("")
    
    React.useEffect(()=>{
        props.selected_option({
            id : props.id,
            qNo : props.questionNo,
            question: props.item.question,
            correct: props.answer_index,
            choosen: "",
            options: props.options
        })
    },[])

    function handleClick(id) {
        const element = document.getElementById(id)
        if (selected === "") {
            element.classList.add("selected")
            setSelected(id)
            props.selected_option({
                id : id,
                qNo : props.questionNo,
                question: props.item.question,
                correct: props.answer_index,
                choosen: id.slice(-1),
                options: props.options
            })
        }
        // element.classList.add("selected")
        else if (selected === id) {
            element.classList.remove("selected")
            setSelected("")
            props.selected_option({
                id : id,
                qNo : props.questionNo,
                question: props.item.question,
                correct: props.answer_index,
                choosen: "",
                options: props.options
            })
        }
        else {
            document.getElementById(selected).classList.remove("selected")
            element.classList.add("selected")
            setSelected(id)
            props.selected_option({
                id : id,
                qNo : props.questionNo,
                question: props.item.question,
                correct: props.answer_index,
                choosen: id.slice(-1),
                options: props.options
            })
        }
    }
    // console.log(selected.slice(-1))
    return (
        <div className="question">
            <p className="q">{props.questionNo}. {Parser(props.item.question)}</p>
            <div className="options">
                <button id={props.id + "0"} onClick={() => handleClick(props.id + "0")} className="button" >a) {Parser(props.options[0])}</button>
                <button id={props.id + "1"} onClick={() => handleClick(props.id + "1")} className="button" >b) {Parser(props.options[1])}</button>
                <button id={props.id + "2"} onClick={() => handleClick(props.id + "2")} className="button" >c) {Parser(props.options[2])}</button>
                <button id={props.id + "3"} onClick={() => handleClick(props.id + "3")} className="button" >d) {Parser(props.options[3])}</button>
            </div>
        </div>
    )
}