import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [prevAnswer, setPrevAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuestion(e.target.elements.question.value);
    e.target.reset();
  };
  // function handleClearAnswer() {
  //   setPrevAnswer("");
  //   setAnswer("");
  // }
  useEffect(() => {
    const getAnswer = async () => {
      let response = await fetch(`http://127.0.0.1:8000/chatbot?q=${question}`);
      response = await response.json();
      setAnswer(response.answers);
      setPrevAnswer((prev) => prev + "\n\n\r" + answer);
    };
    question !== "" && getAnswer();
    setQuestion("");
  }, [question]);

  return (
    <>
      <nav class="nav__continer">
        <h1>My ChatGpt</h1>
      </nav>
      <div className="continer">
        <div className="container-answer">
          <pre className="answer-area">
            {prevAnswer}
            <br />
            {answer}
          </pre>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="question-form">
            <input
              placeholder="write your question ?"
              name="question"
              type="text"
            />
            <input type="submit" value="Ask" />
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
