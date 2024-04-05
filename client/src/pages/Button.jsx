import { useLocation, useNavigate } from "react-router-dom";

const Button = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const label =
    location.pathname === "/homestandby" ? "standby" : "interactive";

  const handleClick = () => {
    const path =
      location.pathname === "/homestandby" ? "/home" : "/homestandby";

    navigate(path);
  };
  return <button onClick={handleClick}>{label}</button>;
};

export default Button;
