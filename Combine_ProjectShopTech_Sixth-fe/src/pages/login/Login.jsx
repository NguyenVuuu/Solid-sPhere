import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  faGooglePlusG,
  faFacebookF,
  faGithub,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosInstance from "../../custom/axios";
import { UserContext } from "../../context/UserContext";
import Header from "../../components/Header";
import { useTranslation } from 'react-i18next';

const App = () => {
  const { t } = useTranslation();

  const { loginContext } = useContext(UserContext);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = () => {
    const email = document.querySelector(".sign-in input[type='email']").value;
    const password = document.querySelector(
      ".sign-in input[type='password']"
    ).value;

    axiosInstance
      .post("/api/getUserByEmailAndPassword", { email, password })
      .then((response) => {
        const user = response.data.DT;
        if (user) {
          loginContext(user);
          navigate("/home");
        } else {
          alert("Login failed. Check your email and password.");
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-200 to-indigo-100 font-[Montserrat]">
      <div className="relative w-[768px] max-w-full min-h-[480px] bg-white rounded-[30px] shadow-lg overflow-hidden">
        {/* Sign Up Form */}
        <div
          className={`absolute top-0 h-full transition-all duration-500 ease-in-out w-1/2 ${
            isSignUp ? "translate-x-full opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <form className="h-full flex flex-col justify-center items-center px-10">
            <h1 className="text-2xl font-bold">{t('common.create_account')}</h1>
            <div className="flex my-4 space-x-3">
              {[faGooglePlusG, faFacebookF, faGithub, faLinkedinIn].map(
                (icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="border rounded-full w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-100"
                  >
                    <FontAwesomeIcon icon={icon} />
                  </a>
                )
              )}
            </div>
            <span className="text-sm mb-3">
              or use your email for registration
            </span>
            <input
              type="text"
              placeholder={t('customer.name')}
              className="w-full mb-2 py-2 px-4 bg-gray-200 rounded-md text-sm outline-none"
            />
            <input
              type="email"
              placeholder={t('common.email')}
              className="w-full mb-2 py-2 px-4 bg-gray-200 rounded-md text-sm outline-none"
            />
            <input
              type="password"
              placeholder={t('common.password')}
              className="w-full mb-2 py-2 px-4 bg-gray-200 rounded-md text-sm outline-none"
            />
            <button
              type="submit"
              className="bg-indigo-700 text-white px-8 py-2 rounded-md uppercase text-sm font-semibold mt-2"
              onClick={(e) => {
                e.preventDefault();
                console.log("Sign Up");
              }}
            >
              Sign Up
            </button>
          </form>
        </div>

        {/* Sign In Form */}
        <div
          className={`absolute top-0 h-full transition-all duration-500 ease-in-out w-1/2 ${
            isSignUp ? "translate-x-full opacity-0 z-0" : "opacity-100 z-10"
          }`}
        >
          <form className="h-full flex flex-col justify-center items-center px-10 sign-in">
            <h1 className="text-2xl font-bold">{t('cart.sign_in')}</h1>
            <div className="flex my-4 space-x-3">
              {[faGooglePlusG, faFacebookF, faGithub, faLinkedinIn].map(
                (icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="border rounded-full w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-100"
                  >
                    <FontAwesomeIcon icon={icon} />
                  </a>
                )
              )}
            </div>
            <span className="text-sm mb-3">{t('common.or_use_your_email')}</span>
            <input
              type="email"
              placeholder={t('common.email')}
              className="w-full mb-2 py-2 px-4 bg-gray-200 rounded-md text-sm outline-none"
            />
            <input
              type="password"
              placeholder={t('common.password')}
              className="w-full mb-2 py-2 px-4 bg-gray-200 rounded-md text-sm outline-none"
            />
            <a href="#" className="text-xs text-gray-500 mt-2 hover:underline">{t('common.forgot_your_password')}</a>
            <button
              type="button"
              className="bg-indigo-700 text-white px-8 py-2 rounded-md uppercase text-sm font-semibold mt-3"
              onClick={handleSignIn}
            >{t('cart.sign_in')}</button>
          </form>
        </div>

        {/* Toggle Panel */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full transition-all duration-500 ease-in-out z-20 ${
            isSignUp ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 h-full flex items-center justify-center text-white text-center px-6">
            <div>
              {isSignUp ? (
                <>
                  <h1 className="text-3xl font-bold">{t('common.welcome_back')}</h1>
                  <p className="text-sm mt-2">
                    Enter your personal details to use all of site features
                  </p>
                  <button
                    className="mt-4 px-8 py-2 border border-white rounded-md uppercase text-sm"
                    onClick={() => setIsSignUp(false)}
                  >
                    {t('common.sign_in')}
                  </button>
                </>
              ) : (
                <>
                  <h1 className="text-3xl font-bold">{t('common.hello_friend')}</h1>
                  <p className="text-sm mt-2">
                    Register with your personal details to use all of site
                    features
                  </p>
                  <button
                    className="mt-4 px-8 py-2 border border-white rounded-md uppercase text-sm"
                    onClick={() => setIsSignUp(true)}
                  >
                    {t('common.sign_up')}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

// Updated: 2025-10-12T16:06:32.163Z

// Updated: 2025-10-12T16:08:45.135Z
