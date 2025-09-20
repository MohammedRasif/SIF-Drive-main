import { Navigate } from "react-router-dom";

const ProviderRoute = ({ children }) => {

  const access_token = localStorage.getItem("access");

  return access_token ? children : <Navigate to="/login" replace />;
};

export default ProviderRoute;