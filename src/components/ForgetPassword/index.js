import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/firebaseConfig';
import { sendPasswordResetEmail } from "firebase/auth";


const ForgetPassword = () => {

  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = (e)=>{
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(()=>{
        setError('')
        setSuccess(`Consultez votre email ${email} pour changer le mot de passe`)
        setEmail('')
        setTimeout(() => {
          navigate("/login",{replace:true})
        }, 5000);
      })
      .catch((err)=>{
        setError(err)
        setEmail('')
      })
  }
  const disabled = email === "" 
  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftForget"></div>
        <div className="formBoxRight">
          <div className="formContent">
            <h2>Mot de passe oublié ?</h2>
              {success && <span style={{border:"1px solid green",background:"green",color:"#fff"}}> {success} </span>}
              {error && <span>{error.message}</span>}
            <form onSubmit={handleSubmit}>
             
              <div className="inputBox">
                <input
                  onChange={(e)=>setEmail(e.target.value)}
                  value={email}
                  type="email"
                  id="email"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <button disabled={disabled}>Récupérer</button>
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/login">
                Déjà inscrit? Connectez-vous
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword
