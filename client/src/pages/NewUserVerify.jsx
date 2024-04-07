import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";

import { verifyAccount } from "../actions/authActions";

import styles from "../css/NewUserVerify.module.css";

import Back from "../assets/back.png";

function NewUserVerify({ verifyAccount }) {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const user = useSelector((state) => state.auth.user);
  const [isMatch, setIsMatch] = useState(false);
  const [code, setCode] = useState("");

  const handleSubmitClick = () => {
    verifyAccount(code, user.email, navigate);
  };

  const handleCodeValueChange = (e) => {
    setCode(e.target.value);
  };

  return (
    <div className={styles.NewUserVerify}>
      <div className={styles.Verification}>
        <div className={styles.Back}>
          <img onClick={goBack} className={styles.back} src={Back} />
          <h2>Account verification</h2>
        </div>
        <input
          type="text"
          placeholder="Enter the verification code"
          value={code}
          onChange={handleCodeValueChange}
        />
        {isMatch && (
          <p className={styles.Wrong}>The verification code does not match</p>
        )}
        <p>
          We've sent a verification code to your email; if not received, click
          'Resend’.
        </p>
        <div className={styles.Buttons}>
          <button onClick={handleSubmitClick}>Submit</button>
          <button>Resend</button>
        </div>
      </div>
    </div>
  );
}

const matchDispatchToProps = { verifyAccount };

export default connect(null, matchDispatchToProps)(NewUserVerify);
