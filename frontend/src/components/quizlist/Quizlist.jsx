import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./QuizPage.css"; // Import your CSS file

const QuizPage = () => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizError, setQuizError] = useState(null);
  const [content, setContent] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answerFeedback, setAnswerFeedback] = useState({});

  useEffect(() => {
    fetch("/api/contents")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setContents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching contents:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedQuiz) {
      setQuizLoading(true);
      fetch(`/api/quiz/${selectedQuiz}`)
        .then((response) => response.json())
        .then((data) => {
          setContent(data);
          setTotalQuestions(data.questions.length);
          setQuizLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching quiz content:", error);
          setQuizError(error.message);
          setQuizLoading(false);
        });
    }
  }, [selectedQuiz]);

  const toggleQuiz = (id) => {
    if (selectedQuiz === id) {
      setSelectedQuiz(null); // Toggle off if already selected
      setShowResults(false); // Hide results when toggling off
      setQuizAnswers({}); // Clear previous answers
      setIsSubmitted(false); // Reset submission status
    } else {
      setSelectedQuiz(id); // Otherwise, select the clicked quiz
      setShowResults(false); // Hide results when selecting a new quiz
      setQuizAnswers({}); // Clear previous answers
      setIsSubmitted(false); // Reset submission status
    }
    setAnswerFeedback({}); // Clear answer feedback
  };

  const handleAnswerChange = (questionIndex, optionIndex) => {
    setQuizAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: optionIndex,
    }));
  };

  const handleSubmitQuiz = () => {
    if (Object.keys(quizAnswers).length !== totalQuestions) {
      alert("Please answer all questions before submitting.");
      return;
    }

    fetch(`/api/quiz/${selectedQuiz}/results`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quizAnswers),
    })
      .then((response) => response.json())
      .then((data) => {
        setScore(data.score);
        setAnswerFeedback(data.feedback);
        setShowResults(true);
        setIsSubmitted(true);
      })
      .catch((error) => console.error("Error submitting quiz:", error));
  };

  const handleRetakeQuiz = () => {
    setQuizAnswers({});
    setShowResults(false);
    setIsSubmitted(false);
    setAnswerFeedback({});
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Quiz List</h1>
      <ul>
        {contents.map((contentItem) => (
          <li key={contentItem._id}>
            <button onClick={() => toggleQuiz(contentItem._id)}>
              {contentItem.title}
            </button>
            {contentItem._id === selectedQuiz && (
              <div>
                {quizLoading ? (
                  <div>Loading quiz...</div>
                ) : quizError ? (
                  <div>Error: {quizError}</div>
                ) : (
                  content && (
                    <div>
                      <h2>{content.title}</h2>
                      <p>{content.body}</p>
                      <form id="quizForm">
                        {content.questions &&
                          content.questions.map((question, index) => (
                            <div key={index} className="question-block">
                              <p>{question.text}</p>
                              {question.options.map((option, optionIndex) => (
                                <label key={optionIndex}>
                                  <input
                                    type="radio"
                                    name={`question${index}`}
                                    value={optionIndex}
                                    checked={quizAnswers[index] === optionIndex}
                                    onChange={() =>
                                      handleAnswerChange(index, optionIndex)
                                    }
                                    required
                                    disabled={isSubmitted}
                                  />
                                  {option}
                                </label>
                              ))}
                              {isSubmitted && (
                                <div
                                  className={`feedback ${
                                    quizAnswers[index] ===
                                    question.correctAnswer
                                      ? "correct"
                                      : "incorrect"
                                  }`}
                                >
                                  {quizAnswers[index] ===
                                  question.correctAnswer ? (
                                    <>
                                      <span>&#10004;</span> Correct
                                    </>
                                  ) : (
                                    <>
                                      <span>&#10006;</span> Incorrect
                                    </>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        <button
                          type="button"
                          onClick={handleSubmitQuiz}
                          disabled={isSubmitted}
                        >
                          {isSubmitted ? "Submitted" : "Submit"}
                        </button>
                      </form>
                      {showResults && (
                        <div>
                          <h3>Results:</h3>
                          <p>
                            Score: {score} / {totalQuestions}
                          </p>
                          <button type="button" onClick={handleRetakeQuiz}>
                            Retake Quiz
                          </button>
                          <Link to="/home">
                            <button type="button">Home</button>
                          </Link>
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizPage;
