import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    if (checked) {
      signOut(auth)
        .then(() => {
          console.log("deconnexion");
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 1000);
        })
        .catch((error) => {
          console.log("error");
        });
    }
  };

  useEffect(() => {
    logout();
  }, [checked]);

  const handleChange = (e) => {
    setChecked(e.target.checked);
  };
  return (
    <div className="logoutContainer">
      <label className="switch">
        <input type="checkbox" checked={checked} onChange={handleChange} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default Logout;
