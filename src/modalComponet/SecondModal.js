import React, { useState, useEffect  } from "react";
import Modal from "react-modal";
import styled, { css, keyframes } from "styled-components";

const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    content: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "85%", 
      height: "70%",
      display: "grid",
      gridTemplateRows: "1fr 1fr 1fr 3fr 1.5fr ",
    },
  };

  const blinkAnimation = keyframes`
  0% {
    border-color: #000;
  }
  50% {
    border-color: #E296B6;
  }
  100% {
    border-color: #000;
  }
`;

  const TimeText = styled.div`
    color: #FFF;
    font-size: 21px;
    font-weight: 600;
    background: #515151;
    border: 2px solid #515151;
    border-radius: 30px;
    width: 30%;
    height: 40%;
    display: flex;
    justify-content: center;
    margin: auto;
`;

const Text1 = styled.div`
    color: #474747;
    text-align: center;
    font-size: 20px;
    font-weight: 900;
    width: 90%;
    height: 80%;
    margin: auto;
`;

const Text2 = styled.div`
    color: #474747;
    text-align: center;
    font-size: 17px;
    font-weight: 600;
    width: 90%;
    height: 80%;
    margin: auto;
`;

const GridItem = styled.div`
  display: grid;
  margin: auto;
  margin-bottom: 5px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-template-areas:
  "subgrid1 subgrid2 subgrid3 subgrid3"
  "subgrid4 subgrid4 subgrid4 subgrid5";
  width: 95%;
  height: 70%;
  background: #FFF;
  box-shadow: 0px 0px 22px 0px rgba(0, 0, 0, 0.10);
  text-align: center;
  border-radius: 18px;
  border: 2px solid #494949;    
  ${(props) =>
    css`
      animation: ${blinkAnimation} 1s infinite;
    `}   
`;

const SubGridItem1 = styled.div`
    grid-area: subgrid1;
    margin: auto;
 `;

const SubGridItem2 = styled.div`
    grid-area: subgrid2;
    color: #515151;
    font-size: 13px;
    font-weight: 700;
    margin: auto;
`;

const SubGridItem3 = styled.div`
    grid-area: subgrid3;
    margin: auto;
`;

const SubGridItem4 = styled.div`
  grid-area: subgrid4;
  span {
      color: #CE6591;
      font-size: 16px;
      font-weight: 600;
  }
  font-size: 14px;
  margin: auto;
`;

const SubGridItem5 = styled.div`
    grid-area: subgrid5;
    margin: auto;
`;

const StyledButton = styled.button`
  width: 100%;
  height: 70%;
  font-size: 12px;
  border-radius: 9px;
  background: ${(props) => (props.selected ? "#E296B6" : "#515151")};  
  color: white;
  border: none;
  cursor: pointer;
`;

const StyledButton2 = styled.button`
  width: 30%;
  height: 30px;
  margin: auto;
  font-size: 13px;
  border-radius: 9px; 
  color: black;
  border: none;
  cursor: pointer;
`;

const SecondModal = ({ isOpen, onClose, recommendation, gender }) => {

  const [selectedUser, setSelectedUser] = useState(null);
  const [timer, setTimer] = useState(1800);
  const [recommendationData, setRecommendationData] = useState(null);

  const getImagePath = (animal, gender) => {
    if (animal) {
      return `/image/profile/${animal.toLowerCase()}${gender}.png`;
    }
  };
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      onClose(); // Close the modal when the timer reaches 0
    }
  }, [timer, onClose]);

  const handleButtonClick = async (user) => {
    if (selectedUser === user) {
      setSelectedUser(null);
    } else {
      setSelectedUser(user);
    }
  };

  const handleChooseClick = async () => {
      await sendSelectedUserToServer(recommendationData.kid);
    onClose();
  };

  const handleCancelClick = async () => {
    await sendSelectedUserToServer(null);
    onClose();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (recommendation) {
          const Response = await fetch(
            `http://ec2-54-180-82-92.ap-northeast-2.compute.amazonaws.com:8080/main/api/user_info/${recommendation}`, // 배열의 첫 번째 요소 사용
            {
              method: "GET",
              mode: "cors",
            }
          );

          if (!Response.ok) {
            throw new Error("Failed to fetch crush information");
          }

          const data = await Response.json();

          if (data && data.extra_info && data.extra_info.length > 0) {
            setRecommendationData(data);
          } else {
            console.error("Invalid data structure:", data);
          }
        }
      } catch (error) {
        console.error("Error fetching crush information:", error);
        // 에러 처리 로직 추가
      }
    };

    fetchData();
  }, [recommendation]); // recommendations가 변경될 때마다 다시 호출

  const sendSelectedUserToServer = async (kid) => {
    try {
      const fieldName = gender === 'male' ? 'm_match_kid' : 'w_crush_kid';

      const response = 
      await fetch(`http://ec2-54-180-82-92.ap-northeast-2.compute.amazonaws.com:8080/main/api/user_info/${1001}/`, {
        method: "PUT",
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [fieldName]: 2002
        }),
      });

      if (response.ok) {
        console.log("선택한 사용자 정보 전송 성공");
      } else {
        console.error("선택한 사용자 정보 전송 실패");
      }
    } catch (error) {
      console.error("API 호출 오류:", error);
    }
  };


  return (
    <Modal 
        isOpen={isOpen} 
        onRequestClose={onClose} 
        recommendation={recommendationData}
        style={customStyles}
    >
        <TimeText>{`00:${timer < 10 ? `0${timer}` : timer}`}</TimeText>
        <div></div>
        <div>
            <Text1>
                마음에 드는 이성을 선택하세요.
            </Text1>
            <Text2>
                "루아"가 추천하는 이상형은 <br /> {recommendationData?.extra_info?.[0]?.nickname} 님이에요.
                만나보시겠어요?
            </Text2>
        </div>
        {(
        <GridItem>
          <SubGridItem1>
            <img 
              src={getImagePath(recommendationData?.extra_info[0]?.animal, gender)} 
              alt={`이미지`}
              style={{ width: "60px", height: "60px" }}
            />
          </SubGridItem1>
          <SubGridItem2>
            {recommendationData?.extra_info[0]?.school} {recommendationData?.extra_info[0]?.major} {recommendationData?.extra_info[0]?.age}
          </SubGridItem2>
          <SubGridItem3>
            {recommendationData?.extra_info[0]?.height} {recommendationData?.extra_info[0]?.body} {recommendationData?.extra_info[0]?.mbti}
          </SubGridItem3>
          <SubGridItem4>
            회원님의 <span>이상형</span>과 <span>78%</span> 부합해요!
          </SubGridItem4>
          <SubGridItem5>
            <StyledButton
              selected={selectedUser === recommendationData?.extra_info?.[0]?.nickname}
              onClick={() => handleButtonClick(recommendationData?.extra_info?.[0]?.nickname)}
                        >
              {selectedUser === recommendationData?.extra_info?.[0]?.nickname ? "취소하기 ↗" : "선택하기 ↗"}
            </StyledButton>
          </SubGridItem5>
        </GridItem>
        )}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <StyledButton2 onClick={handleChooseClick}>
            만나볼래!
        </StyledButton2>
        <StyledButton2 onClick={handleCancelClick}>
            다음에 만날게
        </StyledButton2>
      </div>
  </Modal>
  );
};

export default SecondModal;
