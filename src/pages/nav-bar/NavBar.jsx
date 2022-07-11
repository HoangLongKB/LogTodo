import { useStore } from "../../store";
import { signOut } from "firebase/auth";
import { setUser } from "../../store/storeAction";
import styles from './NavBar.module.css';

function NavBar() {
  const [state, dispatch] = useStore();
  const {auth} = state;
  const handleLogout = () => {
    signOut(auth).then(() => {
      dispatch(setUser(null));
      localStorage.removeItem('todoUser');
    }).catch((error) => {
      throw new Error('SignOut error', error)
    });
  }
  return(
    <div className={`${styles['navbar-wrapper']}`}>
      <button onClick={handleLogout}>Log out</button>
    </div>
  )
}

export default NavBar;