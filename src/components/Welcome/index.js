import React, { useEffect, useState } from "react";
import { auth } from "../Firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Logout from "../Logout";
import Quiz from "../Quiz";



const Welcome = () => {
  const [userSession, setUserSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const listener = onAuthStateChanged(auth,user=>{
      user ? setUserSession(user) : navigate("/", { replace: true });
    })
    return listener()
  }, [navigate])

  return userSession === null ? (
    <div className="loader">
      <p className="loaderText"></p>
    </div>
  ) : (
    <div>
      <div className="quiz-bg">
        <div className="container">
          <Logout />
          <Quiz />
        </div>
      </div>
    </div>
  );

};

export default Welcome;
