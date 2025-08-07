import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import LOGO from "../../assets/nock j.png";

const Card = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [text, setText] = useState("");
  const [showLogo, setShowLogo] = useState(false);
  const navigate = useNavigate();
  const fullText = "COMPETENCY MAPPING";

  useEffect(() => {
    // Show logo immediately
    setShowLogo(true);

    // Start typing animation after a brief delay
    const typingTimer = setTimeout(() => {
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < fullText.length) {
          setText(fullText.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 150); // Typing speed (ms per letter)
    }, 1000); // Delay before typing starts

    // Redirect after all animations complete
    const redirectTimer = setTimeout(() => {
      setIsVisible(false);
      navigate("/login");
    }, 5000);

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(redirectTimer);
    };
  }, [navigate, fullText]);

  return (
    <StyledWrapper isVisible={isVisible} showLogo={showLogo} text={text}>
      <div className="card">
        <div className="border" />
        <div className="content">
          <div className="logo-container">
            {showLogo && (
              <>
                <img className="logo-icon" src={LOGO} alt="logo" />
                <span className="text">{text}</span>
                <span className="cursor">|</span>
              </>
            )}
          </div>
          <span className="trail" />
        </div>
        <span className="card-bottom-text">WWW.NOCKLEARNING.CO.KE</span>
      </div>
    </StyledWrapper>
  );
};

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const StyledWrapper = styled.div`
  .card {
    width: 100vw;
    height: 100vh;
    background: black;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    transition: opacity 0.5s ease-in-out;
    opacity: ${(props) => (props.isVisible ? 1 : 0)};
    z-index: ${(props) => (props.isVisible ? 1000 : -1000)};
  }

  .logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    transition: all 0.5s ease-in-out;
    
    @media (min-width: 768px) {
      flex-direction: row;
    }
  }

  .logo-icon {
    height: 120px;
    width: 120px;
    border-radius: 50%;
    margin-right: 0;
    margin-bottom: 20px;
    transition: all 0.3s ease-out;
    animation: ${fadeIn} 0.5s ease-out forwards;
    opacity: ${(props) => (props.showLogo ? 1 : 0)};
    
    @media (min-width: 768px) {
      height: 200px;
      width: 200px;
      margin-right: ${(props) => (props.text ? "15px" : "0")};
      margin-bottom: 0;
    }
  }

  .text {
    font-weight: bold;
    font-size: 1.2rem;
    color: white;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
    vertical-align: middle;
    min-width: 0;
    transition: all 0.3s ease-out;
    text-align: center;
    
    @media (min-width: 768px) {
      font-size: 2rem;
      text-align: left;
    }
  }

  .cursor {
    animation: ${blink} 1s step-end infinite;
    font-size: 1.2rem;
    color: white;
    margin-left: 2px;
    opacity: ${(props) => (props.text === "COMPETENCY MAPPING" ? 0 : 1)};
    transition: opacity 0.3s ease-out;
    
    @media (min-width: 768px) {
      font-size: 2rem;
    }
  }

  .card-bottom-text {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.8rem;
    text-transform: uppercase;
    color: white;
    background: transparent;
    opacity: 0;
    letter-spacing: 3px;
    transition: all 0.7s ease-in-out;
    text-align: center;
    width: 90%;
    
    @media (min-width: 768px) {
      font-size: 1.5rem;
      letter-spacing: 10px;
      width: auto;
      bottom: 30px;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.7s ease-in-out;
    width: 90%;
    max-width: 800px;
  }

  .trail {
    position: absolute;
    right: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(
      90deg,
      rgba(189, 159, 15, 0) 90%,
      rgba(189, 159, 0, 0) 100%
    );
    opacity: 0;
    transition: all 0.7s ease-in-out;
  }

  .card:hover .border {
    opacity: 1;
    transform: rotate(0deg);
  }

  .card:hover .card-bottom-text {
    opacity: 1;
    letter-spacing: 15px;
    
    @media (max-width: 767px) {
      letter-spacing: 5px;
    }
  }

  /* Mobile-specific adjustments */
  @media (max-width: 767px) {
    .logo-container {
      flex-direction: column;
      text-align: center;
    }
    
    .text {
      white-space: normal;
      word-break: break-word;
      max-width: 90%;
    }
    
    .card-bottom-text {
      font-size: 0.7rem;
      letter-spacing: 2px;
    }
  }
`;

export default Card;