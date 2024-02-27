import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome02.css'; // CSS 파일을 임포트하세요
import './Welcome.css';
import styled from "styled-components"
import SplitMessage from './SplitMessagedouble';
import ProgressBar from './ProgressBar';


const BackgroundImage = styled.div `
    background-size: contain;
    background-repeat: no-repeat;
    background-color: #565656;
    background-position: center top; /* 수평 중앙, 수직 상단에 위치 */
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: -1;

` 

  function Welcome07() {
    const [message, setMessage] = useState('');
const fullMessage1 = "너는 어떤 것들에 관심이 많아?";
const fullMessage2 = "취미를 골라줘!"
const typingSpeed = 75;
const currentStep = 6;
  const totalSteps = 14;

  const [currentText, setCurrentText] = useState('...'); // 현재 화면에 보여지는 텍스트
  const typingIntervalRef = useRef(null);
  const [selected, setSelected] = useState([]);

  const interests = [
    '운동', '산책', '공부', '쇼핑', '카페', '영화', '등산',
    '독서', '음악', '미술', '사진', '여행', '게임', '요리'
  ];
  
  const interestEmojis = {
    '운동': '💪',
    '산책': '🚶‍♂️',
    '공부': '📚',
    '쇼핑': '🛍️',
    '카페': '☕',
    '영화': '🎬',
    '등산': '⛰️',
    '독서': '📖',
    '음악': '🎵',
    '미술': '🎨',
    '사진': '📸',
    '여행': '✈️',
    '게임': '🎮',
    '요리': '🍳'
  };


 
  const toggleSelect = (interest) => {
    setSelected(prevSelected => {
      if (prevSelected.includes(interest)) {
        return prevSelected.filter(item => item !== interest);
      } else if (prevSelected.length < 3) {
        return [...prevSelected, interest];
      } else {
        return prevSelected;
      }
    });
  };

  const startTyping = (text) => {
    let index = 0;
    setCurrentText('');
    clearInterval(typingIntervalRef.current);
    typingIntervalRef.current = setInterval(() => {
      if (index < text.length) {
        setCurrentText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(typingIntervalRef.current);
      }
    }, typingSpeed);
  };

  useEffect(() => {
    if (selected.length === 3) {
      const newMessage = ` 나는 ${selected.join(', ')}에 관심이 많아!`;
      startTyping(newMessage);
    }
  }, [selected]);
  

useEffect(() => {
  if (message.length < fullMessage1.length + fullMessage2.length) {
    setTimeout(() => {
      setMessage(fullMessage1.slice(0, Math.min(message.length + 1, fullMessage1.length)) + 
                 fullMessage2.slice(0, Math.max(message.length - fullMessage1.length + 1, 0)));
    }, typingSpeed);
  }
}, [message, fullMessage1, fullMessage2]);

  const navigate = useNavigate();

      
 
  
 
 


  const handlePreviousClick = () => {
    // "이전" 버튼 로직
    navigate(-1); // 이전 페이지로 돌아갑니다.
  };

  const handleNextClick = () => {
    if (selected.length === 3) {
      navigate('/login/information/Welcome08');
    } else {
      alert("최소 3개의 취미를 선택해주세요.");
    }
  };

 
 


  return (
    <div className="home">
      <BackgroundImage />
      <div className="header">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      </div>
      <div className="header1">
      <div className="image-with-typing">
      <img src={`${process.env.PUBLIC_URL}/image/welcome/background3.png`} alt = "back"
      />
       <div className='received'>
      <SplitMessage message={message} splitIndex={fullMessage1.length} />
      </div></div></div>
      <div className="typing-container">
      <div className="message typing">
        <span>{currentText}</span>
        </div>
      
      </div>
      <div className="hobby-container">
        {interests.slice(0, 7).map((interest, index) => (
          <button
            key={index}
            className={`hobby-btn ${selected.includes(interest) ? 'selected' : ''}`}
            onClick={() => toggleSelect(interest)}
          >
            {interestEmojis[interest]} {interest}
          </button>
        ))}
        <div className="hobby-container2">
        {interests.slice(7).map((interest, index) => (
          <button
            key={index}
            className={`hobby-btn ${selected.includes(interest) ? 'selected' : ''}`}
            onClick={() => toggleSelect(interest)}
          >
            {interestEmojis[interest]} {interest}
          </button>
        ))}
      </div>
      </div>
      <div></div>
      
      <div className="buttons-container">
        <button onClick={handlePreviousClick} className="previous-button">이전</button>
        <button onClick={handleNextClick} className="next-button">다음</button>
    
    </div>
    </div>
    
  );
}

export default Welcome07 ;
