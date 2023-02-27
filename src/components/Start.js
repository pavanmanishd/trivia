import React from "react"
export default function Start(props) {
    const [number, setNumber] = React.useState("5")
    function handleChange(event){
        props.number(event.target.value)
        setNumber(event.target.value)
    }
    return (

        <div className="start">
            <h1 className="title">Quizzical</h1>
            <form action="">
                <label htmlFor="number">Number of Questions (Default : 5) : </label>
                <input
                    type="number"
                    id="number" 
                    onChange={handleChange}
                    name="number"
                    value={number}
                />
            </form>
            <button className="button" onClick={props.start}>Start quiz</button>
        </div>
    )
}