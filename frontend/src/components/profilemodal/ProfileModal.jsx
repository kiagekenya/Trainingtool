
import React from "react";
import "./ProfileModal.css";

const ProfileModal = ({ teacher, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>{teacher.name}</h2>
        <p><strong>Position:</strong> {teacher.position}</p>
        <p><strong>Total Topics:</strong> {teacher.topics}</p>
        <p><strong>Total Likes:</strong> {teacher.likes}</p>
        <h3>Academic Qualifications:</h3>
        <ul>
          {teacher.academicQualifications.map((qualification, index) => (
            <li key={index}>{qualification}</li>
          ))}
        </ul>
        <h3>Professional Qualifications:</h3>
        <ul>
          {teacher.professionalQualifications.map((qualification, index) => (
            <li key={index}>{qualification}</li>
          ))}
        </ul>
        <h3>Career Experience:</h3>
        <p>{teacher.careerExperience}</p>
      </div>
    </div>
  );
};

export default ProfileModal;
