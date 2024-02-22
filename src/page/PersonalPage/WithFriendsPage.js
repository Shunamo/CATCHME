import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "./WithFriendsPage.css";

let friends = [
  {
    id: 1,
    nickname: "w98_hyun_",
    gender: "남",
    age: "26",
    locate: "강남구 ",
  },
  {
    id: 2,
    nickname: "JIPDANJISUNG",
    gender: "여",
    age: "24",
    locate: "강남구 ",
  },
  {
    id: 3,
    nickname: "w99_hyun_",
    gender: "남",
    age: "26",
    locate: "강남구 ",
  },
  {
    id: 4,
    nickname: "JIPDANJISUNG",
    gender: "여",
    age: "24",
    locate: "강남구 ",
  },
  {
    id: 5,
    nickname: "JIPDANJISUNG",
    gender: "여",
    age: "24",
    locate: "강남구 ",
  },
];

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px",
    borderBottom: "1px solid #f0f0f0",
  },
  withfriendsHeader: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "20px",
    padding: "10px 20px 10px 15px",
  },
  withfriendsText: {
    fontSize: "25px",
    fontWeight: "bold",
    textDecoration: "none",
    color: "rgb(60, 57, 57)",
    textAlign: "center",
  },
  friendsList: {
    margin: "5px 0px 0px 0px",
    padding: "10px",
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: "15px",
    border: "0px solid rgb(213, 213, 213)",
    overflowY: "auto",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  friendsItem: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "12px",
    marginBottom: "8px",
    display: "grid",
    gridTemplateColumns: "0.1fr 2fr 4.9fr 1fr",
    gap: "15px",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  friendInfo: {},
  friendNickname: {
    marginLeft: "0px",
    fontWeight: "bold",
  },
  friendDetails: {
    marginLeft: "0px",
    fontSize: "0.8em",
    color: "#777",
  },
  gogo: {
    fontSize: "30px",
  },
  simplePlusButton: {
    fontSize: "12px",
    width: "96px",
    height: "32px",
    backgroundColor: "#fbfbfb",
    fontWeight: "bold",
    color: "#8e8e8e",
    textAlign: "center",
    borderRadius: "10px",
    border: "0.2px solid rgb(213, 213, 213)",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
  kakaoButton1: {
    display: "block",
    margin: "auto",
    marginTop: "5%",
    width: "330px",
    height: "50px",
    color: "#391b1b",
    fontWeight: "bold",
    fontSize: "16px",
    backgroundColor: "#fee500",
    border: "none",
    borderRadius: "10px",
  },
  withfriendsNoFriends: {
    textAlign: "center",
    marginTop: "8%",
    fontSize: "16px",
    color: "#cccbcb",
  },
  withfriendsContainer: {
    display: "grid",
    gridTemplateRows: "7.1fr 0.5fr 1fr",
    gap: "10px",
    padding: "0px 20px 20px 20px",
    minHeight: "75vh",
    maxHeight: "75vh",
  },
};
const modalStyles = {
  overlay: {
    backgroundColor: "transparent", //주변 음영 지우기
  },
};

function WithFriends() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [choice, setChoice] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]); // 선택된 히스토리 아이템들의 ID를 추적
  const [allDeleteModal, setAllDeleteModal] = useState(false);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [locate, setLocate] = useState("");
  const [animal, setAnimal] = useState("");
  const [univ, setUniv] = useState("");
  const [body, setBody] = useState("");

  let index = friends.length;
  const handleRegister = () => {
    // 콘솔에 값들을 출력
    const addFriend = {
      id: ++index,
      nickname: name,
      gender: "남",
      age: age,
      locate: locate,
    };
    console.log("이름:", name);
    console.log("나이:", age);
    console.log("거주지:", locate);
    console.log("닮은 동물 상:", animal);
    console.log("대학/학과:", univ);
    console.log("키/체형:", body);
    setModalIsOpen(false);

    friends.push(addFriend);
    setName(null);
    setAge(null);
    setAnimal(null);
    setLocate(null);
    setUniv(null);
    setBody(null);
  };

  const navigate = useNavigate();
  const simpleFriendPlus = function () {
    setModalIsOpen(true);
  };

  const toggleSelectedItem = function (id) {
    if (selectedItems.includes(id)) {
      // 이미 선택된 아이템인 경우 선택 해제
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      // 선택되지 않은 아이템인 경우 선택
      setSelectedItems([...selectedItems, id]);
    }
  };

  const deleteSelectedItems = () => {
    const remainingFriends = friends.filter(
      (friend) => !selectedItems.includes(friend.id)
    );
    // 선택된 아이템들을 제외한 히스토리 목록을 새로운 목록으로 업데이트
    friends = remainingFriends;
    setSelectedItems([]); // 선택된 아이템 초기화
    setChoice(false);
  };
  const deleteAllItems = () => {
    setSelectedItems([]);
    const remainingFriends = friends.filter((friend) =>
      selectedItems.includes(friend.id)
    );
    // 선택된 아이템들을 제외한 히스토리 목록을 새로운 목록으로 업데이트
    friends = remainingFriends;
    setSelectedItems([]); // 선택된 아이템 초기화
  };
  // 버튼의 클래스 설정을 isActive 상태에 따라 변경
  //const buttonClass = isActive ? "choice-button-active" : "choice-button";

  return (
    <div>
      <Modal
        isOpen={allDeleteModal}
        onRequestClose={() => setAllDeleteModal(false)}
        className="history-modal-detail"
      >
        <div className="history-modal-container">
          <div>
            <p className="history-modal-text">모든 친구를 삭제할까요?</p>
          </div>
          <div>
            <button
              onClick={() => {
                deleteAllItems();
                setAllDeleteModal(false);
              }}
              className="history-modal-buttons"
            >
              삭제
            </button>
            <button
              onClick={() => setAllDeleteModal(false)}
              className="history-modal-buttons"
            >
              취소
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Modal"
        style={modalStyles}
        className="sfp-detail"
      >
        <div className="sfp-container">
          <div className="sfp-sfp">간편 친구 추가</div>
          <div className="sfp-info-container">
            <div className="sfp-info-holder">
              <span>이름:</span>
              <input
                id="name"
                type="text"
                placeholder=" ex) 홍길동"
                className="sfp-name-input"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="sfp-info-age-locate-container">
              <div className="sfp-info-holder">
                <span>나이:</span>
                <input
                  id="age"
                  type="number"
                  placeholder=" ex) 21"
                  className="sfp-age-input"
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="sfp-info-holder">
                <span>거주지:</span>
                <input
                  id="locate"
                  type="text"
                  placeholder=" ex) 마포구"
                  className="sfp-locate-input"
                  onChange={(e) => setLocate(e.target.value)}
                />
              </div>
            </div>
            <div className="sfp-info-holder">
              <span>닮은 동물 상:</span>
              <input
                id="animal"
                type="text"
                placeholder=" ex) 펭귄상"
                className="sfp-animal-input"
                onChange={(e) => setAnimal(e.target.value)}
              />
            </div>
            <div className="sfp-info-holder">
              <span>대학/학과:</span>
              <input
                id="univ"
                type="text"
                placeholder=" ex) 홍익대 / 컴퓨터공학과"
                className="sfp-univ-input"
                onChange={(e) => setUniv(e.target.value)}
              />
            </div>
            <div className="sfp-info-holder">
              <span>키/체형:</span>
              <input
                id="body"
                type="text"
                placeholder=" ex) 150 / 통통"
                className="sfp-body-input"
                onChange={(e) => setBody(e.target.value)}
              />
            </div>
          </div>
          <div>
            <span>
              <button onClick={handleRegister} className="sfp-regist-button">
                등록하기
              </button>
            </span>
            <span>
              <button
                onClick={() => setModalIsOpen(false)}
                className="sfp-cancel-button"
              >
                취소
              </button>
            </span>
          </div>
        </div>
      </Modal>
      <div style={styles.withfriendsHeader}>
        <div>
          <span style={styles.withfriendsText}>친구목록</span>
        </div>
        <div style={{ flexGrow: 1 }}></div>
        <div></div>
      </div>
      <div className="button-select-delete-locate">
        <button className="select-button" onClick={() => setChoice(true)}>
          선택
        </button>
        {choice ? (
          <button
            className="delete-all-button"
            onClick={() => setChoice(false)} //setSelectItems([])필요
          >
            취소
          </button>
        ) : (
          <button
            className="delete-all-button"
            onClick={() => setAllDeleteModal(true)}
          >
            전체 삭제
          </button>
        )}
      </div>
      <div style={styles.withfriendsContainer}>
        <div style={styles.friendsList}>
          {friends.length > 0 ? (
            friends.map((friend, index) => (
              <div key={index} style={styles.friendsItem} onClinck={null}>
                <div className="choice-button-locate">
                  {choice ? (
                    <button
                      className={
                        selectedItems.includes(friend.id)
                          ? "choice-button-active"
                          : "choice-button"
                      }
                      onClick={() => toggleSelectedItem(friend.id)}
                    ></button>
                  ) : null}
                </div>
                <div>
                  <img
                    src={`${process.env.PUBLIC_URL}/image/profile/catMale.png`}
                    alt=""
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <div style={styles.friendInfo}>
                  <p style={styles.friendNickname}>{friend.nickname}님</p>
                  <p style={styles.friendDetails}>
                    {friend.age}/{friend.gender}/{friend.locate}
                  </p>
                </div>
                <div>
                  <span style={styles.gogo}>{">"}</span>
                </div>
              </div>
            ))
          ) : (
            <div style={styles.withfriendsNoFriends}>
              아직 등록된 친구가 없어요. <br />
              카카오톡으로 간편하게 등록하세요.
            </div>
          )}
        </div>
        <div>
          {choice ? (
            <div className="delete-button">
              <button className="delete-button" onClick={deleteSelectedItems}>
                삭제하기
              </button>
            </div>
          ) : (
            <div className="sfp-button-loc">
              <button
                style={styles.simplePlusButton}
                onClick={simpleFriendPlus}
              >
                간편친구추가
              </button>
            </div>
          )}
        </div>
        <div>
          <button style={styles.kakaoButton1}>카카오톡으로 초대하기</button>
        </div>
      </div>
    </div>
  );
}

export default WithFriends;
