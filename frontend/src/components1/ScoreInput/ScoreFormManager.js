import React, { useState, useEffect } from "react";
import axios from "axios";
import InputForm from "./ScoreInput";
import "./ScoreInput.css";

export default function ScoreFormManager({
  categories,
  onScoresChange,
  initialScores,
}) {
  const [currentScores, setCurrentScores] = useState(
    initialScores?.currentScores ||
      Object.fromEntries(categories.map((cat) => [cat, 0]))
  );
  const [projectedScores, setProjectedScores] = useState(
    initialScores?.projectedScores ||
      Object.fromEntries(categories.map((cat) => [cat, 0]))
  );
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  // Call onScoresChange when initialScores or scores change
  useEffect(() => {
    if (initialScores) {
      onScoresChange({ currentScores, projectedScores });
    }
  }, [initialScores, currentScores, projectedScores, onScoresChange]);

  const handleScoreChange = (setter) => (e) => {
    const { name, value } = e.target;
    const val = Math.min(5, Math.max(0, parseInt(value) || 0));
    setter((prev) => ({ ...prev, [name]: val }));
  };

  const handleSendScores = async () => {
    setSending(true);
    setMessage("");

    const isValidScore = (val) =>
      typeof val === "number" && !isNaN(val) && val > 0 && val <= 5;

    const allCurrentFilled = Object.values(currentScores).every(isValidScore);
    const allProjectedFilled =
      Object.values(projectedScores).every(isValidScore);

    if (!allCurrentFilled || !allProjectedFilled) {
      setMessage("⚠️ Please fill in all fields with scores between 1 and 5.");
      setSending(false);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/scores`,
        { current: currentScores, projected: projectedScores },
        { withCredentials: true }
      );

      if (response.status === 201) {
        setMessage("✅ Scores submitted successfully!");
        onScoresChange({ currentScores, projectedScores });
      } else {
        setMessage("⚠️ Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting scores:", error.response?.data);
      const status = error.response?.status;

      if (status === 409) {
        setMessage("✅ Scores already submitted. Displaying your chart...");
        onScoresChange({ currentScores, projectedScores });
      } else {
        setMessage(
          status === 403
            ? "🚫 Session expired. Please log in again."
            : "❌ Error submitting scores. Try again."
        );

        if (status === 403) {
          window.location.href = "/login";
        }
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <InputForm
        title="CURRENT STATE (JUNE 2025)"
        scores={currentScores}
        onChange={handleScoreChange(setCurrentScores)}
        categories={categories}
      />
      <InputForm
        title="TARGET FOR 2027"
        scores={projectedScores}
        onChange={handleScoreChange(setProjectedScores)}
        categories={categories}
      />
      <div className="submit-section">
        <button
          className="modern-button send-btn"
          onClick={handleSendScores}
          disabled={sending}
        >
          {sending ? "Sending..." : "Submit Assessment"}
        </button>
        {message && <p className="status-message">{message}</p>}
      </div>
    </>
  );
}
