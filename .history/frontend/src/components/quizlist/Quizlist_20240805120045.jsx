import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./QuizPage.css";
import { UserContext } from "../../contexts/UserContext";

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
  const [passedQuizzes, setPassedQuizzes] = useState([]);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchContentsAndUserData = async () => {
      try {
        const contentsResponse = await fetch("/api/contents");
        if (!contentsResponse.ok) throw new Error("Network response was not ok");
        const contentsData = await contentsResponse.json();

        const userDataResponse = await fetch(`/api/userQuizData?email=${user.email}`);
        if (!userDataResponse.ok) throw new Error("Failed to fetch user quiz data");
        const userData = await userDataResponse.json();

        setContents(contentsData);
        setPassedQuizzes(userData.completedQuizIds);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchContentsAndUserData();
  }, [user.email]);

  useEffect(() => {
    if (selectedQuiz) {
      setQuizLoading(true);
      fetch(`/api/quiz/${selectedQuiz}`)
        .then((response) => response.json())
        .then((data) => {
          setContent(data);
          setTotalQuestions(data.questions.length);
          setIsQuizCompleted(passedQuizzes.includes(selectedQuiz));
          setQuizLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching quiz content:", error);
          setQuizError(error.message);
          setQuizLoading(false);
        });
    }
  }, [selectedQuiz, passedQuizzes]);

  const toggleQuiz = (id, index) => {
    if (index > 0 && !passedQuizzes.includes(contents[index - 1]._id)) {
      setShowAlertModal(true);
      return;
    }

    if (selectedQuiz === id) {
      setSelectedQuiz(null);
      setShowResults(false);
      setQuizAnswers({});
      setIsSubmitted(false);
    } else {
      setSelectedQuiz(id);
      setShowResults(false);
      setQuizAnswers({});
      setIsSubmitted(false);
    }
    setAnswerFeedback({});
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quizAnswers),
    })
      .then((response) => response.json())
      .then((data) => {
        setScore(data.score);
        setAnswerFeedback(data.feedback);
        setShowResults(true);
        setIsSubmitted(true);
        if (data.score === totalQuestions) {
          setPassedQuizzes((prevPassedQuizzes) => [...prevPassedQuizzes, selectedQuiz]);
        }
      })
      .catch((error) => console.error("Error submitting quiz:", error));
  };

  const handleRetakeQuiz = () => {
    setQuizAnswers({});
    setShowResults(false);
    setIsSubmitted(false);
    setAnswerFeedback({});
  };

  const handleCloseAlertModal = () => {
    setShowAlertModal(false);
  };

  const renderContentWithImages = (body, images) => {
    // Define the headings and subheadings you want to style
    const headingsToStyle = ["i.Upstream", "iii.Downstream", "ii.Midstream", "1.Mature source rock", "2.Migration path", 
      "3.Reservoir rock", "4.Seal (Cap rock)", "5.Trap", "1.Recovery Factor","2.Estimated Ultimate Recovery (EUR)", "3.Proved reserves",
    "4.Probable Reserves", "5.Possible Reserves"]; // Add more headings as needed
    const subheadingsToStyle = ["Step 1: Signing a Lease Agreement", "Step 2: Gathering Exploration Data", "Step 3: Exploratory Drilling",
       "Step 4: Appraisal and Development Drilling", "Step 5: Completing Wells", "Step 6: Producing", "Step 7: Plugging and Abandoning",
        "i.Geology", "ii.Geophysics", "iii.Geochemistry", "iv.Petroleum Engineering", "i.Gravity surveys","ii.Magnetic surveys", "iii.Seismic surveys", "iv.Magnetotelluric and Time Domain surveys"
      , "i.Proved developed oil and gas reserves", "ii.Proved undeveloped reserves"]; // Add more subheadings as needed
    const topicsToStyle = [ "Upstream Sector Overview", "Primary Disciplines in Petroleum Exploration and Production",
      "Exploration Methods:", "The Petroleum System", "Overview of an Oil and Gas Reservoir"
    ];


    // Function to replace and style headings
    const styleHeadings = (text) => {
      headingsToStyle.forEach((heading) => {
        const regex = new RegExp(`\\b${heading}\\b`, "g");
        text = text.replace(regex, `<span class="styled-heading">${heading}</span>`);
      });
      return text;
    };
  
    // Function to replace and style subheadings
    const styleSubheadings = (text) => {
      subheadingsToStyle.forEach((subheading) => {
        const regex = new RegExp(`\\b${subheading}\\b`, "g");
        text = text.replace(regex, `<span class="styled-subheading">${subheading}</span>`);
      });
      return text;
    };
  
    // test
// Function to replace and style subheadings
const styleTopics = (text) => {
  topicsToStyle.forEach((topic) => {
    const regex = new RegExp(`\\b${topic}\\b`, "g");
    text = text.replace(regex, `<span class="styled-topics">${topic}</span>`);
  });
  return text;
};

    // Split the content into parts and apply styles
    const parts = body.split(/(\[images\d+\])/);
    return parts.map((part, index) => {
      const match = part.match(/\[images(\d+)\]/);
      if (match) {
        const imageIndex = parseInt(match[1], 10) - 1;
        const image = images[imageIndex];
  
        // Apply styles or classes based on imageIndex or image properties
        const imageClass = `image-style-${imageIndex}`;
  
        return (
          <img
            key={index}
            src={image.url}
            alt={image.alt}
            className={`content-image ${imageClass}`}
          />
        );
      }
      // Apply styles to the specified headings and subheadings
      let styledText = styleHeadings(part);
      styledText = styleSubheadings(styledText);
      styledText = styleTopics(styledText);
  
      return (
        <span
          key={index}
          dangerouslySetInnerHTML={{
            __html: styledText.replace(/\n/g, "<br />"),
          }}
        />
      );
    });
  };
  
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const progressPercentage = (passedQuizzes.length / contents.length) * 100;
  const allQuizzesCompleted = passedQuizzes.length === contents.length;

  return (
    <div className="quiz">
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progressPercentage}%` }}>
          <span>{`${Math.round(progressPercentage)}% Completed`}</span>
        </div>
      </div>
      <ul>
        {contents.map((contentItem, index) => (
          <li key={contentItem._id}>
            <button
              className="quiz-btn"
              onClick={() => toggleQuiz(contentItem._id, index)}
              disabled={index > 0 && !passedQuizzes.includes(contents[index - 1]._id)}
            >
              {contentItem.title}
              {passedQuizzes.includes(contentItem._id) && (
                <span className="quiz-done">
                  &#10004; <button className="done-button">Done</button>
                </span>
              )}
            </button>
            {contentItem._id === selectedQuiz && (
              <div>
                {quizLoading ? (
                  <div>Loading quiz...</div>
                ) : quizError ? (
                  <div>Error: {quizError}</div>
                ) : (
                  content && (
                    <div className="notes"> 
                      <h2>{content.title}</h2>
                      <p>{renderContentWithImages(content.body, content.images)}</p>
                      <br />
                      <form id="quizForm">
                        {content.questions &&
                          content.questions.map((question, index) => (
                            <div key={index} className="question-block">
                              <h2>{question.text}</h2>
                              <div className="options">
                                {question.options.map((option, optionIndex) => (
                                  <div key={optionIndex} className="option">
                                    <label>
                                      <input
                                        type="radio"
                                        name={`question${index}`}
                                        value={optionIndex}
                                        checked={quizAnswers[index] === optionIndex}
                                        onChange={() => handleAnswerChange(index, optionIndex)}
                                        required
                                        disabled={isSubmitted}
                                      />
                                      {option}
                                    </label>
                                  </div>
                                ))}
                              </div>
                              {isSubmitted && (
                                <div
                                  className={`feedback ${
                                    quizAnswers[index] === question.correctAnswer
                                      ? "correct"
                                      : "incorrect"
                                  }`}
                                >
                                  {quizAnswers[index] === question.correctAnswer ? (
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
                        <button type="button" onClick={handleSubmitQuiz} disabled={isSubmitted || isQuizCompleted}>
                          {isSubmitted || isQuizCompleted ? "Submitted" : "Submit"}
                        </button>
                      </form>
                      {showResults && (
                        <div>
                          <h3>Results:</h3>
                          <p>
                            Score: {score} / {totalQuestions}
                          </p>
                          {score < totalQuestions && (
                            <button type="button" onClick={handleRetakeQuiz}>
                              Retake Quiz
                            </button>
                          )}
                          {score === totalQuestions && (
                            <Link to="/introduction">
                              <button type="button">Home</button>
                            </Link>
                          )}
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

      {allQuizzesCompleted && (
        <div className="completion-message">
          <h2>Well Done! All Completed</h2>
          <Link to="/home">
            <button className="home-button">Home</button>
          </Link>
        </div>
      )}

      {showAlertModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Access Restricted</h2>
            <p>You need to pass the previous quiz to access this one.</p>
            <button onClick={handleCloseAlertModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
