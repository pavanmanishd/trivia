export default function Start(props){
    return (
        <div className="start">
            <h1 className="title">Quizzical</h1>
            <button className="start-button" onClick={props.start}>Start quiz</button>
        </div>
    )
}