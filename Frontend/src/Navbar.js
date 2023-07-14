import "./App.css";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginAndRegister({ setIsLoggedIn }) {
  // const [isLogin, setIsLogin] = React.useState(true);

  // login Form
  const login = () => {
    setIsLogin(true);
  };

  const [isLogin, setIsLogin] = useState(false);
  const [logindata, setLoginData] = useState({ email: "", password: "" });
  const [loginStatus, setLoginStatus] = useState("");

  const handleChangeLogin = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginData({ ...logindata, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    console.log("Login: ", logindata);
    try {
      const response = await axios.post(
        "http://localhost:3080/api/users/login",
        logindata
      );
      if (response.data.message) {
        setLoginStatus(response.data.message);
        setIsLoggedIn(true); // update isLoggedIn state variable
        navigate("/chatbox");
      } else {
        setLoginStatus("Email or Password Doesn't Exist");
      }
      console.log(response.data);
      setLoginData({ email: "", password: "" });
    } catch (error) {
      console.error(error);
    }
  };

  // Registration form
  const register = () => {
    setIsLogin(false);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(data.password)) {
      alert(
        "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character."
      );
      return;
    }

    // Check if .com is present in the email
    if (!data.email.includes(".com")) {
      alert("Invalid email. Please include '.com' in the email");
      return;
    }

    try {
      let result = await axios.post(
        "http://localhost:3080/api/users/register",
        data
      );
      console.warn("result", result);
      alert("Registration Successful");
      setData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed");
    }
  };

  const sendUser = async () => {
    console.log(data);
  };

  return (
    <>
      <div className="navbar">
        <div>
          <a href="index.html">ChatBot Coding</a>
        </div>
        <nav>
          <ul id="MenuItems">
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/about-us">About Us</a>
            </li>
            <li>
              <a href="/chat-with-us">Chat-With-Us</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <button
                className="loginbtn"
                onClick={() => {
                  const loginForm = document.getElementById("login-form");
                  if (loginForm) {
                    loginForm.style.display = "block";
                  }
                }}
                style={{ width: "auto" }}
              >
                Login
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div id="login-form" className="login-page">
        <div className="form-box">
          <div className="button-box">
            <div id="btn" style={{ left: isLogin ? "0px" : "110px" }}></div>
            <button type="button" onClick={login} className="toggle-btn">
              Log In
            </button>
            <button type="button" onClick={register} className="toggle-btn">
              Register
            </button>
          </div>

          {/* ----------------login Form------------------------ */}

          <form
            id="login"
            className="input-group-login"
            style={{ left: isLogin ? "50px" : "-400px" }}
            onSubmit={handleSubmitLogin}
          >
            <input
              type="text"
              name="email"
              className="input-field"
              placeholder="Email Id"
              value={logindata.email}
              onChange={handleChangeLogin}
              required
            />
            <input
              type="password"
              name="password"
              className="input-field"
              placeholder="Enter Password"
              value={logindata.password}
              onChange={handleChangeLogin}
              required
            />
            <input type="checkbox" className="check-box" />
            <span>Remember Password</span>
            <button type="submit" className="submit-btn">
              Log in
            </button>
            <h4
              style={{
                color: "#F3C693",
                fontSize: "15px",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              {loginStatus}
            </h4>
          </form>

          {/*---------------- Registration Form ---------------------*/}
          <form
            id="register"
            className="input-group-register"
            style={{ left: isLogin ? "450px" : "50px" }}
            onSubmit={handleSubmit}
            // onClick={PostData}
          >
            <input
              type="text"
              name="firstName"
              className="input-field"
              placeholder="First Name"
              value={data.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              className="input-field"
              placeholder="Last Name "
              value={data.lastName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              className="input-field"
              placeholder="Email Id"
              value={data.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              className="input-field"
              placeholder="Enter Password"
              value={data.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              className="input-field"
              placeholder="Confirm Password"
              value={data.confirmPassword}
              onChange={handleChange}
              required
            />
            <button type="submit" className="submit-btn" onClick={sendUser}>
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginAndRegister;
