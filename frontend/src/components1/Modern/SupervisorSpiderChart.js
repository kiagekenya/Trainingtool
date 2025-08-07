import React from "react";
import SpiderChart from "./SpiderChart";
import "./Modern.css";

const SupervisorSpiderChart = ({
  categories,
  currentScores,
  projectedScores,
  supervisorScores,
  status,
  approvalComments,
  approvedBy,
  approvedAt,
  committed,
  onCommitToggle,
}) => {
  return (
    <div className="supervisor-chart-container">
      <div className="review-header">
        <h3 className="review-title">Supervisor's Assessment</h3>
        <div className={`status-indicator status-${status.toLowerCase()}`}>
          Status: {status}
        </div>
      </div>
      <div className="progress-bar">
        <div
          className={`progress-fill status-${status.toLowerCase()}`}
          style={{
            width:
              status === "Approved"
                ? "100%"
                : status === "Rejected"
                ? "50%"
                : "25px",
          }}
        />
      </div>
      <div className="chart-transition">
        <SpiderChart
          currentScores={currentScores}
          projectedScores={projectedScores}
          supervisorScores={supervisorScores}
          categories={categories}
        />
        <div className="chart-legend">
          <div className="legend-item">
            <span className="legend-circle current-color" />
            <span>Current Scores</span>
          </div>
          <div className="legend-item">
            <span className="legend-circle projected-color" />
            <span>Projected Scores</span>
          </div>
          <div className="legend-item">
            <span className="legend-circle supervisor-color" />
            <span>Supervisor Ratings</span>
          </div>
        </div>
      </div>
      <div className="review-details">
        {approvalComments && (
          <div className="comments-section">
            <p className="comments-label">Supervisor Comments:</p>
            <p className="comments-text">{approvalComments}</p>
          </div>
        )}
        {approvedBy && approvedAt && (
          <p className="review-meta">
            Reviewed by {approvedBy} on{" "}
            {new Date(approvedAt).toLocaleDateString()}
          </p>
        )}
        {/* <div className="commit-toggle">
          <label className="commit-label">
            On My Way!
            <input
              type="checkbox"
              checked={committed}
              onChange={onCommitToggle}
            />
            <span className="commit-slider" />
          </label>
        </div> */}
      </div>
    </div>
  );
};

export default SupervisorSpiderChart;
