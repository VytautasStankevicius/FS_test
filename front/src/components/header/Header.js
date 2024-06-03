import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(signoutSuccess());
  };

  useEffect (()=>{
    console.log(currentUser)
  },[])

  return (
    <>
      {currentUser && currentUser.data ? (
        <>
          <p>{currentUser.data.username || "Issilogino"}</p>
          <button onClick={logOut}>Atsijungti</button>
          {currentUser.data.role === "admin" && (
            <Link to="/adminPage">Admino puslapis</Link>
          )}
        </>
      ) : (
        <p>Neprisijunges</p>
      )}
    </>
  );
}

export default Header;
