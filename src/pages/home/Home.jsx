import { useStore } from "../../store";
import Todos from "../todos/Todos";
import NavBar from '../nav-bar/NavBar';
import { Navigate } from "react-router-dom";
import RequireAuth from "../../guards/RequireAuth";
import styles from './Home.module.css';

function Home() {
  const [state] = useStore();
  const {user} = state;
  return (
    <div className={`${styles['home-wrapper']}`}>
      {!user && (
        <Navigate to="/login" replace={true} />
        )
      }
      <NavBar />
      <RequireAuth>
        <Todos />
      </RequireAuth>
    </div>
  )
}

export default Home;