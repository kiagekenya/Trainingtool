// LogoutButton.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import ConfirmLogoutModal from "../ConfirmLogoutModal";

const LogoutButton = () => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const confirmLogout = async () => {
    await logout();
    closeModal();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <button onClick={openModal} className="btn-primary">
        Logout
      </button>
      <ConfirmLogoutModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        onConfirm={confirmLogout}
      />
    </>
  );
};

export default LogoutButton;
