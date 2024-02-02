import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";

const customModalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  content: {
    top: "55%", 
    left: "50%", 
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "3%",
    borderRadius: "10%",
    padding: "5px",
    boxShadow: "4px 4px 11px 0px rgba(0, 0, 0, 0.22)",
  },
};

const UserBoxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  cursor: ${({ isMe }) => (isMe ? "pointer" : "default")};
`;

const ModalText = styled.div`
  color: #000;
  text-align: center;
`;

const speechBubbleImages = {
  good: "good.png",
  heart: "heart.png",
  hello: "hello.png",
  love: "love.png",
  mad: "mad.png",
  oh: "oh.png",
  sad: "sad.png",
  sorry: "sorry.png",
  star: "star.png",
};

const SpeechBubble = styled.img`
  width: 23px;
  height: 15px;
  margin-top: 5px;
  margin-right: 10px;
  cursor: pointer;
`;

const UserBox = ({ users }) => {

  const [selectedUser, setSelectedUser] = useState(null);

  const getImagePath = (animal, gender) => {
    return `/image/profile/${animal.toLowerCase()}${gender === 'Male' ? 'Male' : 'Female'}.png`;
  };

  const handleUserClick = (user) => {
    if (user.kakaotalk_id === "0727") {
      //setSelectedUser(user); 나중엔 이걸로
      setSelectedUser({
        ...user,
        chat: ["hello", "heart", "oh", "love", "sad"],
      });
    }
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  const handleSpeechBubbleClick = async (text) => {
    try {
      const response = 
      await fetch('http://ec2-54-180-83-160.ap-northeast-2.compute.amazonaws.com:8080/room/api/room_info/', {
        method: "POST",
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Kakaotalk_id: '0727',
          rno: 1,
          chat: text,
        }),
      });

      if (response.ok) {
        console.log("말풍선 선택 정보 전송 성공");
      } else {
        console.error("말풍선 선택 정보 전송 실패");
      }
    } catch (error) {
      console.error("API 호출 오류:", error);
    } finally {
      closeModal();
    }
  };

  return (
    <UserBoxContainer>
      {users.map((user, index) => (
        <UserItem
          key={index}
          isMe={user.kakaotalk_id === "0727"}
          onClick={() => handleUserClick(user)}
        >
          <img 
            src={getImagePath(user.animal, user.gender)} 
            alt={`${user.animal} 이미지`}
            style={{ width: "65px", height: "65px" }}
        />
        </UserItem>
      ))}

      {selectedUser && (
        <Modal
        isOpen={true}
        onRequestClose={closeModal}
        style={customModalStyles}
        >
          <ModalText>
            {selectedUser.chat.map((text, index) => (
                <SpeechBubble
                  key={index}
                  src={`/image/chat/${speechBubbleImages[text]}`}
                  onClick={() => handleSpeechBubbleClick(text)}
                />
              ))}
          </ModalText>
        </Modal>
      )}
    </UserBoxContainer>
  );
};

export default UserBox;
