// components/ConfirmLogoutModal.js
import React from "react";
import Modal from "react-modal";

const ConfirmLogoutModal = ({ isOpen, onRequestClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirm Logout"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <div className="modal-box">
        <h2 className=" ">Are you sure you want to log out?</h2>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="btn-primary">
            Yes, Logout
          </button>
          <button onClick={onRequestClose} className="btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmLogoutModal;
