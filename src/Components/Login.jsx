import React from 'react'
import './Login.css'
import { useEffect } from 'react';

const Login = () => {
  useEffect(() => {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");

    sign_up_btn.addEventListener("click", () => {
      container.classList.add("sign-up-mode");
    });

    sign_in_btn.addEventListener("click", () => {
      container.classList.remove("sign-up-mode");
    });

    // Ensure to clean up the event listeners when the component unmounts
    return () => {
      sign_up_btn.removeEventListener("click", () => {
        container.classList.add("sign-up-mode");
      });

      sign_in_btn.removeEventListener("click", () => {
        container.classList.remove("sign-up-mode");
      });
    };
  }, []);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    var username = document.getElementById('l_username').value;
    var password = document.getElementById('l_password').value;
    var data = {
      username: username,
      password: password
    };

    try {
      const response = await fetch('http://localhost:8008/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      localStorage.setItem('token', responseData.token);
      console.log('Success:', responseData);
      document.getElementById('result').innerHTML = responseData.message;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();

    var username = document.getElementById('r_username').value;
    var email = document.getElementById('r_email').value;
    var password = document.getElementById('r_password').value;
    var data = {
      username: username,
      email: email,
      password: password
    };

    try {
      const response = await fetch('http://localhost:8008/registerUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Success:', responseData);
      document.getElementById('result').innerHTML = responseData.message;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div class="container">
      <div class="forms-container">
        <div class="signin-signup">
          <form id="loginForm" class="sign-in-form">
            <h2 class="title">Sign in</h2>
            <div class="input-field">
              <i class="fas fa-user"></i>
              <input id="l_username"  type="text" placeholder="Username" />
            </div>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input id="l_password"  type="password" placeholder="Password" />
            </div>
            <input id="l_submit"  type="submit" value="Login" class="btn solid" />
            <p class="social-text">Or Sign in with social platforms</p>
            <div class="social-media">
              <a href="#" class="social-icon">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="fab fa-google"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
          <form id="registerForm" class="sign-up-form">
            <h2 class="title">Sign up</h2>
            <div class="input-field">
              <i class="fas fa-user"></i>
              <input id="r_username"  type="text" placeholder="Username" />
            </div>
            <div class="input-field">
              <i class="fas fa-envelope"></i>
              <input id="r_email"  type="email" placeholder="Email" />
            </div>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input id="r_password"  type="password" placeholder="Password" />
            </div>
            <button id="r_submit"  type="submit" class="btn" value="Sign up">Sign Up</button>
            <p class="social-text">Or Sign up with social platforms</p>
            <div class="social-media">
              <a href="#" class="social-icon">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="fab fa-google"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
        </div>
      </div>

      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h3>New here ?</h3>
            <p>
               Don't have an account yet ? Sign up and get access to all our services.
            </p>
            <button class="btn transparent" id="sign-up-btn">
              Sign up
            </button>
          </div>
          <img src="../../public/log.svg" class="image" alt="" />
        </div>
        <div class="panel right-panel">
          <div class="content">
            <h3>One of us ?</h3>
            <p>
              Already made an account here? Sign in and get access to all our services.
            </p>
            <button class="btn transparent" id="sign-in-btn">
              Sign in
            </button>
          </div>
          <img src="../../public/register.svg" class="image" alt="" />
        </div>
      </div>
    </div>
    </div>
  )
}

export default Login
