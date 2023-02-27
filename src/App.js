import React from "react";
import Start from "./components/Start";
import Questions from "./components/Questions";

function App() {

  const [play, setPlay] = React.useState(false)
  const [num,setNum] = React.useState("5")
  function number(val){
      setNum(val)
  }
  function start() {
    setPlay(prevPlay => !prevPlay)
  }
  return (
    <div className="page">
      {!play && <Start start={start} number={(val)=>number(val)} />}
      {play && <Questions num={num} />}
    </div>
  );
}

export default App;
