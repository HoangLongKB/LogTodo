import { Navigate } from "react-router-dom";
import { useStore } from "../store";

function RequireAuth({children}) {
  const [state] = useStore();
  const {user} = state;
  return (user && user.uid) ? (children) : <Navigate to="/login" replace={true}/>
};

export default RequireAuth;