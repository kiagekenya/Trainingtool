import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./QuizPage.css";
import { UserContext } from "../../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons"; // For solid star icon

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
  const [incorrectQuestions, setIncorrectQuestions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [isRetaking, setIsRetaking] = useState(false);
  const [quizCompletionStatus, setQuizCompletionStatus] = useState({});
  const { user } = useContext(UserContext);
  const [QuizzesCompleted, setQuizzesCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContentsAndUserData = async () => {
      try {
        const contentsResponse = await fetch("/api/contents");
        if (!contentsResponse.ok)
          throw new Error("Network response was not ok");
        const contentsData = await contentsResponse.json();

        const userDataResponse = await fetch(
          `/api/userQuizData?email=${user.email}`
        );
        if (!userDataResponse.ok)
          throw new Error("Failed to fetch user quiz data");
        const userData = await userDataResponse.json();

        setContents(contentsData);
        setPassedQuizzes(userData.completedQuizIds);
        setQuizCompletionStatus(userData.quizCompletionStatus);

        // Check if all quizzes are completed
        const allCompleted = contentsData.every((content) =>
          userData.completedQuizIds.includes(content._id)
        );
        setQuizzesCompleted(allCompleted); // Use the setter function

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (user && user.email) {
      fetchContentsAndUserData();
    }
  }, [user]);
  // const [allQuizzesCompleted, setAllQuizzesCompleted] = useState(false); // Fix the state declaration

  useEffect(() => {
    if (selectedQuiz) {
      setQuizLoading(true);
      fetch(`/api/quiz/${selectedQuiz}`)
        .then((response) => response.json())
        .then((data) => {
          setContent(data);
          setTotalQuestions(data.questions.length);
          const quizStatus = quizCompletionStatus[selectedQuiz];
          if (quizStatus && quizStatus.completed) {
            setIsQuizCompleted(true);
            setScore(quizStatus.score);
            setQuizAnswers(quizStatus.answers);
            setShowResults(true);
            setIsSubmitted(true);
            identifyIncorrectQuestions(quizStatus.answers, data.questions);
          } else {
            resetQuizState();
          }
          setQuizLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching quiz content:", error);
          setQuizError(error.message);
          setQuizLoading(false);
        });
    }
  }, [selectedQuiz, quizCompletionStatus]);

  const resetQuizState = () => {
    setIsQuizCompleted(false);
    setScore(0);
    setQuizAnswers({});
    setShowResults(false);
    setIsSubmitted(false);
    setIncorrectQuestions([]);
    setIsRetaking(false);
  };

  const identifyIncorrectQuestions = (answers, questions) => {
    const incorrect = questions.reduce((acc, question, index) => {
      if (answers[index] !== question.correctAnswer) {
        acc.push(index);
      }
      return acc;
    }, []);
    setIncorrectQuestions(incorrect);
  };

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
    if (
      !isRetaking ||
      (isRetaking && incorrectQuestions.includes(questionIndex))
    ) {
      setQuizAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionIndex]: optionIndex,
      }));
    }
  };

  const handleSubmitQuiz = (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    if (Object.keys(quizAnswers).length !== totalQuestions) {
      alert("Please answer all questions before submitting.");
      return;
    }

    fetch(`/api/quiz/${selectedQuiz}/results?email=${user.email}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quizAnswers),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Received data from server:", data);
        setScore(data.score);
        setTotalQuestions(data.totalQuestions);
        setAnswerFeedback(data.feedback);
        setShowResults(true);
        setIsSubmitted(true);
        setIsRetaking(false);
        setIsQuizCompleted(true);

        identifyIncorrectQuestions(quizAnswers, content.questions);

        // Update local quiz completion status
        setQuizCompletionStatus((prevStatus) => ({
          ...prevStatus,
          [selectedQuiz]: {
            completed: true,
            score: data.score,
            answers: quizAnswers,
          },
        }));

        if (data.score === data.totalQuestions) {
          setPassedQuizzes((prevPassedQuizzes) => [
            ...prevPassedQuizzes,
            selectedQuiz,
          ]);
        } // Scroll to the results section
        const resultsElement = document.querySelector(".quiz-results");
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: "smooth" });
        }
      })
      .catch((error) => {
        console.error("Error submitting quiz:", error);
        alert("There was an error submitting your quiz. Please try again.");
      });
  };

  const handleRetakeIncorrectQuestions = () => {
    setIsRetaking(true);
    setIsSubmitted(false);
    setShowResults(false);
    // Keep the correct answers and reset only the incorrect ones
    const newQuizAnswers = { ...quizAnswers };
    incorrectQuestions.forEach((index) => {
      delete newQuizAnswers[index];
    });
    setQuizAnswers(newQuizAnswers);
  };

  const resultsElement = document.querySelector(".quiz-results");
  if (resultsElement) {
    resultsElement.scrollIntoView({ behavior: "smooth" });
  }
  useEffect(() => {
    if (isSubmitted) {
      const resultsElement = document.querySelector(".quiz-results");
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [isSubmitted]);
  const renderQuizContent = () => {
    return (
      <div>
        <form id="quizForm" onSubmit={handleSubmitQuiz}>
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
                          onChange={() =>
                            handleAnswerChange(index, optionIndex)
                          }
                          disabled={
                            (isSubmitted && !isRetaking) ||
                            (isRetaking && !incorrectQuestions.includes(index))
                          }
                        />
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
                {(isSubmitted ||
                  (isRetaking && !incorrectQuestions.includes(index))) && (
                  <div
                    className={`feedback ${
                      quizAnswers[index] === question.correctAnswer
                        ? "correct"
                        : "incorrect"
                    }`}
                  >
                    {quizAnswers[index] === question.correctAnswer ? (
                      <>
                        <span style={{ fontSize: "14px", color: "green" }}>
                          &#10004;
                        </span>
                        <span
                          style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            marginLeft: "10px",
                          }}
                        >
                          Correct
                        </span>
                      </>
                    ) : (
                      <>
                        <span style={{ fontSize: "14px", color: "red" }}>
                          &#10006;
                        </span>
                        <span
                          style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            marginLeft: "10px",
                          }}
                        >
                          Incorrect
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}{" "}
          {(!isSubmitted || isRetaking) && (
            <button type="button" onClick={handleSubmitQuiz}>
              {isRetaking ? "Resubmit" : "Submit"}
            </button>
          )}
        </form>

        {isSubmitted && !isRetaking && (
          <div className="quiz-results">
            <h3>Results:</h3>
            <p>
              Score: {score} / {totalQuestions}
            </p>
            {renderCompletionMessage()}
            {incorrectQuestions.length > 0 && (
              <button type="button" onClick={handleRetakeIncorrectQuestions}>
                Retake Quiz
              </button>
            )}
            <button type="button" onClick={handleHomeClick}>
              Home
            </button>
          </div>
        )}
      </div>
    );
  };
  const handleRetakeQuiz = () => {
    setIsRetaking(true);
    setShowResults(false);
    setIsSubmitted(false);
    setAnswerFeedback({});
    // Reset answers only for incorrect questions
    const newQuizAnswers = { ...quizAnswers };
    incorrectQuestions.forEach((index) => {
      delete newQuizAnswers[index];
    });
    setQuizAnswers(newQuizAnswers);
  };

  const handleCloseAlertModal = () => {
    setShowAlertModal(false);
  };

  const renderContentWithImages = (body, images) => {
    // Define the headings and subheadings you want to style
    const headingsToStyle = [
      "i.Upstream",
      "iii.Downstream",
      "ii.Midstream",
      "Upstream Sector Overview",
      "1.Mature source rock",
      "2.Migration path",
      "3.Reservoir rock",
      "4.Seal (Cap rock)",
      "5.Trap",
      "1.Recovery Factor",
      "2.Estimated Ultimate Recovery (EUR)",
      "3.Proved reserves",
      "4.Probable Reserves",
      "5.Possible Reserves",
      "Questions",
    ]; // Add more headings as needed
    const subheadingsToStyle = [
      "Step 1: Signing a Lease Agreement",
      "Step 2: Gathering Exploration Data",
      "Step 3: Exploratory Drilling",
      "Step 4: Appraisal and Development Drilling",
      "Step 5: Completing Wells",
      "Step 6: Producing",
      "Step 7: Plugging and Abandoning",
      "i. Geology",
      "ii. Geophysics",
      "iii. Geochemistry",
      "iv. Petroleum Engineering",
      "i. Gravity surveys",
      "ii. Magnetic surveys",
      "iii. Seismic surveys",
      "iv. Magnetotelluric and Time Domain surveys",
      "i. Proved developed oil and gas reserves",
      "ii. Proved undeveloped reserves",
    ]; // Add more subheadings as needed
    const topicsToStyle = [
      "Primary Disciplines in Petroleum Exploration and Production",
      "Exploration Methods:",
      "The Petroleum System",
      "Overview of an Oil and Gas Reservoir",
    ];

    // Function to replace and style headings
    const styleHeadings = (text) => {
      headingsToStyle.forEach((heading) => {
        const regex = new RegExp(`\\b${heading}\\b`, "g");
        text = text.replace(
          regex,
          `<div class="clearfix-heading"><span class="styled-heading">${heading}</span></div>`
        );
      });
      return text;
    };

    // Function to replace and style subheadings
    const styleSubheadings = (text) => {
      subheadingsToStyle.forEach((subheading) => {
        const regex = new RegExp(`\\b${subheading}\\b`, "g");
        text = text.replace(
          regex,
          `<div class="clearfix-heading"><span class="styled-subheading">${subheading}</span></div>`
        );
      });
      return text;
    };

    // test
    // Function to replace and style subheadings
    const styleTopics = (text) => {
      topicsToStyle.forEach((topic) => {
        const regex = new RegExp(`\\b${topic}\\b`, "g");
        text = text.replace(
          regex,
          `<div class="clearfix-heading"><span class="styled-topics">${topic}</span></div>`
        );
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

  const renderCompletionMessage = () => {
    return (
      <>
        {score === totalQuestions && (
          <div className="completion-message">
            <h3>Congratulations!</h3>
            <p>You've completed this quiz</p>
            <div className="badge">
              <span role="img" aria-label="trophy">
                🏆
              </span>
            </div>
          </div>
        )}
      </>
    );
  };

  const AchievementBadge = () => {
    return (
      <div className="achievement-badge">
        <h2>🎉 Congratulations! 🎉</h2>
        <p>You have completed all quizzes!</p>

        <div className="badge">
          {/* <img src="/path/to/badge.png" alt="Achievement Badge" /> */}

          {/* <FontAwesomeIcon icon={fasStar} style={{ color: "black" }} /> */}
          <FontAwesomeIcon
            icon={fasStar}
            size="xl"
            style={{ color: "balck" }}
          />
          <FontAwesomeIcon
            icon={fasStar}
            size="xl"
            style={{ color: "balck" }}
          />
          <FontAwesomeIcon
            icon={fasStar}
            size="xl"
            style={{ color: "balck" }}
          />
          <FontAwesomeIcon
            icon={fasStar}
            size="xl"
            style={{ color: "balck" }}
          />
          <FontAwesomeIcon
            icon={fasStar}
            size="xl"
            style={{ color: "balck" }}
          />
        </div>
      </div>
    );
  };

  const handleHomeClick = () => {
    navigate("/home");
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div className="loader">
        <span className="loader-text">loading</span>
        <span className="load"></span>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const progressPercentage = (passedQuizzes.length / contents.length) * 100;
  const allQuizzesCompleted =
    contents.length > 0 && passedQuizzes.length === contents.length;

  return (
    <div className="quiz">
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${progressPercentage}%` }}
        >
          <span>{`${Math.round(progressPercentage)}% Completed`}</span>
        </div>
      </div>
      <ul>
        {contents.map((contentItem, index) => (
          <li key={contentItem._id}>
            <button
              className="quiz-btn"
              onClick={() => toggleQuiz(contentItem._id, index)}
              disabled={
                index > 0 && !passedQuizzes.includes(contents[index - 1]._id)
              }
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
                  <div className="loaderquiz"></div>
                ) : quizError ? (
                  <div>Error: {quizError}</div>
                ) : (
                  content && (
                    <div className="notes">
                      <h2>{content.title}</h2>
                      <p>
                        {renderContentWithImages(content.body, content.images)}
                      </p>
                      <br />
                      {renderQuizContent()}
                    </div>
                  )
                )}
              </div>
            )}
          </li>
        ))}
        {/* Display achievement badge if all quizzes are completed */}
      </ul>
      {QuizzesCompleted && <AchievementBadge />}
      {allQuizzesCompleted && (
        <div className="completion-message">
          <h2>Well Done! All Completed</h2>
          <button type="button" onClick={handleHomeClick}>
            Home
          </button>
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
