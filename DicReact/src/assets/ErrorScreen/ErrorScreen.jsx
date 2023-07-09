import { useState } from 'react'
import { useRouteError } from 'react-router-dom'
import './ErrorScreenStyle.css'

export const ErroScreen = () =>{
    const error = useRouteError()
    console.log(error)
    const [ClassIcon,setClassIcon] = useState('Moon')
    const DarkMode = ()=>{
        if(ClassIcon ==='Moon'){
            setClassIcon('Sun')
       }
       if(ClassIcon ==='Sun'){
        setClassIcon('Moon')
       }
       const body = document.querySelector('body')
       body.classList.toggle('light-theme')
    }
    return(
        <>
           <section className="ContentInput">
                <i className="fa-solid fa-book"></i>
                <div className={ClassIcon} onClick={DarkMode} ></div>
            </section>

            <section id='erro-page'>

                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred</p>
                <p>
                <i>{error.statusText || error.message}</i>
                </p>
                <a href="/"><button className='btn-erro'>Try Again </button></a>
        
            </section>
        </>
    )
}