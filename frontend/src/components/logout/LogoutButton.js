import React, { useState } from "react";
import { useLogout } from "../../contexts/LogoutContext";
import ConfirmLogoutModal from "../ConfirmLogoutModal";

const LogoutButton = () => {
  const { handleLogout } = useLogout();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const confirmLogout = () => {
    handleLogout();
    closeModal();
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
