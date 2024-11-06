import { useSelector } from "react-redux";

import AdminHomepage from "../components/AdminHomepage";
import AdminLogin from "../components/AdminLogin";

const Admin = () => {
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  return <>{isAdmin ? <AdminHomepage /> : <AdminLogin />}</>;
};

export default Admin;
