import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome02.css'; // 스타일시트를 App.css로 가정
import './Welcome12.css'; // CSS 파일을 임포트하세요
import styled from "styled-components"
import { useGender } from './GenderContext';
import ProgressBar from './ProgressBar';

const interests = [
  '운동', '산책', '공부', '쇼핑', '카페', '영화', '등산',
  '독서', '음악', '미술', '사진', '여행', '게임', '요리'
];

const BackgroundImage = styled.div `
    background-size: contain;
    background-repeat: no-repeat;
    background-color: #83A98B;
    background-position: center top; /* 이미지가 수평 및 수직 중앙에 위치 */
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: -1;
` 

const Welcome12 = () => {
  const currentStep = 11;
  const totalSteps = 14;
    const { gender } = useGender();
  
    const [selected, setSelected] = useState([]);

  const navigate = useNavigate();

  const handlePreviousClick = () => {
    // "이전" 버튼 로직
    navigate(-1);
  };

  const handleNextClick = () => {
    // 성별에 따라 다른 페이지로 네비게이션
    if (gender === '남자!') {
      navigate('/login/information/Welcome13M'); // 남자를 선택했을 경우의 경로
    } else if (gender === '여자!') {
      navigate('/login/information/Welcome13W'); // 여자를 선택했을 경우의 경로
    } else {
      // 성별이 선택되지 않은 경우의 처리, 예를 들어 경고 메시지 표시
      alert('성별을 선택하지 않았습니다. 성별을 선택해주세요!');
    }
  };

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

  return (
    <div className="home2">
        <BackgroundImage />
      <div className="headtext">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      </div>
      {interests.map((interest, index) => (
  <button
    key={index}
    className={`button content-${index + 1} ${selected.includes(interest) ? 'selected' : ''}`}
    onClick={() => toggleSelect(interest)}
  >
    {interestEmojis[interest]} {interest} {/* 이모티콘과 텍스트를 함께 표시 */}
  </button>
))}
      <div className="previousnext">
        <button onClick={handlePreviousClick} className="previous-button">이전</button>
        <button onClick={handleNextClick} className="next-button">다음</button>
      </div>
      <div className="bottom"></div>

    </div>
    
  );
};

export default Welcome12;