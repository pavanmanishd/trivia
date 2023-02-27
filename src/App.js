import React from "react";
import Start from "./components/Start";
import Questions from "./components/Questions";

function App() {

  const [play, setPlay] = React.useState(false)

  function start() {
    setPlay(prevPlay => !prevPlay)
  }

  return (
    <div className="page">
      {!play && <Start start={start} />}
      {play && <Questions />}
    </div>
  );
}

export default App;
