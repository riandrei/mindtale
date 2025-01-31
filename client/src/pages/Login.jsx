import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";

import { logIn } from "../actions/authActions";

import styles from "../css/Login.module.css";

import { Forgot } from "../components/Forgot";
import AboutUs from "../components/AboutUs";

import Open from "../assets/openeye.png";
import Close from "../assets/closeeye.png";
import FB from "../assets/fb.png";
import Google from "../assets/google.png";
import Logo from "../assets/mindtale.png";
import Wrong from "../assets/remove.png";
import Music from "../assets/bg-music.mp3";

function Login({ logIn }) {
  const elements = Array.from({ length: 50 }, (_, index) => index + 1);

  const containerElements = elements.map((count) => (
    <div
      key={`container${count}`}
      id="container"
      className={`${styles.Dust} ${styles[`Count${count}`]}`}
    ></div>
  ));
  const [isForgot, useIsForgot] = useState(false);
  const handleForgotClick = () => {
    useIsForgot(!isForgot);
  };

  //pang reveal password
  const [isShowPass, setIsShowPass] = useState(false);
  const handleShowClick = () => {
    setIsShowPass(!isShowPass);
  };

  //alam mo na to
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  //Pang pop up sa "log in with google/facebook" text since logo lang nilagay ko
  const [hoveredButton, setHoveredButton] = useState(null);
  const handleMouseOver = (button) => {
    setHoveredButton(button);
  };

  const handleMouseOut = () => {
    setHoveredButton(null);
  };

  const [openAbout, setOpenAbout] = useState(false);
  const handleAboutClick = () => {
    setOpenAbout(!openAbout);
  };

  // pang catch kapag mali credentials ng user di ko alam pano mo siya maaapply sayo
  const [wrongAcc, setWrongAcc] = useState(false);
  const handleWrongClick = () => {
    setWrongAcc(!wrongAcc);
    console.log("hello");
  };

  const navigate = useNavigate();

  const errorStatus = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (errorStatus === "Invalid credentials") {
      setWrongAcc(true);
    }
  }, [errorStatus]);

  const handleLogin = async () => {
    await logIn(email, password, navigate);
    // logIn(email, password, navigate);
  };

  return (
    <div className={styles.Login}>
      {/* <iframe src={Music} allow="autoplay" style={{display: 'none'}}></iframe> */}
      <div className={styles.inputs}>
        <div className={styles.email}>
          <input
            maxLength={35}
            type="email"
            placeholder="Email address"
            value={email}
            onChange={handleEmailChange}
          />
          <p className={`${styles.usog} ${styles.usoggg}`}>
            Don't have an account?{" "}
            <Link to="/Signin" className={styles.link}>
              Sign up
            </Link>
          </p>
        </div>

        <div className={styles.password}>
          <div className={styles.show}>
            <input
              maxLength={25}
              type={isShowPass ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />

            {/*toggle to para sa image ng close/open na mata kapag nirereveal yung password */}
            {password ? (
              <img onClick={handleShowClick} src={isShowPass ? Open : Close} />
            ) : (
              <img
                style={{ visibility: "hidden" }}
                onClick={handleShowClick}
                src={isShowPass ? Close : Open}
              />
            )}
          </div>
          <Link
            onClick={handleForgotClick}
            className={`${styles.link} ${styles.usog}`}
          >
            Forgot password?
          </Link>
        </div>
        <button
          // onClick para sa kapag mali cred ng user di ko knows pano mo siya ibahin kapag may backed na
          //Hindi clickable yung submit button unless meron na values both inputs and yung password meron na dapat 7 characters
          onClick={handleLogin}
          style={
            password === "" || password.length < 7 || email === ""
              ? { pointerEvents: "none" }
              : {}
          }
          type="submit"
        >
          Log in
        </button>
        <p className={styles.usogg}>
          Don't have an account?{" "}
          <Link to="/Signin" className={styles.link}>
            Sign up
          </Link>
        </p>
      </div>

      <div className={styles.bottom}>
        <div className={styles.title}>
          <h1>MINDTAL!!!E</h1>
          <p>Gamified Interactive Stories Powered by AI</p>
        </div>

        <div className={styles.socials}>
          <img
            onClick={handleAboutClick}
            className={styles.logo}
            src={Logo}
            alt=""
          />
          <div className={styles.media}>
            <div className={styles.sign}>
              <span
                style={{
                  visibility:
                    hoveredButton === "facebook" ? "visible" : "hidden",
                }}
              >
                Log in with Facebook
              </span>
              <img
                loading="lazy"
                onMouseOver={() => handleMouseOver("facebook")}
                onMouseOut={handleMouseOut}
                src={FB}
              />
            </div>

            <div className={styles.sign}>
              <span
                style={{
                  visibility: hoveredButton === "google" ? "visible" : "hidden",
                }}
              >
                Log in with Google <span></span>
              </span>
              <img
                loading="lazy"
                onMouseOver={() => handleMouseOver("google")}
                onMouseOut={handleMouseOut}
                src={Google}
              />
            </div>
          </div>
        </div>
      </div>

      {wrongAcc && (
        <div className={styles.catch}>
          <img src={Wrong} />
          <p>Incorrect login details, please verify and try again</p>
        </div>
      )}
      {isForgot && <Forgot handleForgotClick={handleForgotClick} />}

      {containerElements}
      {openAbout && (
        <AboutUs handleAboutClick={handleAboutClick} openAbout={openAbout} />
      )}
    </div>
  );
}

const mapDispatchToProps = { logIn };

export default connect(null, mapDispatchToProps)(Login);
