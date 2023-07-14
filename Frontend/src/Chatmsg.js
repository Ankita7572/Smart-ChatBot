import React, { useState, useRef } from "react";
import './msg.css';
import botImg from './Images/bot.png';
import personImg from './Images/user.png';
import robotImg from './Images/robot.png';

const BOT_IMG = botImg;
const PERSON_IMG = personImg;
const BOT_NAME = "BOT";
const PERSON_NAME = "User";
const prompts = [
  ["hi", "hii", "hey", "hello", "good morning", "good afternoon"],
  ["how are you", "how is life", "how are things"],
  ["what are you doing", "what is going on", "what is up"],
  ["how old are you"],
  ["who are you", "are you human", "are you bot", "are you human or bot"],
  ["who created you", "who made you"],
  [
    "your name please",
    "your name",
    "may i know your name",
    "what is your name",
    "what call yourself"
  ],
  ["i love you"],
  ["happy", "good", "fun", "wonderful", "fantastic", "cool"],
  ["bad", "bored", "tired"],
  ["help me", "tell me story", "tell me joke"],
  ["ah", "yes", "ok", "okay", "nice"],
  ["bye", "good bye", "goodbye", "see you later"],
  ["what should i eat today"],
  ["bro"],
  ["what", "why", "how", "where", "when"],
  ["no", "not sure", "maybe", "no thanks"],
  [""],
  ["haha", "ha", "lol", "hehe", "funny", "joke"]
]
const replies = [
  ["Hello!", "Hi!", "Hey!", "Hi there!", "Howdy"],
  [
    "Fine... how are you?",
    "Pretty well, how are you?",
    "Fantastic, how are you?"
  ],
  [
    "Nothing much",
    "About to go to sleep",
    "Can you guess?",
    "I don't know actually"
  ],
  ["I am infinite"],
  ["I am just a bot", "I am a bot. What are you?"],
  ["The one true God, JavaScript"],
  ["I am nameless", "I don't have a name"],
  ["I love you too", "Me too"],
  ["Have you ever felt bad?", "Glad to hear it"],
  ["Why?", "Why? You shouldn't!", "Try watching TV"],
  ["What about?", "Once upon a time..."],
  ["Tell me a story", "Tell me a joke", "Tell me about yourself"],
  ["Bye", "Goodbye", "See you later"],
  ["Sushi", "Pizza"],
  ["Bro!"],
  ["Great question"],
  ["That's ok", "I understand", "What do you want to talk about?"],
  ["Please say something :("],
  ["Haha!", "Good one!"]
];
const alternative = [
  "Same",
  "Go on...",
  "Bro...",
  "Try again",
  "I'm listening...",
  "I don't understand"
]
const robot = ["How do you do, fellow human", "I am not a bot"];

function App() {

  const msgerChat = useRef(null);

  function addChat(name, img, side, text) {
    const msgHTML = `
      <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>
        <div class="msg-bubble">
          <div class="msg-info">
            <div class="msg-info-name">${name}</div>
            <div class="msg-info-time">${formatDate(new Date())}</div>
          </div>
          <div class="msg-text">${text}</div>
        </div>
      </div>
    `;
    msgerChat.current.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.current.scrollTop += 500;
  }

  const output = (input) => {
    let product;
    let text = input.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[\d]/gi, "").trim();
    text = text
      .replace(/ a /g, " ")
      .replace(/i feel /g, "")
      .replace(/whats/g, "what is")
      .replace(/please /g, "")
      .replace(/ please/g, "")
      .replace(/r u/g, "are you");
    if (compare(prompts, replies, text)) {
      product = compare(prompts, replies, text);
    } else if (text.match(/thank/gi)) {
      product = "You're welcome!"
    } else if (text.match(/(robot|bot|robo)/gi)) {
      product = robot[Math.floor(Math.random() * robot.length)];
    } else {
      product = alternative[Math.floor(Math.random() * alternative.length)];
    }
    const delay = input.split(" ").length * 100;
    setTimeout(() => {
      addChat(BOT_NAME, BOT_IMG, "left", product);
    }, delay);
  }

  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const msgText = inputValue.trim();
    if (!msgText) return;
    setInputValue("");
    addChat(PERSON_NAME, PERSON_IMG, "right", msgText);
    output(msgText);
  };

  const compare = (promptsArray, repliesArray, string) => {
    let reply;
    let replyFound = false;
    for (let x = 0; x < promptsArray.length; x++) {
      for (let y = 0; y < promptsArray[x].length; y++) {
        if (promptsArray[x][y] === string) {
          let replies = repliesArray[x];
          reply = replies[Math.floor(Math.random() * replies.length)];
          replyFound = true;
          break;
        }
      }
      if (replyFound) {
        break;
      }
    }
    return reply;
  };

  function formatDate(date) {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();
    return `${h.slice(-2)}:${m.slice(-2)}`;
  }

  return (

    <section className="msger">
      <header className="msger-header">
        <div className="msger-header-title">
          <img src={robotImg} alt="Robot" srcSet="" />
          <p>ChatBot</p>
        </div>
      </header>
      <svg xmlns="http://www.w3.org/2000/svg" className="spiral" viewBox="0 0 1440 320">
        <path
          fill="#ddd"
          fillOpacity="1"
          d="M0,224L34.3,186.7C68.6,149,137,75,206,69.3C274.3,64,343,128,411,165.3C480,203,549,213,617,197.3C685.7,181,754,139,823,144C891.4,149,960,203,1029,186.7C1097.1,171,1166,85,1234,64C1302.9,43,1371,85,1406,106.7L1440,128L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
        />
      </svg>
      <main ref={msgerChat} className="msger-chat">
        <div className="msg left-msg">
          <div className="msg-img" style={{ backgroundImage: `url(${require("./Images/bot.png")})` }}></div>
          <div className="msg-bubble">
            <div className="msg-info">
              <div className="msg-info-name">BOT</div>
              <div className="msg-info-time">12:25pm</div>
            </div>
            <div className="msg-text">
              Hi, welcome to Coderider ChatBot!! Go ahead and send me a message. 😄
            </div>
          </div>
        </div>
        <div className="msg right-msg">
          <div className="msg-img" style={{ backgroundImage: `url(${require("./Images/user.png")})` }}></div>
          <div className="msg-bubble">
            <div className="msg-info">
              <div className="msg-info-name">User</div>
              <div className="msg-info-time">12:26pm</div>
            </div>
            <div className="msg-text">You can change your name in JS section!</div>
          </div>
        </div>
      </main>
      <div className="imp">
        <form className="msger-inputarea" onSubmit={handleSubmit}>
          <input
            type="text"
            className="msger-input"
            placeholder="Enter your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="circle"></div>
          <button type="submit" className="msger-send-btn">
            <i className="fa fa-paper-plane"></i>
          </button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-emoji-smile"
            viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path
              d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-paperclip"
            id="pi"
            viewBox="0 0 16 16">
            <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
          </svg>
        </form>
      </div>
    </section>
  );
}

export default App;
