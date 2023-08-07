import React, { useEffect, useRef, useState, } from 'react';
import { Link } from 'react-router-dom'

const Landing = () => {

    const refWolverine = useRef(null);
    const [btn,setBtn] = useState(false);

   useEffect(() => {
        refWolverine.current.classList.add("startingImg");
        setTimeout(() => {
            refWolverine.current.classList.remove("startingImg"); 
            setBtn(true)
        }, 1000);
   }, [])
  
   const setLeftImg = () =>{
    refWolverine.current.classList.add("leftImg");
   }
   const setRightImg = () =>{
    refWolverine.current.classList.add("rightImg");
   }

   const clearImg = () =>{
    if (refWolverine.current.classList.contains("leftImg")) {
        refWolverine.current.classList.remove("rightImg");

    } else if(refWolverine.current.classList.contains("rightImg")) {
        refWolverine.current.classList.remove("rightImg");
        
    }
   }

   const displayBtn = btn && (
        <>
            <div className='leftBox' onMouseOver={setLeftImg} onMouseOut={clearImg}>
                <Link to="/signup" className='btn-welcome'>Inscription</Link>
            </div>
            <div className='rightBox' onMouseOver={setRightImg} onMouseOut={clearImg}>
                <Link to="/login" className='btn-welcome'>Connexion</Link>
            </div>
        </>
    ) 

  return (
    <main className='welcomePage' ref={refWolverine}>
        {displayBtn}
    </main>
  )
}

export default Landing
