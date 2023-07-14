import React, { useState, useRef, useEffect } from "react";
import "./msg.css";
import robotImg from "./Images/robot.png";
import axios from "axios";

const YOU = "you";
const AI = "ai";

function App() {
  const inputRef = useRef();
  const chatsRef = useRef();
  const [qna, setQna] = useState([]);
  const [loading, setLoading] = useState(false);

  const updateQNA = (from, value) => {
    setQna((qna) => [...qna, { from, value }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const question = inputRef.current.value;
    updateQNA(YOU, question);

    setLoading(true);
    axios
      .post("http://localhost:3080/chat", {
        question,
      })
      .then((response) => {
        updateQNA(AI, response.data.answer);
      })
      .finally(() => {
        setLoading(false);
      });

    inputRef.current.value = "";
  };

  const renderContent = (qna) => {
    const value = qna.value;

    if (Array.isArray(value)) {
      return value.map((v, index) => (
        <p key={index} className="msg-text">
          {v}
        </p>
      ));
    }

    return <p className="msg-text">{value}</p>;
  };

  const getSenderName = (from) => {
    if (from === YOU) {
      return <b>You</b>;
    } else if (from === AI) {
      return <b>ChatBot</b>;
    }
    return "";
  };

  useEffect(() => {
    chatsRef.current.scrollTo(0, chatsRef.current.scrollHeight);
  }, [qna]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      // Clear the chat when the component is unmounted or refreshed
      setQna([]);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <section className="msger">
      <header className="msger-header">
        <div className="msger-header-title">
          <img src={robotImg} alt="Robot" srcSet="" />
          <p>Smart ChatBot</p>
        </div>
      </header>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="spiral"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#ddd"
          fillOpacity="1"
          d="M0,224L34.3,186.7C68.6,149,137,75,206,69.3C274.3,64,343,128,411,165.3C480,203,549,213,617,197.3C685.7,181,754,139,823,144C891.4,149,960,203,1029,186.7C1097.1,171,1166,85,1234,64C1302.9,43,1371,85,1406,106.7L1440,128L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
        />
      </svg>
      <main className="msger-chat" ref={chatsRef}>
        <div className="msg left-msg">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
            alt=""
            className="msg-img"
          />
          <div className="msg-bubble">
            <div className="msg-info">
              <div className="msg-info-name">ChatBot</div>
            </div>
            <div className="msg-text">
              Hi🫡, welcome to Chat-Box!! How can I assist you...?
            </div>
          </div>
        </div>
        {qna.map((qna, index) => {
          const senderName = getSenderName(qna.from);

          return (
            <div
              key={index}
              className={`msg ${qna.from === YOU ? "right-msg" : "left-msg"}`}
            >
              <img
                src={
                  qna.from === YOU
                    ? "https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
                    : "https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
                }
                alt=""
                className="msg-img"
              />
              <div className="msg-bubble">
                <div>
                  <p className="msg-sender">{senderName}</p>
                  {renderContent(qna)}
                </div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="msg left-msg">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
              alt=""
              className="msg-img"
            />
            <div className="msg-bubble">
              <div>
                <p className="msg-sender">
                  <b>ChatBot</b>
                </p>
                <p>Typing...</p>
              </div>
            </div>
          </div>
        )}
        {/* </div> */}
      </main>

      <div className="imp">
        <form className="msger-inputarea" onSubmit={handleSubmit}>
          <input
            type="text"
            ref={inputRef}
            className="msger-input"
            placeholder="Enter your message..."
          />
          <div className="circle"></div>
          <button
            type="submit"
            className="msger-send-btn btn btn-success"
            disabled={loading}
          >
            <i className="fa fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </section>
  );
}

export default App;
