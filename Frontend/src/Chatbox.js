import React, { useState } from "react";
import Chatmsg from "./Chatmsgs";
import Draggable from "react-draggable";

function ChatBox() {
  const [chatResetCount, setChatResetCount] = useState(0);
  const loadChatbox = () => {
    const e = document.getElementById("minim-chat");
    e.style.display = "block";
    const e2 = document.getElementById("maxi-chat");
    e2.style.display = "none";
    const e3 = document.getElementById("chatbox");
    e3.style.margin = "0";
    const e4 = document.getElementById("chat");
    e4.style.display = "none";
  };

  const minimChatbox = () => {
    const e = document.getElementById("minim-chat");
    e.style.display = "none";
    const e2 = document.getElementById("maxi-chat");
    e2.style.display = "block";
    const e3 = document.getElementById("chatbox");
    e3.style.margin = "0 0 -460px 0";
  };

  const closeChatbox = () => {
    const e = document.querySelector(".popup_box");
    e.style.display = "block";
  };

  const cancelDelete = () => {
    const e = document.querySelector(".popup_box");
    e.style.display = "none";
  };

  const deleteChat = () => {
    const e = document.querySelector(".popup_box");
    e.style.display = "none";
    const e1 = document.getElementById("chatbox");
    e1.style.margin = "0 0 -1500px 0";
    alert("Chat Permanently Deleted.");
    const e2 = document.getElementById("chat");
    e2.style.display = "block";
    setChatResetCount(chatResetCount + 1);
  };

  return (
    <>
      <Draggable>
        <img
          id="chat"
          className="animated-chat tada"
          onClick={loadChatbox}
          src={require("./Images/bot1.gif")}
          alt="Error"
        />
      </Draggable>
      <Draggable>
        <div className="chatbox" id="chatbox">
          <span className="chat-text">Chatting Robo!</span>
          <div
            style={{
              width: "370px",
              height: "450px",
              overflow: "hidden",
              margin: "auto",
              padding: "0",
            }}
          >
            <div
              style={{
                width: "380px",
                height: "470px",
                overflow: "hidden",
                margin: "auto",
                padding: "0",
                border: "0",
              }}
            >
              {/* <iframe title="myFrame" src="./Chatmsg.js" scrolling="" frameBorder="0" width="280px" height="450px" style={{ border: '0', margin: '0', padding: '0' }}/> */}
              <Chatmsg
                key={chatResetCount}
                scrolling=""
                frameBorder="0"
                width="280px"
                height="450px"
                style={{ border: "0", margin: "0", padding: "0" }}
              />
            </div>
          </div>
          <div id="close-chat" onClick={closeChatbox}>
            &times;
          </div>
          <div id="minim-chat" onClick={minimChatbox}>
            <span className="minim-button">&minus;</span>
          </div>
          <div id="maxi-chat" onClick={loadChatbox}>
            <span className="maxi-button">&#43;</span>
          </div>

          <div className="popup_box">
            <i className="fa fa-exclamation"></i>
            <h1>Your conversation will be deleted permanently!</h1>
            <label>Are You sure to proceed?</label>
            <div className="btns" id="btns">
              <button onClick={cancelDelete} className="btn1">
                Cancel Process
              </button>
              <button onClick={deleteChat} className="btn2" id="btn2">
                Delete Chat
              </button>
            </div>
          </div>
        </div>
      </Draggable>
    </>
  );
}
export default ChatBox;
