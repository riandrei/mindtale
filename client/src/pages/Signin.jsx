import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";

import { signUp, signUpWithGoogle } from "../actions/authActions";

import styles from "../css/Signin.module.css";

import Google from "../assets/google.png";
import Facebook from "../assets/fb.png";
import Logo from "../assets/mindtale.png";
import Wrong from "../assets/remove.png";

function Signin({ signUp, signUpWithGoogle }) {
  const [createEmail, setCreateEmail] = useState("");
  const handleCreateEmail = (e) => {
    setCreateEmail(e.target.value);
  };

  const [createPassword, setCreatePassword] = useState("");
  const handleCreatePassword = (e) => {
    setCreatePassword(e.target.value);
  };

  const [confirmPassword, setConfirmPassword] = useState("");
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  //if they agree to terms and policy shits
  const [isAgree, setIsAgree] = useState(false);
  const handleAgreeClick = (e) => {
    setIsAgree(e.target.checked);
  };

  //para makita kung lahat ng inputs and checkbox may value else hindi clickable yung submit button
  const isDisabled =
    createEmail === "" ||
    createPassword === "" ||
    confirmPassword === "" ||
    !isAgree;

  const isPasswordMatch = createPassword === confirmPassword;
  const [notMatch, setNotMatch] = useState(false);
  const [shortPassword, setShortPassword] = useState(false);

  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const handleSubmitClick = () => {
    if (!isPasswordMatch) {
      setNotMatch(!notMatch);
    }
    if (isPasswordMatch) {
      if (createPassword.length < 7) {
        setShortPassword(!shortPassword);
      } else {
        setNotMatch(false);

        signUp(createEmail, createPassword, navigate);
      }
    }
  };

  const handleCredentialResponse = (response) => {
    signUpWithGoogle(response.credential, navigate);
  };

  useEffect(() => {
    const google = window.google;

    google.accounts.id.initialize({
      client_id: `375338202686-88hgnbpj0fndsdslis6h5aivf67ihleu.apps.googleusercontent.com`,
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(document.querySelector("#buttonDiv"), {
      theme: "outline",
      size: "large",
      text: "continue_with",

      width: `${document.querySelector(`#signupContainer`).clientWidth / 2}`,
    });
  }, []);

  return (
    <div className={styles.Signin}>
      <div className={styles.extra}></div>

      <div id="signupContainer" className={styles.middle}>
        <h2>Create an account</h2>
        <div>
          <div id="buttonDiv" className={styles.google}>
            {/* <img src={Google} /> */}
            {/* <p id="buttonContainer">Sign up with Google</p> */}
          </div>
          {/* <div className={styles.facebook}>
            <img src={Facebook} />
            <p>Sign up with Facebook</p>
          </div> */}
        </div>

        <div className={styles.or}>
          <span></span>
          <p>or</p>
          <span></span>
        </div>

        <div className={styles.inputs}>
          <input
            value={createEmail}
            onChange={handleCreateEmail}
            type="text"
            placeholder="Type your email here..."
          />
          <input
            value={createPassword}
            onChange={handleCreatePassword}
            type="password"
            placeholder="Type your password here..."
          />
          <input
            value={confirmPassword}
            onChange={handleConfirmPassword}
            type="password"
            placeholder="Confirm your password"
          />
        </div>
        <div className={styles.terms_container}>
          <input
            type="checkbox"
            checked={isAgree}
            onChange={handleAgreeClick}
          />
          <p>
            I agree to the{" "}
            <Link
              to="/TermsAndConditions"
              target="_blank"
              className={styles.terms}
            >
              terms and conditions
            </Link>{" "}
          </p>
        </div>

        {/* hindi clickable yung submit button unless nasatisfy niya yung requirements */}
        <div className={styles.already}>
          <button
            onClick={handleSubmitClick}
            style={{
              pointerEvents: isDisabled && "none",
              filter: isDisabled && "brightness(.5)",
            }}
          >
            Create account
          </button>
          <p>
            Already have an account?{" "}
            <Link to="/Login" className={styles.link}>
              Log in
            </Link>
          </p>
        </div>
        <p className={styles.arrow}>ARROW FUNK-TION</p>
      </div>

      <div className={styles.bottom}>
        <h1>CREATE ACCOUNT</h1>
        <p>Gamified Interactive Stories Powered by AI</p>
      </div>
      <img className={styles.logo} src={Logo} alt="" />

      {/* Pop up either masyadong maikli password ng user( <7 ) o hindi nagmamatch yung password sa confirm pass */}
      {notMatch && (
        <div className={styles.wrong}>
          <img src={Wrong} />
          <p>Passwords don't match. Try again!</p>
        </div>
      )}

      {shortPassword && (
        <div className={styles.wrong}>
          <img src={Wrong} />
          <p>Password too short. Try again!</p>
        </div>
      )}
    </div>
  );
}

const mapDispatchToProps = { signUp, signUpWithGoogle };

export default connect(null, mapDispatchToProps)(Signin);
