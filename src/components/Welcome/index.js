import React, { useEffect, useLayoutEffect, useState } from "react";
import { auth, db } from "../Firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Logout from "../Logout";
import Quiz from "../Quiz";
import { doc, getDoc } from "firebase/firestore";

const Welcome = () => {
  const [userSession, setUserSession] = useState(null);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const getUserData = async () => {
    const docRef = doc(db, "users", userSession.uid);
    const docSnap = await getDoc(docRef);
    console.log(docSnap);

    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log("Document data:", docSnap.data());
      setUserData(data);
      console.log(userData);
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    const listener = onAuthStateChanged(auth, (user) => {
      user ? setUserSession(user) : navigate("/", { replace: true });
    });
    if (!!userSession) {
      getUserData();
    }
    return listener();
  }, [userSession]);

 

  return (userSession === null )  ? (
    <div className="loader">
      <p className="loaderText"></p>
    </div>
  ) : (
    <div>
      <div className="quiz-bg">
        <div className="container">
          <Logout />
          <Quiz userData={userData} />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
