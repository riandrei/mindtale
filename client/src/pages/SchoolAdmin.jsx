import { useSelector } from "react-redux";

import SchoolAdminHomepage from "../components/SchoolAdminHomepage";
import SchoolAdminLogin from "../components/SchoolAdminLogin";

const Admin = () => {
  const isSchoolAdmin = useSelector((state) => state.auth.isSchoolAdmin);

  return <>{isSchoolAdmin ? <SchoolAdminHomepage /> : <SchoolAdminLogin />}</>;
};

export default Admin;