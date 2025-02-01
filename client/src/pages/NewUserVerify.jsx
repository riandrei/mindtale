import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";

import { verifyAccount, getUser } from "../actions/authActions";

import styles from "../css/NewUserVerify.module.css";

import Back from "../assets/back.png";

function NewUserVerify({ verifyAccount, getUser }) {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const user = useSelector((state) => state.auth?.user);
  const [isMatch, setIsMatch] = useState(false);
  const [code, setCode] = useState("");

  const handleCodeSubmitClick = () => {
    setIsMatch(false);
    setCode("");
    verifyAccount(code, user.email, navigate);
  };

  const handleCodeValueChange = (e) => {
    setCode(e.target.value);
  };

  const errorStatus = useSelector((state) => state.auth.error);

  useEffect(() => {
    setIsMatch(errorStatus === "Invalid verification code");
  }, [errorStatus]);

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      getUser();
    }
  }, []);

  return (
    <>
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
            <p className={styles.Wrong}>The verification code is wrong</p>
          )}
          <p>
            We've sent a verification code to your email. Check your spam if it
            isn't working
          </p>
          <div className={styles.Buttons}>
            <button onClick={handleCodeSubmitClick}>Submit</button>
            <button>Resend</button>
          </div>
        </div>
      </div>
    </>
  );
}

const matchDispatchToProps = { verifyAccount, getUser };

export default connect(null, matchDispatchToProps)(NewUserVerify);
