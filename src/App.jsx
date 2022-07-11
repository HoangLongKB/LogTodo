import "./App.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { getAuth } from "firebase/auth";
import { setAuth, useStore } from "./store";
import { useEffect } from "react";
import Register from "./pages/Register/Register";
import { getFirestore } from "firebase/firestore";
import { app } from ".";
import { setDB, setUser } from "./store/storeAction";

function App() {
  const [state, dispatch] = useStore();
  const {user} = state;
  const auth = getAuth();
  const db = getFirestore(app);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    dispatch(setAuth(auth));
    dispatch(setDB(db));
    if (!user || !user.uid) {
      const todoUser = JSON.parse(localStorage.getItem('todoUser'));
      if (todoUser && todoUser.uid) {
        dispatch(setUser(todoUser));
      } else {
        const path = location.pathname === '/register' ? '/register' : '/login';
        navigate(path, {replace: true});
        return;
      }
    }
    navigate('/', {replace: true});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, db]);
  return (
    <div className={`app-wrapper`}>
      <div>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="login" element={<Login />}/>
          <Route path="register" element={<Register />}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
