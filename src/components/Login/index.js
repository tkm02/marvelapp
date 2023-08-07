import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {auth}  from '../Firebase/firebaseConfig'; 
import { signInWithEmailAndPassword  } from "firebase/auth";



const Login = () => {

  const data = {
    email : "",
    password : "",
  }

  const [loginData, setLoginData] = useState(data);
  const [error, setError] = useState('');
  const [btn,setBtn] = useState(false)
  const navigate = useNavigate();

  const { email, password } = loginData;

  useEffect(() => {
    if (password.length > 5 && email !== "") {
      setBtn(true)
    }else if(btn){
      setBtn(false)
    }
  },[password,email,btn])



  const handleChange = (e) => {
    setLoginData({...loginData, [e.target.id]:e.target.value});
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    const { email, password } = loginData;

    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        setLoginData({...data})
        navigate('/welcome',{replace:true})
      })
      .catch((error) => {
        setError(error);
        setLoginData({...data})
      });

  }

  const errorMessgae = error !== '' && <span> {error.message} </span>


  const loginBtn =<button disabled={btn ? false : true} >Connexion</button>
  return (
    <div className='signUpLoginBox'>
      <div className='slContainer'>

        <div className='formBoxLeftLogin'></div>  
        <div className="formBoxRight">
          <div className="formContent">
          {errorMessgae}
          <h2>Connexion</h2>

            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                  <input onChange={handleChange} value={ email}  type="email" id="email" required />
                  <label htmlFor="email">Email</label>
              </div>

              <div className="inputBox">
                  <input onChange={handleChange} value={ password } type="password" id="password" required />
                  <label htmlFor="password">Mot de passe</label>
              </div>
              {loginBtn}
            </form>
            <div className='linkContainer'>
                <Link className='simpleLink' to="/signup">Nouveau sur Marvel Quiz ? Inscrivez-vous maintenant</Link>
                <br/>
                <Link className='simpleLink' to="/forgetpassword">Mot de passe oublié? Récupérez-le ici</Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login;
