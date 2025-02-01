import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "../css/Forgot.module.css";

import {
  forgotPassword,
  checkVerification,
  changePassword,
} from "../actions/authActions";

import Close from "../assets/close.png";

export function Forgot({ handleForgotClick }) {
  const [isSentPass, useIsSetPass] = useState(false);
  const handleSentClick = () => {
    useIsSetPass(!isSentPass);
  };

  const [isNext, useIsNext] = useState(1);
  const handleAddClick = () => {
    useIsNext(isNext + 1);
  };

  const [isNewPass, setIsNewPass] = useState("");
  const handleNewPass = (e) => {
    setIsNewPass(e.target.value);
  };
  const [isConfirmNewPass, setIsConfirmNewPass] = useState("");
  const handleConfirmPass = (e) => {
    setIsConfirmNewPass(e.target.value);
  };

  const passMatch = isNewPass === isConfirmNewPass;

  const [isMatch, setIsMatch] = useState(false);
  const [isShortPass, setIsShortPass] = useState(false);

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const sendForgotEmail = async () => {
    try {
      // Assuming forgotPassword is an async action returning a promise
      const isSuccess = await dispatch(forgotPassword(email));

      // Once the forgotPassword action is complete, run useIsNext
      if (isSuccess) {
        useIsNext(isNext + 1);
      } else {
        alert("Failed to send forgot password email");
      }
    } catch (error) {
      // Handle any errors from the forgotPassword action
      console.error("Error sending forgot password email:", error);
    }
  };

  const handleForgotEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [verificationCode, setVerificationCode] = useState("");
  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };
  const handleVerificationCodeClick = async () => {
    try {
      const isSuccess = await dispatch(
        checkVerification(email, verificationCode)
      );

      if (isSuccess) {
        useIsNext(isNext + 1);
      } else {
        alert("Verification Code doesn't match");
      }
    } catch (error) {
      // Handle any errors from the forgotPassword action
      console.error("Error matching verification codes:", error);
    }
  };

  const handleChangePasswordClick = async () => {
    try {
      if (!passMatch) {
        alert("Password doesn't match");
        return;
      }
      if (isNewPass.length < 7) {
        alert("Password must be at least 7 characters");
        return;
      }

      const isSuccess = await dispatch(changePassword(email, isNewPass));

      if (isSuccess) {
        useIsNext(isNext + 1);
      }
    } catch (error) {
      // Handle any errors from the forgotPassword action
      console.error("Error updating password:", error);
    }
  };

  return (
    <div className={styles.Forgot}>
      <div className={styles.Forgot_inner}>
        <div className={styles.Close}>
          <h1>Forgot password</h1>
          <img src={Close} onClick={handleForgotClick} />
        </div>
        {isNext === 1 && (
          <div className={styles.Inputs}>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={handleForgotEmailChange}
            />
            <button onClick={sendForgotEmail}>Send password reset email</button>
          </div>
        )}
        {isNext === 2 && (
          <div className={styles.Inputs}>
            <input
              type="text"
              placeholder="Enter your the verification code"
              value={verificationCode}
              onChange={handleVerificationCodeChange}
            />
            <p className={styles.Check}>
              Check your email for a password reset link to regain access and
              update your password.
            </p>
            <button onClick={handleVerificationCodeClick}>
              Reset Password
            </button>
          </div>
        )}
        {isNext === 3 && (
          <div className={styles.Inputs}>
            <input
              value={isNewPass}
              onChange={handleNewPass}
              type="password"
              placeholder="Enter your new password"
            />
            <input
              value={isConfirmNewPass}
              onChange={handleConfirmPass}
              type="password"
              placeholder="Confirm your new password"
            />
            {isMatch && (
              <p className={styles.warning}>Password doesn't match</p>
            )}
            {isShortPass && (
              <p className={styles.warning}>
                Password must be at least 7 characters
              </p>
            )}
            <button onClick={handleChangePasswordClick}>Update password</button>
          </div>
        )}
        {isNext === 4 && (
          <div className={styles.Inputs}>Password has been changed.</div>
        )}
      </div>
    </div>
  );
}
